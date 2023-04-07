package main

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"os"
	"os/signal"
	"time"

	"github.com/t1732/otegami/internal/server"
)

func main() {
	s := server.SmtpNewServer()
	go func() {
		fmt.Printf("⇨ smtp server started on \x1b[32m%s\x1b[0m\n", s.Addr)
		if err := s.ListenAndServe(); err != nil {
			log.Fatal(err)
		}
	}()

	e := server.HttpNewServer()
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
