package controllers

import (
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
	"golang.org/x/crypto/bcrypt"
)

// incoming data in this pattern
type UserInput struct {
	Name     string `json:"name"`
	Email    string `json:"email"`
	Password string `json:"password"`
}

// data can be store here in Users
var Users = make(map[string]UserInput)

// First Register controller
func Register(c *gin.Context) {
	var input UserInput

	// Read data send by react
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid JSON data!"})
		return
	}

	// NO empty Fields
	if input.Name == "" || input.Email == "" || input.Password == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "All fields are required!"})
		return
	}

	// Check wheather email exist or NOT
	if _, exists := Users[input.Email]; exists {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Email is already registered!"})
		return
	}

	// Then Hahsing of Password Occurs
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(input.Password), 10)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to encrypt password!"})
		return
	}
	// Hashed Password assign to input.Password
	input.Password = string(hashedPassword)

	// Saved Email
	Users[input.Email] = input

	// Step F: Send success response
	c.JSON(http.StatusOK, gin.H{"message": "Registered successfully!"})
}

// Login controllers
func Login(c *gin.Context) {
	var input struct {
		Email    string `json:"email"`
		Password string `json:"password"`
	}

	// Teading data
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid JSON data!"})
		return
	}

	// Check for empty fields
	if input.Email == "" || input.Password == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Email and Password are required!"})
		return
	}

	//    User Exist or not
	savedUser, exists := Users[input.Email]
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Email not found!"})
		return
	}

	// Compare the user vs input email , and password
	err := bcrypt.CompareHashAndPassword([]byte(savedUser.Password), []byte(input.Password))
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Wrong password!"})
		return
	}

	// Token starts Generating
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"email": savedUser.Email,
		"exp":   time.Now().Add(24 * time.Hour).Unix(),
	})

	// Signature
	tokenString, err := token.SignedString([]byte("mySecretKey123"))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to generate token!"})
		return
	}

	// Step F: Send token & success response
	c.JSON(http.StatusOK, gin.H{
		"message": "Login successful!",
		"token":   tokenString,
		"user": gin.H{
			"name":  savedUser.Name,
			"email": savedUser.Email,
		},
	})
}
