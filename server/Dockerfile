# --- build stage ---
FROM golang:1.22 AS build
WORKDIR /app
COPY go.mod go.sum* ./
RUN go mod download
COPY . .
RUN CGO_ENABLED=0 GOOS=linux go build -o /out/server .

# --- runtime stage ---
FROM gcr.io/distroless/static
ENV PORT=8080
EXPOSE 8080
USER nonroot:nonroot
COPY --from=build /out/server /server
ENTRYPOINT ["/server"]
