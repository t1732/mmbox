package controller

import (
	"net/http"

	"github.com/labstack/echo/v4"
	"gorm.io/gorm"

	"github.com/t1732/mmbox/internal/model"
	"github.com/t1732/mmbox/internal/response"
)

type mailImpl interface {
	Index(c echo.Context) error
}

type mailController struct {
	db *gorm.DB
}

func NewMialController(db *gorm.DB) mailImpl {
	return &mailController{db: db}
}

func (h *mailController) Index(c echo.Context) error {
	mails := []model.Mail{}
	h.db.
		Select("id", "created_at", "subject", "text", "html").
		Preload("FromAddresses").
		Preload("ToAddresses").
		Preload("CcAddresses").
		Preload("BccAddresses").
		Find(&mails)

	res := make([]response.Mail, len(mails))
	for i, e := range mails {
		res[i] = response.Mail{
			CreatedAt:     e.CreatedAt,
			FromAddresses: response.ConvertToMailAddresses(e.FromAddresses),
			ToAddresses:   response.ConvertToMailAddresses(e.ToAddresses),
			CcAddresses:   response.ConvertToMailAddresses(e.CcAddresses),
			BccAddresses:  response.ConvertToMailAddresses(e.BccAddresses),
			Subject:       e.Subject,
			Text:          e.Text,
			HTML:          e.HTML,
		}
	}

	return c.JSON(http.StatusOK, res)
}
