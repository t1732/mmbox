package response

type Page struct {
	Current    int   `json:"current"`
	Per        int   `json:"per"`
	Total      int64 `json:"total"`
	TotalPages int   `json:"totalPages"`
}
