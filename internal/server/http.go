package server

import (
	"net/http"

	"github.com/labstack/echo/v4"
	"github.com/labstack/gommon/log"
)

func HttpNewServer() *echo.Echo {
	e := echo.New()
	e.Logger.SetLevel(log.INFO)
	e.HideBanner = true

	e.GET("/", func(c echo.Context) error {
		return c.JSON(http.StatusOK, "Hello echo.")
	})

	return e
}
