package validate

import "testing"

func TestEmail(t *testing.T) {
	if !Email("test@example.com") {
		t.Error("valid email should pass")
	}

	if !Email("user@domain.co.uk") {
		t.Error("valid email with subdomain should pass")
	}

	if Email("invalid") {
		t.Error("email without @ should fail")
	}

	if Email("@example.com") {
		t.Error("email without local part should fail")
	}

	if Email("test@domain") {
		t.Error("email without dot in domain should fail")
	}
}

func TestPassword(t *testing.T) {
	// valid case
	ok, msg := Password("Password123!")
	if !ok {
		t.Errorf("valid password failed: %s", msg)
	}

	// too short
	ok, _ = Password("Pass1!")
	if ok {
		t.Error("short password should fail")
	}

	// missing number
	ok, msg = Password("Password!")
	if ok {
		t.Error("password without number should fail")
	}
	if msg != "Password must include a number" {
		t.Errorf("wrong error message: %s", msg)
	}

	// missing special character
	ok, _ = Password("Password123")
	if ok {
		t.Error("password without special char should fail")
	}
}
