package models

import (
	"gorm.io/gorm"
)

type Student struct {
	gorm.Model

	RollNo string `json:"roll_no"`
	Name   string `json:"name"`
	status string `json: "status"`
}
