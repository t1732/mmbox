package model

import (
	"fmt"
	"strings"
	"time"

	"github.com/mnako/letters"
	"golang.org/x/net/html"
	"gorm.io/gorm"
)

type Mail struct {
	ID        uint
	CreatedAt time.Time `gorm:"not null"`
	Date      string    `gorm:"not null;index:search"`
	Source    string    `gorm:"not null"`
	SearchText string   `gorm:"not null"`
}

func (m *Mail) BeforeSave(tx *gorm.DB) (err error) {
	em, err := m.Parse()
	if err != nil {
		return
	}

	m.CreatedAt = em.Headers.Date
	m.Date = em.Headers.Date.Format("2006-01-02")
	m.SearchText = fmt.Sprintf("%s %s %s", em.Headers.Subject, em.Text, extractText(em.HTML))

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

		wsw := fmt.Sprintf("%%%s%%", sw)
		return db.Where("source LIKE ? OR search_text LIKE ?", wsw, wsw)
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
		case per > 100:
			per = 100
		case per <= 0:
			per = 10
		}

		offset := (page - 1) * per
		return db.Offset(offset).Limit(per)
	}
}

func extractText(htmlStr string) (text string) {
	r := strings.NewReader(htmlStr)
	z := html.NewTokenizer(r)

	loop := true
	for loop {
    tt := z.Next()
    loop = tt != html.ErrorToken
    if loop {
        switch tt {
        case html.TextToken:
					text = fmt.Sprintf("%s %s", text, z.Text())
        }
    }
	}

	return
}
