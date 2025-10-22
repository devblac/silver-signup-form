package main

import (
	"bytes"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"
)

func TestHandleHealth(t *testing.T) {
	req := httptest.NewRequest("GET", "/healthz", nil)
	w := httptest.NewRecorder()

	handleHealth(w, req)

	if w.Code != 200 {
		t.Errorf("got status %d", w.Code)
	}

	var resp map[string]interface{}
	json.Unmarshal(w.Body.Bytes(), &resp)

	if resp["ok"] != true {
		t.Error("health check failed")
	}
}

func TestHandleSignup_Success(t *testing.T) {
	payload := SignupRequest{
		Email:    "test@example.com",
		Password: "Password123!",
	}
	body, _ := json.Marshal(payload)

	req := httptest.NewRequest("POST", "/api/signup", bytes.NewReader(body))
	w := httptest.NewRecorder()

	handleSignup(w, req)

	var resp SignupResponse
	json.Unmarshal(w.Body.Bytes(), &resp)

	if !resp.Success {
		t.Errorf("signup failed: %s", resp.Error)
	}
}

func TestHandleSignup_InvalidEmail(t *testing.T) {
	body, _ := json.Marshal(SignupRequest{
		Email:    "invalid-email",
		Password: "Password123!",
	})

	req := httptest.NewRequest("POST", "/api/signup", bytes.NewReader(body))
	w := httptest.NewRecorder()
	handleSignup(w, req)

	var resp SignupResponse
	json.Unmarshal(w.Body.Bytes(), &resp)

	if resp.Success {
		t.Error("invalid email should fail")
	}
}

func TestHandleSignup_WeakPassword(t *testing.T) {
	body, _ := json.Marshal(SignupRequest{
		Email:    "test@example.com",
		Password: "weak",
	})

	req := httptest.NewRequest("POST", "/api/signup", bytes.NewReader(body))
	w := httptest.NewRecorder()
	handleSignup(w, req)

	var r SignupResponse
	json.Unmarshal(w.Body.Bytes(), &r)

	if r.Success {
		t.Error("weak password should fail")
	}
}

func TestHandleSignup_AlreadyRegistered(t *testing.T) {
	body, _ := json.Marshal(SignupRequest{
		Email:    "repeated@gmail.com",
		Password: "Password123!",
	})

	req := httptest.NewRequest("POST", "/api/signup", bytes.NewReader(body))
	w := httptest.NewRecorder()
	handleSignup(w, req)

	var resp SignupResponse
	json.Unmarshal(w.Body.Bytes(), &resp)

	if resp.Success {
		t.Error("already registered email should fail")
	}
}

func TestHandleSignup_MethodNotAllowed(t *testing.T) {
	req := httptest.NewRequest("GET", "/api/signup", nil)
	w := httptest.NewRecorder()

	handleSignup(w, req)

	if w.Code != 405 {
		t.Errorf("wrong status: %d", w.Code)
	}
}

// TODO: test invalid JSON body
// func TestHandleSignup_InvalidJSON(t *testing.T) {
// 	req := httptest.NewRequest("POST", "/api/signup", bytes.NewReader([]byte("invalid")))
// 	w := httptest.NewRecorder()
// 	handleSignup(w, req)
// 	// should return 400
// }

func TestCorsMiddleware(t *testing.T) {
	handler := http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
	})

	req := httptest.NewRequest("GET", "/", nil)
	w := httptest.NewRecorder()

	corsMiddleware(handler).ServeHTTP(w, req)

	origin := w.Header().Get("Access-Control-Allow-Origin")
	if origin != "*" {
		t.Errorf("CORS not set correctly: %s", origin)
	}
}
