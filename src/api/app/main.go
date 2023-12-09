package main

import (
	"fmt"
	"os"
	"todo-app/configs"
	"todo-app/controllers"
	"todo-app/services"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)


func main() {
	if err := godotenv.Load(); err != nil {
		panic(err)
	}

	app 	:= gin.Default()
	db 		:= configs.NewDatabase()
    todoSvc := services.NewTodoService(db)
    todoCtr := controllers.NewTodoController(todoSvc)

    app.Use(cors.Default())
	db.ConnectDB()
	db.MigrateDB()

	app.GET("/todo", todoCtr.GetTodos())
    app.GET("/todo/:id", todoCtr.GetTodos())
    app.POST("/todo", todoCtr.CreateTodo())
    app.PATCH("/todo/:id", todoCtr.UpdateTodo())
    app.DELETE("/todo/:id", todoCtr.DeleteTodo())

	app.Run(fmt.Sprintf(":%s", os.Getenv("APP_PORT")))
}