package server

import (
	"bytes"
	"errors"
	"fmt"
	"io"
	"time"

	"github.com/emersion/go-smtp"
	"github.com/mnako/letters"
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
	// fmt.Printf("Mail from:%s\n", from)
	return nil
}

func (s *Session) Rcpt(to string) error {
	// fmt.Println("Rcpt to:%s\n", to)
	return nil
}

func (s *Session) Data(r io.Reader) error {
	buf := new(bytes.Buffer)
	tr := io.TeeReader(r, buf)

	email, err := letters.ParseEmail(tr)
	if err != nil {
		return err
	}

	fmt.Printf("[SMTP] Received:%s", email.Headers.Subject)

	return s.db.Transaction(func(tx *gorm.DB) error {
		mail := model.Mail{
			Subject: email.Headers.Subject,
			Text:    email.Text,
			HTML:    email.HTML,
			Plain:   model.Plain{Body: buf.String()},
		}
		if err := s.db.Create(&mail).Error; err != nil {
			return err
		}

		if err := s.db.Model(&mail).Association("FromAddresses").Append(
			model.ConvertToMailAddress(email.Headers.From),
		); err != nil {
			return err
		}
		if err := s.db.Model(&mail).Association("ToAddresses").Append(
			model.ConvertToMailAddress(email.Headers.To),
		); err != nil {
			return err
		}
		if err := s.db.Model(&mail).Association("CcAddresses").Append(
			model.ConvertToMailAddress(email.Headers.Cc),
		); err != nil {
			return err
		}
		if err := s.db.Model(&mail).Association("BccAddresses").Append(
			model.ConvertToMailAddress(email.Headers.Bcc),
		); err != nil {
			return err
		}

		return nil
	})
}

func (s *Session) Reset() {}

func (s *Session) Logout() error {
	return nil
}

func SmtpNewServer(db *gorm.DB) *smtp.Server {
	be := &Backend{db: db}

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
