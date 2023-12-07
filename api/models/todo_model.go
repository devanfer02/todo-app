package models

import (
	"github.com/google/uuid"
	"time"
)

type Todo struct {
	ID			uuid.UUID 	`gorm:"type:varchar(255);primaryKey" json:"id"`
	CreatedAt	time.Time	`json:"created_at"`
	UpdatedAt	time.Time	`json:"updated_at"`
}