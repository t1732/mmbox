package model

import (
	"fmt"
	"net/mail"
	"strings"
	"time"

	"github.com/mnako/letters"
	"gorm.io/gorm"
)

type Mail struct {
	ID         uint
	CreatedAt  time.Time `gorm:"not null;index:search"`
	SearchText string    `gorm:"not null"`
	Source     string    `gorm:"not null"`
}

func (m *Mail) BeforeSave(tx *gorm.DB) (err error) {
	em, err := m.Parse()
	if err != nil {
		return
	}

	m.CreatedAt = em.Headers.Date
	m.SearchText = strings.Join([]string{
		em.Text,
		em.HTML,
		em.Headers.Subject,
		mailAddressesToString(em.Headers.From),
		mailAddressesToString(em.Headers.To),
		mailAddressesToString(em.Headers.Cc),
		mailAddressesToString(em.Headers.Bcc),
	}, " ")

	return
}

func (m *Mail) Parse() (letters.Email, error) {
	r := strings.NewReader(m.Source)
	return letters.ParseEmail(r)
}

func mailAddressesToString(mas []*mail.Address) (out string) {
	for _, m := range mas {
		out = out + strings.Join([]string{m.Address, m.Name}, " ")
	}

	return
}

func CreatedAt(s string) func(db *gorm.DB) *gorm.DB {
	return func(db *gorm.DB) *gorm.DB {
		sw := strings.TrimSpace(s)
		if sw == "" {
			return db
		}

		return db.Where("strftime('%Y-%m-%d', created_at) = ?", s)
	}
}

func MatchWord(w string) func(db *gorm.DB) *gorm.DB {
	return func(db *gorm.DB) *gorm.DB {
		sw := strings.TrimSpace(w)
		if sw == "" {
			return db
		}

		return db.Where("search_text LIKE ?", fmt.Sprintf("%%%s%%", sw))
	}
}
