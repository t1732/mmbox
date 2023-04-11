package response

import (
	"net/mail"
	"time"
)

type Mail struct {
	CreatedAt     time.Time     `json:"created_at"`
	FromAddresses []MailAddress `json:"fromAddresses"`
	ToAddresses   []MailAddress `json:"toAddresses"`
	CcAddresses   []MailAddress `json:"ccAddresses"`
	BccAddresses  []MailAddress `json:"bccAddresses"`
	Subject       string        `json:"subject"`
	Text          string        `json:"text"`
	HTML          string        `json:"html"`
}

func (m *Mail) SetFromAddresses(mads []*mail.Address) {
	m.FromAddresses = convertToMailAddresses(mads)
}

func (m *Mail) SetToAddresses(mads []*mail.Address) {
	m.ToAddresses = convertToMailAddresses(mads)
}

func (m *Mail) SetCcAddresses(mads []*mail.Address) {
	m.CcAddresses = convertToMailAddresses(mads)
}

func (m *Mail) SetBccAddresses(mads []*mail.Address) {
	m.BccAddresses = convertToMailAddresses(mads)
}

func convertToMailAddresses(mads []*mail.Address) (addresses []MailAddress) {
	for _, madd := range mads {
		addresses = append(addresses, MailAddress{Name: madd.Name, Address: madd.Address})
	}
	return
}
