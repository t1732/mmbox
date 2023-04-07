package response

import "github.com/t1732/mmbox/internal/model/db"

type MailAddress struct {
	Address string `json:"address"`
	Name    string `json:"name"`
}

func ConvertToMailAddresses(a []db.MailAddress) []MailAddress {
	var na = make([]MailAddress, len(a))
	for i, e := range a {
		na[i] = MailAddress{Address: e.Address, Name: e.Name}
	}

	return na
}
