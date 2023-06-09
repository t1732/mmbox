package main

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"os"
	"os/signal"
	"time"

	"github.com/glebarez/sqlite"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"

	"github.com/t1732/mmbox/internal/model"
	"github.com/t1732/mmbox/internal/server"
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
		if err := e.Start(":8025"); err != nil && err != http.ErrServerClosed {
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
	logLv := logger.Silent
	if os.Getenv("DEBUG") == "true" {
		logLv = logger.Info
	}
	newLogger := logger.New(
		log.New(os.Stdout, "\r\n", log.LstdFlags),
		logger.Config{
			SlowThreshold:             time.Second,
			LogLevel:                  logLv,
			IgnoreRecordNotFoundError: true,
			Colorful:                  true,
		},
	)

	path := os.Getenv("MMBOX_DB_FILE_PATH")
	if path == "" {
		path = "./mmbox.db"
	}

	db, err := gorm.Open(sqlite.Open(path), &gorm.Config{
		Logger: newLogger,
	})
	if err != nil {
		return nil, err
	}

	if err := db.AutoMigrate(&model.Mail{}); err != nil {
		return nil, err
	}

	return db, nil
}
