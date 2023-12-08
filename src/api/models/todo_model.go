package models

import (
	"github.com/google/uuid"
	"time"
)

type Todo struct {
	ID			uuid.UUID 	`gorm:"type:varchar(255);primaryKey" json:"id"`
    Task        string      `gorm:"type:varchar(255);not null" json:"task"`
    Desc        string      `gorm:"type:varchar(255);not null" json:"description"`
	CreatedAt	time.Time	`json:"created_at"`
	UpdatedAt	time.Time	`json:"updated_at"`
}