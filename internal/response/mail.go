package response

import (
	"fmt"
	"net/mail"
	"regexp"
	"time"

	"github.com/mnako/letters"
)

type Mail struct {
	CreatedAt     time.Time           `json:"createdAt"`
	FromAddresses []MailAddress       `json:"fromAddresses"`
	ToAddresses   []MailAddress       `json:"toAddresses"`
	CcAddresses   []MailAddress       `json:"ccAddresses"`
	BccAddresses  []MailAddress       `json:"bccAddresses"`
	Subject       string              `json:"subject"`
	MessageID     string              `json:"messageId"`
	ContentType   string              `json:"contentType"`
	Text          string              `json:"text"`
	HTML          string              `json:"html"`
	ExtraHeaders  map[string][]string `json:"extraHeaders"`
	AttachedFiles []AttachedFile      `json:"attachedFiles"`
}

type AttachedFile struct {
	Name string `json:"name"`
	Size int    `json:"size"`
	Url  string `json:"url"`
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

func (m *Mail) SetAttachedFiles(files []letters.AttachedFile, mailID uint, baseUrl string) {
	for i, f := range files {
		af := AttachedFile{Name: f.ContentDisposition.Params["name"], Size: len(f.Data), Url: fmt.Sprintf("%s/mails/%d/attached_files/%d", baseUrl, mailID, i)}
		if af.Name == "" {
			af.Name = f.ContentDisposition.Params["filename"]
		}
		m.AttachedFiles = append(m.AttachedFiles, af)
	}
}

func (m *Mail) ReplaceInlineCIDtoURL(mailID uint, baseUrl string) {
	r := regexp.MustCompile(`cid:([^\"]*)`)
	m.HTML = r.ReplaceAllString(m.HTML, fmt.Sprintf("%s/mails/%d/inline_files/$1", baseUrl, mailID))
}

func convertToMailAddresses(mads []*mail.Address) (addresses []MailAddress) {
	for _, madd := range mads {
		addresses = append(addresses, MailAddress{Name: madd.Name, Address: madd.Address})
	}
	return
}
