//go:build !release

package server

import "github.com/labstack/echo/v4"

func RegisterWebUIRoutes(e *echo.Echo) {
	e.Static("/assets", "dist/assets")
	e.File("/", "dist/index.html")
}
