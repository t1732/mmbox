# ============
# dev backend
# ============
FROM golang:1.21.4-alpine as dev-backend

RUN apk add --no-cache gcc musl-dev tzdata

ENV APP_ROOT=/app

WORKDIR ${APP_ROOT}

COPY go.mod go.sum .air.toml ./

ENV CGO_ENABLED=1

CMD ["sh", "-c", "go install github.com/cosmtrek/air@latest && air -c .air.toml"]

# ============
# dev webui
# ============
FROM node:20.10.0-alpine as dev-webui

RUN apk add --no-cache tzdata

ENV APP_ROOT=/app

WORKDIR ${APP_ROOT}

CMD ["sh", "-c", "npm install && npm run dev"]

# ============
# build backend
# ============
FROM golang:1.21.4-alpine as build-backend

RUN apk add --no-cache gcc musl-dev

ARG GOARCH=$BUILDPLATFORMFROM
ENV GOOS=linux
ENV GOARCH=${GOARCH}
ENV CGO_ENABLED=1

WORKDIR /workspace

COPY . ./
RUN go mod download \
    && go build -o /go/bin/mmbox -ldflags '-s -w -extldflags "-static"' ./cmd/mmbox/main.go \
    && rm -rf /workspace/*

# ============
# build webui
# ============
FROM node:20.10.0-alpine as build-webui

WORKDIR /workspace

COPY . ./
RUN npm install && npm run build && mkdir /app && mv dist /app/ && rm -rf /workspace/*

# ============
# release
# ============
FROM alpine:3.17 as release

RUN apk add --no-cache tzdata

ENV MMBOX_DB_FILE_PATH=/app/data/mmbox.db

RUN addgroup mmbox && adduser -D -G mmbox mmbox

USER mmbox

WORKDIR /app

COPY --from=build-backend --chown=mmbox:mmbox /go/bin/mmbox /app/bin/mmbox
COPY --from=build-webui --chown=mmbox:mmbox /app/dist /app/dist

RUN mkdir /app/data

EXPOSE 1025
EXPOSE 8025

CMD ["/app/bin/mmbox"]
