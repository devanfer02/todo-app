package response

import "github.com/gin-gonic/gin"

type Response struct {
	Status 	string		`json:"status"`
	Code	int			`json:"code"`
	Message	string 		`json:"message"`
	Data	interface{}	`json:"data"`
}

func CreateResponse(code int, message string, data interface{}) Response {
	if err, ok := data.(error); ok {
		return Response{
			Status: "error",
			Code: code,
			Message: message,
			Data: err.Error(),
		}
	}

	return Response{
		Status: "success",
		Code: code,
		Message: message,
		Data: data,
	}
}

func SendResponse(ctx *gin.Context, response Response) {
	ctx.JSON(response.Code, response)
}