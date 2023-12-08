package services

import (
	"todo-app/configs"
	"todo-app/helpers/response"
	"todo-app/models"
)

type TodoSvc interface {
    FetchData(todos *[]models.Todo) response.Response
    FetchOne(todos *models.Todo) response.Response
    InsertData(todos *models.Todo) response.Response
    UpdateData(todos *models.Todo) response.Response
    RemoveData(todos *models.Todo) response.Response
}

type TodoService struct {
	db *configs.Database
}

func NewTodoService(db *configs.Database) *TodoService {
    return &TodoService{
        db: db,
    }
}

func (todoSvc *TodoService) FetchData(todos *[]models.Todo) response.Response {
    return response.Response{}
}

func (todoSvc *TodoService) FetchOne(todos *models.Todo) response.Response {
    return response.Response{}
}

func (todoSvc *TodoService) InsertData(todos *models.Todo) response.Response {
    return response.Response{}
}

func (todoSvc *TodoService) UpdateData(todos *models.Todo) response.Response {
    return response.Response{}    
}

func (todoSvc *TodoService) RemoveData(todos *models.Todo) response.Response {
    return response.Response{}
}