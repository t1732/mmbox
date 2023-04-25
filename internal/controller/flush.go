package controller

import (
	"net/http"
	"strconv"

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
	query := h.db

	if c.QueryParam("word") != "" {
		query = query.Scopes(model.MatchWord(c.QueryParam("word")))
	}

	if c.QueryParam("date") != "" {
		query = query.Scopes(model.CreatedAt(c.QueryParam("date")))
	}

	if c.QueryParam("expireDays") != "" {
		d, _ := strconv.Atoi(c.QueryParam("expireDays"))
		if d > 0 {
			query = query.Scopes(model.ExpireDays(d))
		}
	}

	query.Session(&gorm.Session{AllowGlobalUpdate: true}).Delete(&model.Mail{})
	return c.JSON(http.StatusOK, "success")
}
