package main

import (
	"encoding/json"
	"log"
	"net/http"
	"os"
	"strings"
	"time"

	"silver-signup-server/validate"
)

type SignupRequest struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

type SignupResponse struct {
	Success bool   `json:"success"`
	Error   string `json:"error,omitempty"`
}

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	http.HandleFunc("/healthz", handleHealth)
	http.HandleFunc("/api/signup", handleSignup)

	log.Printf("listening on :%s", port)
	log.Fatal(http.ListenAndServe(":"+port, corsMiddleware(http.DefaultServeMux)))
}

func handleHealth(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]interface{}{
		"ok":      true,
		"service": "silver-signup-api",
		"time":    time.Now().UTC().Format(time.RFC3339),
	})
}

// Signup handler
func handleSignup(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	r.Body = http.MaxBytesReader(w, r.Body, 1<<20)
	defer r.Body.Close()

	var req SignupRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		log.Println("json decode error:", err)
		writeError(w, "Invalid JSON")
		return
	}

	// TODO: maybe normalize email to lowercase before validation
	if !validate.Email(req.Email) {
		writeError(w, `Email must contain "@" and a domain with "."`)
		return
	}

	if ok, msg := validate.Password(req.Password); !ok {
		writeError(w, msg)
		return
	}

	// case where the email was already registered
	if strings.ToLower(strings.TrimSpace(req.Email)) == "repeated@gmail.com" {
		writeError(w, "Email already registered")
		return
	}

	time.Sleep(300 * time.Millisecond)

	w.Header().Set("Content-Type", "application/json")
	err := json.NewEncoder(w).Encode(SignupResponse{Success: true})
	if err != nil {
		log.Println("failed to encode response:", err)
	}
}

func corsMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
		w.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET")

		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusNoContent)
			return
		}

		next.ServeHTTP(w, r)
	})
}

func writeError(w http.ResponseWriter, message string) {
	w.Header().Set("Content-Type", "application/json")
	resp := SignupResponse{
		Success: false,
		Error:   message,
	}
	json.NewEncoder(w).Encode(resp)
}
