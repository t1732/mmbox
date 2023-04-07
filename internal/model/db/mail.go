package db

import (
	"time"
)

type Mail struct {
	ID            uint
	CreatedAt     time.Time
	FromAddresses []MailAddress `gorm:"many2many:from_mail_addresses;"`
	ToAddresses   []MailAddress `gorm:"many2many:to_mail_addresses;"`
	CcAddresses   []MailAddress `gorm:"many2many:cc_mail_addresses;"`
	BccAddresses  []MailAddress `gorm:"many2many:bcc_mail_addresses;"`
	Subject       string        `gorm:"not null"`
	Text          string
	HTML          string
	Plain         Plain `gorm:"not null"`
}
