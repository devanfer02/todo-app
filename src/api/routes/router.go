package routes

import (
	"todo-app/configs"
	"todo-app/controllers"
	"todo-app/helpers/response"
	"todo-app/services"

	"github.com/gin-gonic/gin"
)

type Router struct {
	route *gin.Engine
	db 	*configs.Database
    rsp *response.Response
}

func NewRouter(eng *gin.Engine, db *configs.Database) *Router {
	return &Router{
		route: eng,
		db: db,
	}
}

func (rt *Router) CreateRouteTodo() {
	todoRt := rt.route.Group("/todo")
    todoSvc := services.NewTodoService(rt.db)
    todoCtr := controllers.NewTodoController(todoSvc)

    todoRt.GET("/", todoCtr.GetTodos())
    todoRt.GET("/:id", todoCtr.GetTodos())
    todoRt.POST("/", todoCtr.CreateTodo())
    todoRt.PATCH("/:id", todoCtr.UpdateTodo())
    todoRt.DELETE("/:id", todoCtr.DeleteTodo())
}