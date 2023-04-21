package model

import (
	"bytes"
	"encoding/base64"
	"fmt"
	"mime/quotedprintable"
	"strings"
	"time"

	"github.com/mnako/letters"
	"gorm.io/gorm"
)

type Mail struct {
	ID        uint
	CreatedAt time.Time `gorm:"not null"`
	Date      string    `gorm:"not null;index:search"`
	Source    string    `gorm:"not null"`
}

func (m *Mail) BeforeSave(tx *gorm.DB) (err error) {
	em, err := m.Parse()
	if err != nil {
		return
	}

	m.CreatedAt = em.Headers.Date
	m.Date = em.Headers.Date.Format("2006-01-02")

	return
}

func (m *Mail) Parse() (letters.Email, error) {
	r := strings.NewReader(m.Source)
	return letters.ParseEmail(r)
}

func CreatedAt(s string) func(db *gorm.DB) *gorm.DB {
	return func(db *gorm.DB) *gorm.DB {
		sw := strings.TrimSpace(s)
		if sw == "" {
			return db
		}

		return db.Where("date = ?", s)
	}
}

func MatchWord(w string) func(db *gorm.DB) *gorm.DB {
	return func(db *gorm.DB) *gorm.DB {
		sw := strings.TrimSpace(w)
		if sw == "" {
			return db
		}

		bsw := base64.StdEncoding.EncodeToString([]byte(sw))
		qsw := toQuotedPrintable(sw)
		return db.Where("source LIKE ? OR source LIKE ?", fmt.Sprintf("%%%s%%", bsw), fmt.Sprintf("%%%s%%", qsw))
	}
}

func ExpireDays(expireDays int) func(db *gorm.DB) *gorm.DB {
	return func(db *gorm.DB) *gorm.DB {
		t := time.Now()
		return db.Where("created_at < ?", t.AddDate(0, 0, -expireDays))
	}
}

func Paginate(page int, per int) func(db *gorm.DB) *gorm.DB {
	return func(db *gorm.DB) *gorm.DB {
		if page <= 0 {
			page = 1
		}

		switch {
		case per > 50:
			per = 50
		case per <= 30:
			per = 30
		}

		offset := (page - 1) * per
		return db.Offset(offset).Limit(per)
	}
}

func toQuotedPrintable(s string) string {
	var ac bytes.Buffer
	w := quotedprintable.NewWriter(&ac)
	_, err := w.Write([]byte(s))
	if err != nil {
		return ""
	}
	err = w.Close()
	if err != nil {
		return ""
	}
	return ac.String()
}
