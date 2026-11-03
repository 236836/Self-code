package config

import (
	"fmt"
	"log"
	"os"

	"backend/models"

	"github.com/joho/godotenv"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func ConnectDB() {
	// Checking the env
	if err := godotenv.Load(); err != nil {
		log.Println("Notice: .env file not loaded, checking system environment variables")
	}

	// Check database connection
	dsn := os.Getenv("DATABASE_URL")
	if dsn == "" {
		log.Fatal("DATABASE_URL is empty! Check your .env file.")
	}

	// Connect to postgres
	database, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatal("Failed to connect to database: ", err)
	}

	// 	Now Creating data base
	err = database.AutoMigrate(&models.Student{}, &models.Attendance{})
	if err != nil {
		log.Fatal("Failed to create tables: ", err)
	}

	DB = database
	fmt.Println("Successfully connected to Database & Tables Created !!!")
}
