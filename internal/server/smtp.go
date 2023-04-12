package server

import (
	"bytes"
	"errors"
	"io"
	"log"
	"time"

	"github.com/emersion/go-smtp"
	"gorm.io/gorm"

	"github.com/t1732/mmbox/internal/model"
)

// The Backend implements SMTP server methods.
type Backend struct {
	db *gorm.DB
}

func (bkd *Backend) NewSession(_ *smtp.Conn) (smtp.Session, error) {
	return &Session{db: bkd.db}, nil
}

// A Session is returned after EHLO.
type Session struct {
	db *gorm.DB
}

func (s *Session) AuthPlain(username, password string) error {
	if username != "username" || password != "password" {
		return errors.New("Invalid username or password")
	}
	return nil
}

func (s *Session) Mail(from string, opts *smtp.MailOptions) error {
	log.Printf("Mail from:%s\n", from)
	return nil
}

func (s *Session) Rcpt(to string) error {
	log.Printf("Rcpt to:%s\n", to)
	return nil
}

func (s *Session) Data(r io.Reader) (err error) {
	buf := new(bytes.Buffer)
	if _, err = buf.ReadFrom(r); err != nil {
		return
	}
	mail := model.Mail{Source: buf.String()}
	if err = s.db.Create(&mail).Error; err != nil {
		return
	}

	return
}

func (s *Session) Reset() {}

func (s *Session) Logout() error {
	return nil
}

func SmtpNewServer(db *gorm.DB) *smtp.Server {
	be := &Backend{db: db}

	s := smtp.NewServer(be)

	s.Addr = ":1025"
	s.Domain = "localhost"
	s.ReadTimeout = 10 * time.Second
	s.WriteTimeout = 10 * time.Second
	s.MaxMessageBytes = 1024 * 1024
	s.MaxRecipients = 50
	s.AllowInsecureAuth = true

	return s
}
