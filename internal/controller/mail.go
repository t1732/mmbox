package controller

import (
	"math"
	"net/http"
	"strconv"

	"github.com/labstack/echo/v4"
	"gorm.io/gorm"

	"github.com/t1732/mmbox/internal/model"
	"github.com/t1732/mmbox/internal/response"
)

type mailImpl interface {
	Index(c echo.Context) error
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

	mails := []model.Mail{}
	q := h.db.Scopes(model.MatchWord(c.QueryParam("word")), model.CreatedAt(c.QueryParam("date")))

	var total int64
	q.Model(&mails).Count(&total)
	if (total > 0) {
		q.Select("id", "created_at", "source").Scopes(model.Paginate(page, per)).Order("id DESC").Find(&mails)
	}

	records := make([]response.Mail, len(mails))
	for i, e := range mails {
		pe, err := e.Parse()
		if err != nil {
			return err
		}

		records[i] = response.Mail{
			CreatedAt:   e.CreatedAt,
			Subject:     pe.Headers.Subject,
			MessageID:   string(pe.Headers.MessageID),
			ContentType: pe.Headers.ContentType.ContentType,
			Text:        pe.Text,
			HTML:        pe.HTML,
		}
		records[i].SetFromAddresses(pe.Headers.From)
		records[i].SetToAddresses(pe.Headers.To)
		records[i].SetCcAddresses(pe.Headers.Cc)
		records[i].SetBccAddresses(pe.Headers.Bcc)
	}

	return c.JSON(http.StatusOK, response.Mails{
		Metadata: response.Metadata{
			Page: response.Page{
				Current: page, Per: per, Total: total, TotalPages: int(math.Ceil(float64(total) / float64(per))),
			},
		},
		Records: records,
	})
}
