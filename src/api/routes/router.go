package router

import (
	"todo-app/configs"

	"github.com/gin-gonic/gin"
)

type Router struct {
	router  *gin.Engine
    db      *configs.Database
}

func NewRouter(r *gin.Engine, db *configs.Database) *Router {
    return &Router{
        router: r,
        db: db,
    }
}

