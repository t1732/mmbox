package controller

import (
	"fmt"
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
	if c.QueryParam("word") == "" && c.QueryParam("date") == "" {
		fmt.Println("param word:" + c.QueryParam("word"))
		h.db.Session(&gorm.Session{AllowGlobalUpdate: true}).Delete(&model.Mail{})
	} else {
		fmt.Println("param word:" + c.QueryParam("word"))
		query := h.db
		if c.QueryParam("word") != "" {
			query = query.Scopes(model.MatchWord(c.QueryParam("word")))
		}
		if c.QueryParam("date") != "" {
			query = query.Scopes(model.CreatedAt(c.QueryParam("date")))
		}
		query.Delete(&model.Mail{})
	}

	return c.JSON(http.StatusOK, "success")
}
