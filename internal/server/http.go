package server

import (
	"os"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"github.com/labstack/gommon/log"
	"gorm.io/gorm"

	"github.com/t1732/mmbox/internal/controller"
)

func HttpNewServer(db *gorm.DB) *echo.Echo {
	e := echo.New()
	e.HideBanner = true

	logLv := log.INFO
	if os.Getenv("DEBUG") == "true" {
		logLv = log.DEBUG
		e.Use(middleware.Logger())
	}
	e.Logger.SetLevel(logLv)

	e.Static("/assets", "dist/assets")
	e.File("/", "dist/index.html")

	hcCtl := controller.NewHealthcheckController()
	e.GET("/healthcheck", hcCtl.Show)

	mailCtl := controller.NewMialController(db)
	e.GET("/mails", mailCtl.Index)

	return e
}
