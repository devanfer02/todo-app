package controllers

import (
	"fmt"
	rsp "todo-app/helpers/response"
	"todo-app/helpers/status"
	"todo-app/models"
	"todo-app/services"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

type TodoCtr interface {
    GetTodos() gin.HandlerFunc
	CreateTodo() gin.HandlerFunc
    UpdateTodo() gin.HandlerFunc
    DeleteTodo() gin.HandlerFunc
}

type TodoController struct {
    svc *services.TodoService
}

func NewTodoController(svc *services.TodoService) *TodoController {
    return &TodoController{
        svc: svc,
    }
}

func (todoCtr *TodoController) GetTodos() gin.HandlerFunc {
    return func (ctx *gin.Context) {
        idParam := ctx.Param("id")
        

        if idParam == "" {
            var todo []models.Todo

            res := todoCtr.svc.FetchTodos(&todo);

            rsp.SendResponse(ctx, res)
            return
        }

        var todo models.Todo
        
        id, err := uuid.Parse(idParam)
        if err != nil {
            rsp.SendResponse(ctx, rsp.CreateResponse(
                status.BadRequest,
                "invalid uuid format",
                fmt.Errorf("bad request: invalid uuid format"),
            ))
            
            return
        }

        todo.ID = id 
        res := todoCtr.svc.FetchOne(&todo)
        rsp.SendResponse(ctx, res)
    }
}

func (todoCtr *TodoController) CreateTodo() gin.HandlerFunc {
    return func (ctx *gin.Context) {
        var todo models.Todo

        if err := ctx.ShouldBindJSON(&todo); err != nil {
            rsp.SendResponse(ctx, rsp.CreateResponse(
                status.BadRequest,
                "bad json request",
                fmt.Errorf("bad request: bad json request"),
            ))
            return 
        }

        todo.ID, _ = uuid.NewRandom()
        res := todoCtr.svc.InsertTodo(&todo)
        rsp.SendResponse(ctx, res)
    }
}

func (todoCtr *TodoController) UpdateTodo() gin.HandlerFunc {
    return func (ctx *gin.Context) {
        idParam := ctx.Param("id")

        id, err := uuid.Parse(idParam)
        if err != nil {
            rsp.SendResponse(ctx, rsp.CreateResponse(
                status.BadRequest,
                "invalid uuid format",
                fmt.Errorf("bad request: invalid uuid format"),
            ))
            
            return
        }

        var todo models.Todo

        if err := ctx.ShouldBindJSON(&todo); err != nil {
            rsp.SendResponse(ctx, rsp.CreateResponse(
                status.BadRequest,
                "bad json request",
                fmt.Errorf("bad request: bad json request"),
            ))
            return 
        }
        
        todo.ID = id 
        res := todoCtr.svc.UpdateTodo(&todo)
        rsp.SendResponse(ctx, res)
    }
}

func (todoCtr *TodoController) DeleteTodo() gin.HandlerFunc {
    return func (ctx *gin.Context) {
        idParam := ctx.Param("id")

        id, err := uuid.Parse(idParam)
        if err != nil {
            rsp.SendResponse(ctx, rsp.CreateResponse(
                status.BadRequest,
                "invalid uuid format",
                fmt.Errorf("bad request: invalid uuid format"),
            ))
            
            return
        }

        var todo models.Todo 
        todo.ID = id 

        res := todoCtr.svc.RemoveTodo(&todo)
        rsp.SendResponse(ctx, res)
    }
}