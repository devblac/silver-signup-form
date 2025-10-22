# silver-signup-form

Monorepo scaffold for Signup Form challenge.
Simple Signup Form with pure CSS.

- `web/`: React 19 + TS + Vite
- `server/`: Minimal Go HTTP server

## Dev
- Web: `cd web && npm i %% npm run dev`
- Server: `cd server && go run ./cmd/server`

## Libraries used
- `zod`: For easy validation
- `clsx`: To establish conditional classes

Current screenshots:

### Happy path
<img width="396" height="424" alt="form-v1-success" src="https://github.com/user-attachments/assets/e94043c2-4973-481b-80c6-fb3fb5805373" />


### Right after clicking Create Account
<img width="418" height="392" alt="form-v1-inprogress" src="https://github.com/user-attachments/assets/1ceab363-754e-4292-9ce8-7977abfac4d5" />


### Error 1: when there was an error on the server side (email already exists)
<img width="407" height="430" alt="form-v1-error-mockAPI" src="https://github.com/user-attachments/assets/d65ea360-3361-42ee-a5d9-91c06a53fbd8" />


### Error 2: when the Email and Password fields contain errors
<img width="398" height="453" alt="form-v1-error-emailfield-passwordfield" src="https://github.com/user-attachments/assets/4a28c7db-07f3-4825-a94a-af073d987f40" />
