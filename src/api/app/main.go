package main

import (
	"fmt"
	"os"
	"todo-app/configs"
	"todo-app/helpers/cors"
	"todo-app/routes"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)


func main() {
	if err := godotenv.Load(); err != nil {
		panic(err)
	}

	app 	:= gin.Default()
    app.Use(cors.CORS())

	db 		:= configs.NewDatabase()
    rt      := router.NewRouter(app, db)

	db.ConnectDB()
	db.MigrateDB()

    rt.InitTodoRoute()

	app.Run(fmt.Sprintf(":%s", os.Getenv("APP_PORT")))
}