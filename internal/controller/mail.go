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
		Select("id", "created_at", "source").
		Scopes(model.MatchWord(c.QueryParam("word")), model.CreatedAt(c.QueryParam("date"))).
		Order("id desc").
		Find(&mails)

	res := make([]response.Mail, len(mails))
	for i, e := range mails {
		pe, err := e.Parse()
		if err != nil {
			return err
		}

		res[i] = response.Mail{
			CreatedAt:   e.CreatedAt,
			Subject:     pe.Headers.Subject,
			MessageID:   string(pe.Headers.MessageID),
			ContentType: pe.Headers.ContentType.ContentType,
			Text:        pe.Text,
			HTML:        pe.HTML,
		}
		res[i].SetFromAddresses(pe.Headers.From)
		res[i].SetToAddresses(pe.Headers.To)
		res[i].SetCcAddresses(pe.Headers.Cc)
		res[i].SetBccAddresses(pe.Headers.Bcc)
	}

	return c.JSON(http.StatusOK, res)
}
