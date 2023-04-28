package serialize

import "math"

type Pagination[T any] struct {
	Metadata Metadata `json:"_metadata"`
	Records  []T      `json:"records"`
}

type Page struct {
	Current    int   `json:"current"`
	Per        int   `json:"per"`
	Total      int64 `json:"total"`
	TotalPages int   `json:"totalPages"`
}

type Metadata struct {
	Page Page `json:"page"`
}

func NewPagination[T any](records []T, page int, per int, total int64) (p Pagination[T]) {
	p = Pagination[T]{
		Metadata: Metadata{
			Page: Page{
				Current: page, Per: per, Total: total, TotalPages: int(math.Ceil(float64(total) / float64(per))),
			},
		},
		Records: records,
	}

	return
}
