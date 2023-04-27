package controller

import (
	"fmt"
	"math"
	"net/http"
	"strconv"

	"github.com/labstack/echo/v4"
	"github.com/mnako/letters"
	"gorm.io/gorm"

	"github.com/t1732/mmbox/internal/model"
	"github.com/t1732/mmbox/internal/response"
)

type mailImpl interface {
	Index(c echo.Context) error
	InlineFile(c echo.Context) error
}

type mailController struct {
	db *gorm.DB
}

func NewMialController(db *gorm.DB) mailImpl {
	return &mailController{db: db}
}

func (h *mailController) Index(c echo.Context) error {
	page, _ := strconv.Atoi(c.QueryParam("page"))
	per, _ := strconv.Atoi(c.QueryParam("per"))
	baseUrl := fmt.Sprintf("%s://%s", c.Scheme(), c.Request().Host)

	mails := []model.Mail{}
	q := h.db.Scopes(model.MatchWord(c.QueryParam("word")), model.CreatedAt(c.QueryParam("date")))

	var total int64
	q.Model(&mails).Count(&total)
	if total > 0 {
		q.Select("id", "created_at", "source").Scopes(model.Paginate(page, per)).Order("id DESC").Find(&mails)
	}

	records := make([]response.Mail, len(mails))
	for i, e := range mails {
		pm, err := e.Parse()
		if err != nil {
			return err
		}

		records[i] = response.Mail{
			CreatedAt:    e.CreatedAt,
			Subject:      pm.Headers.Subject,
			MessageID:    string(pm.Headers.MessageID),
			ContentType:  pm.Headers.ContentType.ContentType,
			Text:         pm.Text,
			HTML:         pm.HTML,
			ExtraHeaders: pm.Headers.ExtraHeaders,
		}
		records[i].SetFromAddresses(pm.Headers.From)
		records[i].SetToAddresses(pm.Headers.To)
		records[i].SetCcAddresses(pm.Headers.Cc)
		records[i].SetBccAddresses(pm.Headers.Bcc)
		records[i].ReplaceInlineCIDtoURL(e.ID, baseUrl)
	}

	return c.JSON(http.StatusOK, response.Mails{
		Metadata: response.Metadata{
			Page: response.Page{
				Current: page, Per: per, Total: total, TotalPages: int(math.Ceil(float64(total) / float64(per))),
			},
		},
		Records: records,
	})
}

func (h *mailController) InlineFile(c echo.Context) error {
	id  := c.Param("id")
	cid := c.Param("cid")

	mail := model.Mail{}
	h.db.First(&mail, id)

	pm, err := mail.Parse()
	if err != nil {
		return err
	}

	f := findInlineFile(pm.InlineFiles, cid)
	if f == nil {
		return c.JSON(http.StatusNotFound, "")
	}

	return c.Blob(http.StatusOK, f.ContentType.ContentType, f.Data)
}

func findInlineFile(files []letters.InlineFile, cid string) *letters.InlineFile {
	for _, f := range files {
		if f.ContentID == cid {
			return &f
		}
	}
	return nil
}
