package server

import (
	"github.com/labstack/echo/v4"
	"github.com/labstack/gommon/log"
	"gorm.io/gorm"

	"github.com/t1732/mmbox/internal/controller"
)

func HttpNewServer(db *gorm.DB) *echo.Echo {
	e := echo.New()
	e.Logger.SetLevel(log.INFO)
	e.HideBanner = true

	rootCtl := controller.NewRootController()
	e.GET("/", rootCtl.Show)

	mailCtl := controller.NewMialController(db)
	e.GET("/mails", mailCtl.Index)

	return e
}
