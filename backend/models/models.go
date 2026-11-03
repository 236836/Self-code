package models

import (
	"gorm.io/gorm"
)

type Stud struct {
	gorm.Model
	Name     string `gorm:"not null" json:"name" binding:"required"`
	Password string `gorm:"not null" json:"password" binding:"required,min=8"`
	Role     string `gorm:"default:stud" json:"role"`
}
