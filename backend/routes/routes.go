package routes

import (
	"backend/controllers"

	"github.com/gin-gonic/gin"
)

// SetupRouter sets up Gin routes and returns the engine pointer (*gin.Engine)
func SetupRouter() *gin.Engine {
	router := gin.Default()

	// Allow frontend and Backend to communicate with each other
	router.Use(func(c *gin.Context) {
		c.Header("Access-Control-Allow-Origin", "*")
		c.Header("Access-Control-Allow-Headers", "Content-Type, Authorization")
		c.Header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		if c.Request.Method == "OPTIONS" {
			c.Status(204)
			return
		}
		c.Next()
	})
	// Checking the  Server Connection
	router.GET("/", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "Project Working Successfully ...",
			"Status":  "OK",
		})
	})
	// Router Api dapara group
	r := router.Group("/api")

	// Authentication
	r.POST("/register", controllers.Register)
	r.POST("/login", controllers.Login)

	// Student routes
	r.POST("/students", controllers.AddStudent)
	r.GET("/students", controllers.GetStudents)

	// Attendance routes
	r.POST("/attendance", controllers.MarkAttendance)
	r.GET("/attendance", controllers.GetAttendance)

	return router
}
