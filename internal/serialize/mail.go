package serialize

import (
	"fmt"
	"net/mail"
	"regexp"
	"time"

	"github.com/mnako/letters"
	"github.com/t1732/mmbox/internal/model"
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

type MailAddress struct {
	Address string `json:"address"`
	Name    string `json:"name"`
}

type AttachedFile struct {
	Name string `json:"name"`
	Size int    `json:"size"`
	Url  string `json:"url"`
}

func NewMail(m model.Mail, baseUrl string) (mail Mail, err error) {
	em, err := m.Parse()
	if err != nil {
		return
	}

	mail = Mail{
		CreatedAt:    m.CreatedAt,
		Subject:      em.Headers.Subject,
		MessageID:    string(em.Headers.MessageID),
		ContentType:  em.Headers.ContentType.ContentType,
		Text:         em.Text,
		HTML:         em.HTML,
		ExtraHeaders: em.Headers.ExtraHeaders,
	}
	mail.setFromAddresses(em.Headers.From)
	mail.setToAddresses(em.Headers.To)
	mail.setCcAddresses(em.Headers.Cc)
	mail.setBccAddresses(em.Headers.Bcc)
	mail.setAttachedFiles(em.AttachedFiles, m.ID, baseUrl)
	mail.replaceInlineCIDtoURL(m.ID, baseUrl)

	return
}

func (m *Mail) setFromAddresses(mads []*mail.Address) {
	m.FromAddresses = convertToMailAddresses(mads)
}

func (m *Mail) setToAddresses(mads []*mail.Address) {
	m.ToAddresses = convertToMailAddresses(mads)
}

func (m *Mail) setCcAddresses(mads []*mail.Address) {
	m.CcAddresses = convertToMailAddresses(mads)
}

func (m *Mail) setBccAddresses(mads []*mail.Address) {
	m.BccAddresses = convertToMailAddresses(mads)
}

func (m *Mail) setAttachedFiles(files []letters.AttachedFile, mailID uint, baseUrl string) {
	for i, f := range files {
		af := AttachedFile{Name: f.ContentDisposition.Params["name"], Size: len(f.Data), Url: fmt.Sprintf("%s/mails/%d/attached_files/%d", baseUrl, mailID, i)}
		if af.Name == "" {
			af.Name = f.ContentDisposition.Params["filename"]
		}
		m.AttachedFiles = append(m.AttachedFiles, af)
	}
}

func (m *Mail) replaceInlineCIDtoURL(mailID uint, baseUrl string) {
	r := regexp.MustCompile(`cid:([^\"]*)`)
	m.HTML = r.ReplaceAllString(m.HTML, fmt.Sprintf("%s/mails/%d/inline_files/$1", baseUrl, mailID))
}

func convertToMailAddresses(mads []*mail.Address) (addresses []MailAddress) {
	for _, madd := range mads {
		addresses = append(addresses, MailAddress{Name: madd.Name, Address: madd.Address})
	}
	return
}
