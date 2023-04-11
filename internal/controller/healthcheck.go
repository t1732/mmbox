package controller

import (
	"net/http"

	"github.com/labstack/echo/v4"
)

type healthcheckImpl interface {
	Show(c echo.Context) error
}

type healthcheckController struct{}

func NewHealthcheckController() healthcheckImpl {
	return &healthcheckController{}
}

func (h *healthcheckController) Show(c echo.Context) error {
	return c.JSON(http.StatusOK, "Pong")
}
