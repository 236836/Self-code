package main

import (
	"backend/config"
	"backend/routes"
	"fmt"
	"log"
)

func main() {

	config.ConnectDB()
	r := routes.SetupRouter()

	fmt.Println("Server Running Successfully ....")

	if err := r.Run(":8080"); err != nil {
		log.Fatal(err)
	}
}
