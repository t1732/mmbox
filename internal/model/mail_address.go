package model

import "net/mail"

type MailAddress struct {
	ID      uint
	Address string
	Name    string
}

func ConvertToMailAddress(a []*mail.Address) []MailAddress {
	var na = make([]MailAddress, len(a))
	for i, e := range a {
		na[i] = MailAddress{Address: e.Address, Name: e.Name}
	}

	return na
}
