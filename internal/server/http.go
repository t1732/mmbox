package server

import (
	"net/http"

	"github.com/labstack/echo/v4"
	"github.com/labstack/gommon/log"
	mdb "github.com/t1732/mmbox/internal/model/db"
	"github.com/t1732/mmbox/internal/model/response"
	"gorm.io/gorm"
)

type Impl interface {
	root(c echo.Context) error
	mails(c echo.Context) error
}

type Handler struct {
	db *gorm.DB
}

func newHandler(db *gorm.DB) Impl {
	return &Handler{db: db}
}

func HttpNewServer(db *gorm.DB) *echo.Echo {
	e := echo.New()
	e.Logger.SetLevel(log.INFO)
	e.HideBanner = true

	impl := newHandler(db)

	e.GET("/", impl.root)
	e.GET("/mails", impl.mails)

	return e
}

func (h *Handler) root(c echo.Context) error {
	return c.JSON(http.StatusOK, "Pong")
}

func (h *Handler) mails(c echo.Context) error {
	mails := []mdb.Mail{}
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
