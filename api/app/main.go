package main

import (
	"os"
	"fmt"
	"todo-app/configs"
	"todo-app/routes"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {
	if err := godotenv.Load(); err != nil {
		panic(err)
	}

	app 	:= gin.Default()
	db 		:= configs.NewDatabase()
	router 	:= routes.NewRouter(app, db)

	db.ConnectDB()
	db.MigrateDB()

	router.CreateRouteTodo()

	app.Run(fmt.Sprintf(":%s", os.Getenv("APP_PORT")))
}