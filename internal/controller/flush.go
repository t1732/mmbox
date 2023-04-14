package controller

import (
	"net/http"

	"github.com/labstack/echo/v4"
	"gorm.io/gorm"

	"github.com/t1732/mmbox/internal/model"
)

type flushImpl interface {
	Destroy(c echo.Context) error
}

type flushController struct {
	db *gorm.DB
}

func NewFlushController(db *gorm.DB) flushImpl {
	return &flushController{db: db}
}

func (h *flushController) Destroy(c echo.Context) error {
  h.db.Session(&gorm.Session{AllowGlobalUpdate: true}).Delete(&model.Mail{})

	return c.JSON(http.StatusOK, "success")
}
