package main

import (
	"fmt"
	"io"
	"log"
	"net/http"
)

func main() {
	// Define a handler function for the root path "/"
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		fmt.Println("Received request for /")
		io.WriteString(w, "Hello from the root path!\n")
	})

	// Define a handler function for the "/hello" path
	http.HandleFunc("/hello", func(w http.ResponseWriter, r *http.Request) {
		fmt.Println("Received request for /hello")
		io.WriteString(w, "Hello, Go server!\n")
	})

	// Start the server on port 8080
	fmt.Println("Server starting on port 8080...")
	log.Fatal(http.ListenAndServe(":8080", nil))
}
