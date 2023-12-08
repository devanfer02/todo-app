package configs

import (
	"fmt"
	"os"

	"todo-app/models"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

type Database struct {
	db *gorm.DB
}

func NewDatabase() *Database {
	return &Database{}
}

func (Db *Database) ConnectDB() {
	dsn := fmt.Sprintf(
		"%s%s:@tcp(%s)/%s?parseTime=true",
		os.Getenv("DB_USERNAME"),
		os.Getenv("DB_PASSWORD"),
		os.Getenv("DB_CONNECTION"),
		os.Getenv("DB_NAME"),
	)

	db, err := gorm.Open(mysql.Open(dsn))

	if err != nil {
		panic(err)
	}

	Db.db = db
}

func (Db *Database) MigrateDB() {
	if Db.db == nil {
		panic(fmt.Errorf("ERR: MIGRATING DB"))
	}

	Db.migrate(
		&models.Todo{},
	)
}

func (Db *Database) migrate(models ...interface{}) {
	for _, model := range models {
		if err := Db.db.AutoMigrate(model); err != nil {
			panic(err)
		}
	}
}