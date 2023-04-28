package controller

import (
	"fmt"
	"net/http"
	"strconv"

	"github.com/labstack/echo/v4"
	"github.com/mnako/letters"
	"gorm.io/gorm"

	"github.com/t1732/mmbox/internal/model"
	"github.com/t1732/mmbox/internal/serialize"
)

type mailImpl interface {
	Index(c echo.Context) error
	InlineFile(c echo.Context) error
	AttachedFile(c echo.Context) error
}

type mailController struct {
	db *gorm.DB
}

func NewMialController(db *gorm.DB) mailImpl {
	return &mailController{db: db}
}

func (h *mailController) Index(c echo.Context) error {
	page, _ := strconv.Atoi(c.QueryParam("page"))
	per, _ := strconv.Atoi(c.QueryParam("per"))
	baseUrl := fmt.Sprintf("%s://%s", c.Scheme(), c.Request().Host)

	mails := []model.Mail{}
	q := h.db.Scopes(model.MatchWord(c.QueryParam("word")), model.CreatedAt(c.QueryParam("date")))

	var total int64
	q.Model(&mails).Count(&total)
	if total > 0 {
		q.Select("id", "created_at", "source").Scopes(model.Paginate(page, per)).Order("id DESC").Find(&mails)
	}

	records := make([]serialize.Mail, len(mails))
	for i, m := range mails {
		sm, err := serialize.NewMail(m, baseUrl)
		if err != nil {
			return err
		}

		records[i] = sm
	}

	return c.JSON(http.StatusOK, serialize.NewPagination(records, page, per, total))
}

func (h *mailController) InlineFile(c echo.Context) error {
	id := c.Param("id")
	cid := c.Param("cid")

	mail := model.Mail{}
	h.db.First(&mail, id)

	pm, err := mail.Parse()
	if err != nil {
		return err
	}

	f := findInlineFile(pm.InlineFiles, cid)
	if f == nil {
		return c.JSON(http.StatusNotFound, "")
	}

	return c.Blob(http.StatusOK, f.ContentType.ContentType, f.Data)
}

func (h *mailController) AttachedFile(c echo.Context) error {
	id := c.Param("id")
	index, _ := strconv.Atoi(c.Param("index"))

	mail := model.Mail{}
	h.db.First(&mail, id)

	pm, err := mail.Parse()
	if err != nil {
		return err
	}

	f := pm.AttachedFiles[index]
	name := f.ContentType.Params["filename"]
	if name == "" {
		name = f.ContentType.Params["name"]
	}

	c.Response().Header().Set(echo.HeaderContentDisposition, fmt.Sprintf("attachment; filename=\"%s\"", name))
	c.Response().Header().Set(echo.HeaderContentLength, strconv.Itoa(len(f.Data)))
	return c.Blob(http.StatusOK, f.ContentType.ContentType, f.Data)
}

func findInlineFile(files []letters.InlineFile, cid string) *letters.InlineFile {
	for _, f := range files {
		if f.ContentID == cid {
			return &f
		}
	}
	return nil
}
