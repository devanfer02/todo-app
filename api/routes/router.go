package routes

import (
	"todo-app/helpers/response"
	"todo-app/configs"

	"github.com/gin-gonic/gin"
)

type Router struct {
	route *gin.Engine
	db 	*configs.Database
}

func NewRouter(eng *gin.Engine, db *configs.Database) *Router {
	return &Router{
		route: eng,
		db: db,
	}
}

func (rt *Router) CreateRouteTodo() {
	todoRt := rt.route.Group("/todo")

	todoRt.GET("/", func (ctx *gin.Context) {
		response.SendResponse(ctx, response.Response{
			Code: 200,
			Message: "api running success",
			Data: nil,
		})
	})
}