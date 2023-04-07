package server

import (
	"net/http"

	"github.com/labstack/echo/v4"
	"github.com/labstack/gommon/log"
	mdb "github.com/t1732/otegami/internal/model/db"
	"github.com/t1732/otegami/internal/model/response"
	"gorm.io/gorm"
)

func HttpNewServer(db *gorm.DB) *echo.Echo {
	e := echo.New()
	e.Logger.SetLevel(log.INFO)
	e.HideBanner = true

	e.GET("/", func(c echo.Context) error {
		return c.JSON(http.StatusOK, "Pong")
	})

	e.GET("/mails", func(c echo.Context) error {
		mails := []mdb.Mail{}
		db.
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
				FromAddresses: mdb.ConvertToResponseMailAddresses(e.FromAddresses),
				ToAddresses:   mdb.ConvertToResponseMailAddresses(e.ToAddresses),
				CcAddresses:   mdb.ConvertToResponseMailAddresses(e.CcAddresses),
				BccAddresses:  mdb.ConvertToResponseMailAddresses(e.BccAddresses),
				Subject:       e.Subject,
				Text:          e.Text,
				HTML:          e.HTML,
			}
		}

		return c.JSON(http.StatusOK, res)
	})

	return e
}
