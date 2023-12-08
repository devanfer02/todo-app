package services

import (
	"fmt"
	"todo-app/configs"
	"todo-app/helpers/response"
	"todo-app/helpers/status"
	"todo-app/models"
)

type TodoSvc interface {
    FetchTodos(todos *[]models.Todo) response.Response
    FetchOne(todos *models.Todo) response.Response
    InsertTodo(todos *models.Todo) response.Response
    UpdateTodo(todos *models.Todo) response.Response
    RemoveTodo(todos *models.Todo) response.Response
}

type TodoService struct {
	db *configs.Database
}

func NewTodoService(db *configs.Database) *TodoService {
    return &TodoService{
        db: db,
    }
}

func (todoSvc *TodoService) FetchTodos(todos *[]models.Todo) response.Response {
    if err := todoSvc.db.FindAll(todos); err != nil {
        return response.CreateResponse(
            status.ServerError,
            "internal server error",
            err,
        )
    }

    return response.CreateResponse(
        status.Ok,
        "successfully fetch todos",
        todos,
    )
}

func (todoSvc *TodoService) FetchOne(todo *models.Todo) response.Response {
    if err := todoSvc.db.FindOne(todo, "id = ?", todo.ID); err != nil {
        return response.CreateResponse(
            status.ServerError,
            "internal server error",
            err,
        )
    }

    return response.CreateResponse(
        status.Ok,
        "successfully fetch todo",
        todo,
    )
}

func (todoSvc *TodoService) InsertTodo(todo *models.Todo) response.Response {
    if err := todoSvc.db.Create(todo); err != nil {
        return response.CreateResponse(
            status.ServerError,
            "internal server error",
            err,
        )
    }

    return response.CreateResponse(
        status.Ok,
        "successfully fetch todo",
        todo,
    )
}

func (todoSvc *TodoService) UpdateTodo(todo *models.Todo) response.Response {
    if rows := todoSvc.db.Update(todo, "id = ?", todo.ID); rows == 0 {
        return response.CreateResponse(
            status.BadRequest,
            "bad param request",
            fmt.Errorf("data didnt exist"),
        )
    }

    return response.CreateResponse(
        status.Ok,
        "successfully update todo",
        nil,
    )
}

func (todoSvc *TodoService) RemoveTodo(todo *models.Todo) response.Response {
    if rows := todoSvc.db.Delete(todo, "id = ?", todo.ID); rows == 0 {
        return response.CreateResponse(
            status.BadRequest,
            "bad param request",
            fmt.Errorf("data didnt exist"),
        )
    }

    return response.CreateResponse(
        status.Ok,
        "successfully remove todo",
        nil,
    )
}