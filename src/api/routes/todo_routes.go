package router

import (
	"todo-app/controllers"
	"todo-app/helpers/cors"
	"todo-app/services"
)

func (r *Router) InitTodoRoute() {
    todoSvc := services.NewTodoService(r.db)
    todoCtr := controllers.NewTodoController(todoSvc)

    tr := r.router.Group("/todo").Use(cors.CORS())

    tr.GET("", todoCtr.GetTodos())
    tr.GET("/:id", todoCtr.GetTodos())
    tr.POST("", todoCtr.CreateTodo())
    tr.PATCH("/:id", todoCtr.UpdateTodo())
    tr.DELETE("/:id", todoCtr.DeleteTodo())
}
