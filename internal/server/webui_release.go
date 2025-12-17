//go:build release

package server

import (
	"embed"
	"io/fs"
	"net/http"

	"github.com/labstack/echo/v4"
)

//go:embed dist/index.html dist/assets
var content embed.FS

func RegisterWebUIRoutes(e *echo.Echo) {
	assets, err := fs.Sub(content, "dist/assets")
	if err != nil {
		panic(err)
	}

	assetHandler := http.FileServer(http.FS(assets))
	e.GET("/assets/*", echo.WrapHandler(http.StripPrefix("/assets/", assetHandler)))
	e.GET("/", func(c echo.Context) error {
		data, err := content.ReadFile("dist/index.html")
		if err != nil {
			return err
		}
		return c.Blob(http.StatusOK, "text/html; charset=utf-8", data)
	})
}
