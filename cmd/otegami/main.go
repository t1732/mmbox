package main

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"os"
	"os/signal"
	"time"

	mdb "github.com/t1732/otegami/internal/model/db"
	"github.com/t1732/otegami/internal/server"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

func main() {
	db, err := newDB()
	if err != nil {
		log.Fatal(err)
	}

	s := server.SmtpNewServer(db)
	go func() {
		fmt.Printf("⇨ smtp server started on \x1b[32m%s\x1b[0m\n", s.Addr)
		if err := s.ListenAndServe(); err != nil {
			log.Fatal(err)
		}
	}()

	e := server.HttpNewServer(db)
	go func() {
		if err := e.Start("127.0.0.1:8025"); err != nil && err != http.ErrServerClosed {
			e.Logger.Fatal(err)
		}
	}()

	quit := make(chan os.Signal, 1)
	signal.Notify(quit, os.Interrupt)
	<-quit

	if err := s.Close(); err != nil {
		log.Fatal(err)
	}

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	if err := e.Shutdown(ctx); err != nil {
		e.Logger.Fatal(err)
	}
}

func newDB() (*gorm.DB, error) {
	newLogger := logger.New(
		log.New(os.Stdout, "\r\n", log.LstdFlags),
		logger.Config{
			SlowThreshold:             time.Second,
			LogLevel:                  logger.Info,
			IgnoreRecordNotFoundError: true,
			Colorful:                  true,
		},
	)

	db, err := gorm.Open(sqlite.Open("otegami.db"), &gorm.Config{
		Logger: newLogger,
	})
	if err != nil {
		return nil, err
	}

	db.Session(&gorm.Session{AllowGlobalUpdate: true}).Delete(&mdb.Plain{})
	db.Session(&gorm.Session{AllowGlobalUpdate: true}).Delete(&mdb.MailAddress{})
	db.Session(&gorm.Session{AllowGlobalUpdate: true}).Delete(&mdb.Mail{})
	if err := db.AutoMigrate(
		&mdb.Mail{},
		&mdb.MailAddress{},
		&mdb.Plain{},
	); err != nil {
		return nil, err
	}

	return db, nil
}
