package response

import "time"

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
