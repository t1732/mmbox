package response

type Metadata struct {
	Page Page `json:"page"`
}

type Mails struct {
	Metadata Metadata `json:"_metadata"`
	Records  []Mail   `json:"records"`
}
