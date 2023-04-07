package server

import (
	"errors"
	"fmt"
	"io"
	"time"

	"github.com/emersion/go-smtp"
	"github.com/mnako/letters"
)

// The Backend implements SMTP server methods.
type Backend struct{}

func (bkd *Backend) NewSession(_ *smtp.Conn) (smtp.Session, error) {
	return &Session{}, nil
}

// A Session is returned after EHLO.
type Session struct{}

func (s *Session) AuthPlain(username, password string) error {
	if username != "username" || password != "password" {
		return errors.New("Invalid username or password")
	}
	return nil
}

func (s *Session) Mail(from string, opts *smtp.MailOptions) error {
	// fmt.Printf("Mail from:%s\n", from)
	return nil
}

func (s *Session) Rcpt(to string) error {
	// fmt.Println("Rcpt to:%s\n", to)
	return nil
}

func (s *Session) Data(r io.Reader) error {
	email, err := letters.ParseEmail(r)
	if err != nil {
		return err
	}

	fmt.Printf("[SMTP] Received:%s", email.Headers.Subject)
	//fmt.Println(email.HTML)
	//fmt.Println(email.Text)

	return nil
}

func (s *Session) Reset() {}

func (s *Session) Logout() error {
	return nil
}

func SmtpNewServer() *smtp.Server {
	be := &Backend{}

	s := smtp.NewServer(be)

	s.Addr = "127.0.0.1:1025"
	s.Domain = "localhost"
	s.ReadTimeout = 10 * time.Second
	s.WriteTimeout = 10 * time.Second
	s.MaxMessageBytes = 1024 * 1024
	s.MaxRecipients = 50
	s.AllowInsecureAuth = true

	return s
}
