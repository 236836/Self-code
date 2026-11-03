package controllers

import (
	"backend/config"
	"backend/models"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
)

// mark attendance
func MarkAttendance(c *gin.Context) {
	var attendance models.Attendance

	if err := c.ShouldBindJSON(&attendance); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid attendance data!"})
		return
	}

	attendance.AttendanceTime = time.Now()

	config.DB.Create(&attendance)

	c.JSON(http.StatusOK, attendance)
}

// Get attendance
func GetAttendance(c *gin.Context) {
	var records []models.Attendance

	config.DB.Find(&records)

	c.JSON(http.StatusOK, records)
}
