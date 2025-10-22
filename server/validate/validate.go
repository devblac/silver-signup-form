package validate

import "regexp"

var (
	emailRegex = regexp.MustCompile(`.+@.+\..+`)
	hasNumber  = regexp.MustCompile(`[0-9]`)
	hasSpecial = regexp.MustCompile(`[^A-Za-z0-9]`)
)

func Email(email string) bool {
	return emailRegex.MatchString(email)
}

func Password(password string) (bool, string) {
	if len(password) < 8 {
		return false, "Password must be at least 8 characters"
	}
	if !hasNumber.MatchString(password) {
		return false, "Password must include a number"
	}
	if !hasSpecial.MatchString(password) {
		return false, "Password must include a special character"
	}
	return true, ""
}
