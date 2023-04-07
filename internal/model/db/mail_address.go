package db

import (
	"net/mail"

	"github.com/t1732/otegami/internal/model/response"
)

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

func (a MailAddress) ConvertToResponseMailAddress() response.MailAddress {
	return response.MailAddress{Address: a.Address, Name: a.Name}
}

func ConvertToResponseMailAddresses(a []MailAddress) []response.MailAddress {
	var na = make([]response.MailAddress, len(a))
	for i, e := range a {
		na[i] = e.ConvertToResponseMailAddress()
	}

	return na
}
