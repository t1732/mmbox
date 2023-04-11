package model

import (
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
