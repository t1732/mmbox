package server

import (
	"net/http"
	"os"
	"strings"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"github.com/labstack/gommon/log"
	"gorm.io/gorm"

	"github.com/t1732/mmbox/internal/controller"
)

func HttpNewServer(db *gorm.DB) *echo.Echo {
	e := echo.New()
	e.HideBanner = true
	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: getAllowOrigins(),
		AllowMethods: []string{http.MethodGet, http.MethodHead, http.MethodDelete},
	}))

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

func getAllowOrigins() (allowOrigins []string) {
	allowOrigins = []string{}
	origins := strings.Split(os.Getenv("ALLOW_ORIGINS"), ",")
	for _, v := range origins {
		if v != "" {
			allowOrigins = append(allowOrigins, v)
		}
	}

	return
}
