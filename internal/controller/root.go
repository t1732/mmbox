package controller

import (
	"net/http"

	"github.com/labstack/echo/v4"
)

type rootImpl interface {
	Show(c echo.Context) error
}

type rootController struct{}

func NewRootController() rootImpl {
	return &rootController{}
}

func (h *rootController) Show(c echo.Context) error {
	return c.JSON(http.StatusOK, "Pong")
}
