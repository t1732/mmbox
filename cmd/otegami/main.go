package main

import (
	"log"

	"github.com/t1732/otegami/internal/server"
)

func main() {
	if err := server.NewSmtpServer(); err != nil {
		log.Fatal(err)
	}
}
