package middleware

import (
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
)

// AuthMiddleware is the Security Guard for protected routes
func AuthMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {

		// Step 1: Read the "Authorization" header sent by React/Postman
		authHeader := c.GetHeader("Authorization")
		if authHeader == "" {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Authorization token is required!"})
			c.Abort() // 🛑 BLOCK ACCESS! Stop here!
			return
		}

		// TrimPrefix delete the bearer word from token
		tokenString := strings.TrimPrefix(authHeader, "Bearer ")

		// Signing token using the  mySecretKey123
		token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
			return []byte("mySecretKey123"), nil
		})

		// if  error occur and token is not valid , show error message
		if err != nil || !token.Valid {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid or expired token!"})
			c.Abort() // 🛑 BLOCK ACCESS! Stop here!
			return
		}

		//  If successful , Grant Access
		c.Next()
	}
}
