package controller_test

import (
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"
	"time"

	"github.com/labstack/echo/v4"
	"github.com/stretchr/testify/assert"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"

	"github.com/t1732/mmbox/internal/controller"
	"github.com/t1732/mmbox/internal/model"
)

func TestFlushController_Destroy(t *testing.T) {
	db, err := gorm.Open(sqlite.Open("file::memory:?cache=shared"), &gorm.Config{})
	assert.NoError(t, err)
	assert.NoError(t, db.AutoMigrate(&model.Mail{}))

	time, err := time.Parse("2006-01-02 15:04:05", "2023-04-25 16:40:21")
	assert.NoError(t, err)

	mails := []model.Mail{
		{
			CreatedAt: time,
			Date:      "2023-04-24",
			Source:    "Date: Mon, 24 Apr 2023 16:40:21 +0900\r\nFrom: test-from@example.net\r\nTo: test-to@example.net\r\nMessage-ID: <644783e53c260_7aad794-3b3@local.mail>\r\nSubject: test\r\nMime-Version: 1.0\r\nContent-Type: multipart/alternative;\r\n boundary=\"--==_mimepart_644783e53b280_7aad794-41d\";\r\n charset=UTF-8\r\nContent-Transfer-Encoding: 7bit\r\n\r\n\r\n----==_mimepart_644783e53b280_7aad794-41d\r\nContent-Type: text/plain;\r\n charset=UTF-8\r\nContent-Transfer-Encoding: 7bit\r\n\r\ndelete\r\n----==_mimepart_644783e53b280_7aad794-41d\r\nContent-Type: text/html;\r\n charset=UTF-8\r\nContent-Transfer-Encoding: 7bit\r\n\r\n<html><body>delete</body></html>\r\n----==_mimepart_644783e53b280_7aad794-41d--\r\n",
		},
		{
			CreatedAt: time,
			Date:      "2023-04-25",
			Source:    "Date: Tue, 25 Apr 2023 16:40:21 +0900\r\nFrom: test-from@example.net\r\nTo: test-to@example.net\r\nMessage-ID: <644783e53c260_7aad794-3b3@local.mail>\r\nSubject: test\r\nMime-Version: 1.0\r\nContent-Type: multipart/alternative;\r\n boundary=\"--==_mimepart_644783e53b280_7aad794-41d\";\r\n charset=UTF-8\r\nContent-Transfer-Encoding: 7bit\r\n\r\n\r\n----==_mimepart_644783e53b280_7aad794-41d\r\nContent-Type: text/plain;\r\n charset=UTF-8\r\nContent-Transfer-Encoding: 7bit\r\n\r\ntest\r\n----==_mimepart_644783e53b280_7aad794-41d\r\nContent-Type: text/html;\r\n charset=UTF-8\r\nContent-Transfer-Encoding: 7bit\r\n\r\n<html><body>test</body></html>\r\n----==_mimepart_644783e53b280_7aad794-41d--\r\n",
		},
		{
			CreatedAt: time,
			Date:      "2023-04-24",
			Source:    "Date: Mon, 24 Apr 2023 16:40:21 +0900\r\nFrom: test-from@example.net\r\nTo: test-to@example.net\r\nMessage-ID: <644783e53c260_7aad794-3b3@local.mail>\r\nSubject: test\r\nMime-Version: 1.0\r\nContent-Type: multipart/alternative;\r\n boundary=\"--==_mimepart_644783e53b280_7aad794-41d\";\r\n charset=UTF-8\r\nContent-Transfer-Encoding: 7bit\r\n\r\n\r\n----==_mimepart_644783e53b280_7aad794-41d\r\nContent-Type: text/plain;\r\n charset=UTF-8\r\nContent-Transfer-Encoding: 7bit\r\n\r\ntest\r\n----==_mimepart_644783e53b280_7aad794-41d\r\nContent-Type: text/html;\r\n charset=UTF-8\r\nContent-Transfer-Encoding: 7bit\r\n\r\n<html><body>test</body></html>\r\n----==_mimepart_644783e53b280_7aad794-41d--\r\n",
		},
		{
			CreatedAt: time,
			Date:      "2023-04-23",
			Source:    "Date: Sun, 23 Apr 2023 16:40:21 +0900\r\nFrom: test-from@example.net\r\nTo: test-to@example.net\r\nMessage-ID: <644783e53c260_7aad794-3b3@local.mail>\r\nSubject: test\r\nMime-Version: 1.0\r\nContent-Type: multipart/alternative;\r\n boundary=\"--==_mimepart_644783e53b280_7aad794-41d\";\r\n charset=UTF-8\r\nContent-Transfer-Encoding: 7bit\r\n\r\n\r\n----==_mimepart_644783e53b280_7aad794-41d\r\nContent-Type: text/plain;\r\n charset=UTF-8\r\nContent-Transfer-Encoding: 7bit\r\n\r\ntest\r\n----==_mimepart_644783e53b280_7aad794-41d\r\nContent-Type: text/html;\r\n charset=UTF-8\r\nContent-Transfer-Encoding: 7bit\r\n\r\n<html><body>test</body></html>\r\n----==_mimepart_644783e53b280_7aad794-41d--\r\n",
		},
	}

	for _, m := range mails {
		assert.NoError(t, db.Create(&m).Error)
	}

	ctrl := controller.NewFlushController(db)

	tests := []struct {
		name         string
		word         string
		date         string
		expire       string
		status       int
		response     string
		assert_count int64
	}{
		{
			name:         "should delete all mails matching word",
			word:         "delete",
			date:         "",
			expire:       "",
			status:       http.StatusOK,
			response:     `"success"`,
			assert_count: 3,
		},
		{
			name:         "should delete all mails matching date",
			word:         "",
			date:         "2023-04-25",
			expire:       "",
			status:       http.StatusOK,
			response:     `"success"`,
			assert_count: 2,
		},
		{
			name:         "should delete all mails matching expireDays",
			word:         "",
			date:         "",
			expire:       "1",
			status:       http.StatusOK,
			response:     `"success"`,
			assert_count: 0,
		},
		{
			name:         "should delete all mails when no query params provided",
			word:         "",
			date:         "",
			expire:       "",
			status:       http.StatusOK,
			response:     `"success"`,
			assert_count: 0,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			req := httptest.NewRequest(http.MethodDelete, "/flush?word="+tt.word+"&date="+tt.date+"&expireDays="+tt.expire, nil)
			rec := httptest.NewRecorder()

			err := ctrl.Destroy(echo.New().NewContext(req, rec))
			assert.NoError(t, err)

			assert.Equal(t, tt.status, rec.Code)
			assert.Equal(t, tt.response, strings.TrimSpace(rec.Body.String()))

			var after_total int64
			var mails []model.Mail
			db.Model(&mails).Count(&after_total)
			assert.Equal(t, after_total, tt.assert_count)
		})
	}
}
