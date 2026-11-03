package models

import (
	"time"

	"gorm.io/gorm"
)

type Attendance struct {
	gorm.Model

	StudentID      uint      `json:"student_id"`
	Status         string    `json:"status"`
	AttendanceTime time.Time `json:"attendance_time"`
}
