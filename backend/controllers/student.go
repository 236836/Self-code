package controllers

import (
	"backend/config"
	"backend/models"
	"fmt"

	"github.com/gin-gonic/gin"
)

// Adding studetn controller
func AddStudent(c *gin.Context) {
	var student models.Student
	fmt.Println("Student Data: ", student)

	if err := c.ShouldBindJSON(&student); err != nil {
		c.JSON(402, gin.H{
			"error": "Invalid student data!",
		})
		return
	}

	if err := config.DB.Create(&student).Error; err != nil {
		c.JSON(500, gin.H{
			"error": "Failed to create student!",
		})
		return
	}

	c.JSON(201, student)
}

// To Get Students
func GetStudents(c *gin.Context) {
	var students []models.Student

	if err := config.DB.Find(&students).Error; err != nil {
		c.JSON(500, gin.H{
			"error": "Failed to Receive  Students!",
		})
		return
	}

	c.JSON(200, students)
}
