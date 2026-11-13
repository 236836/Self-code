package main

import (
	"backend/config"
	"backend/routes"
	"fmt"
	"log"
	"strconv"

	"github.com/gin-gonic/gin"
)

func main() {
	config.ConnectDB()

	// 1. Get Router (includes Register & Login)
	r := routes.SetupRouter()

	// 2. CORS Middleware (Handles GET, POST, PUT, DELETE, and OPTIONS)
	r.Use(func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")
		
		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(200)
			return
		}
		c.Next()
	})

	// 3. Update Student Route
	r.PUT("/api/students/:id", func(c *gin.Context) {
		idStr := c.Param("id")
		id, _ := strconv.Atoi(idStr)

		var body struct {
			Name string `json:"name"`
		}
		c.BindJSON(&body)

		config.DB.Exec("UPDATE students SET name = $1 WHERE id = $2", body.Name, id)
		c.JSON(200, gin.H{"message": "updated"})
	})

	// 4. Delete Student Route
	r.DELETE("/api/students/:id", func(c *gin.Context) {
		idStr := c.Param("id")
		id, _ := strconv.Atoi(idStr)

		config.DB.Exec("DELETE FROM attendances WHERE student_id = $1", id)
		config.DB.Exec("DELETE FROM students WHERE id = $1", id)
		c.JSON(200, gin.H{"message": "deleted"})
	})

	fmt.Println("Server Running Successfully on port 8060....")

	if err := r.Run(":8060"); err != nil {
		log.Fatal(err)
	}
}