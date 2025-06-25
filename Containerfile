# ============
# dev backend
# ============
FROM golang:1.24.4-alpine AS dev-backend

RUN apk add --no-cache gcc musl-dev tzdata

ENV APP_ROOT=/app

WORKDIR ${APP_ROOT}

COPY go.mod go.sum .air.toml ./

ENV CGO_ENABLED=1

CMD ["sh", "-c", "go install github.com/air-verse/air@latest && air -c .air.toml"]

# ============
# dev webui
# ============
FROM node:22.16.0-alpine AS dev-webui

RUN apk add --no-cache tzdata

ENV APP_ROOT=/app

WORKDIR ${APP_ROOT}

CMD ["sh", "-c", "npm install && npm run dev"]

# ============
# build webui
# ============
FROM node:22.16.0-alpine AS build-webui

WORKDIR /workspace

COPY . ./
RUN npm install && npm run build && mkdir /app && mv dist /app/ && rm -rf /workspace/*

# ============
# build backend
# ============
FROM golang:1.24.4-alpine AS build-backend

RUN apk add --no-cache gcc musl-dev

ARG TARGETOS TARGETARCH
ENV GOOS=$TARGETOS
ENV GOARCH=$TARGETARCH
ENV CGO_ENABLED=1

WORKDIR /workspace

COPY . ./
COPY --from=build-webui /app/dist /workspace/internal/server/dist

RUN go mod download \
    && go build -o /go/bin/mmbox -tags release -ldflags '-s -w -extldflags "-static"' ./cmd/mmbox/main.go \
    && rm -rf /workspace/*

# ============
# release
# ============
FROM alpine:latest AS release

RUN apk add --no-cache tzdata

ENV MMBOX_DB_FILE_PATH=/app/data/mmbox.db

RUN addgroup mmbox && adduser -D -G mmbox mmbox

USER mmbox

WORKDIR /app

COPY --from=build-backend --chown=mmbox:mmbox /go/bin/mmbox /app/bin/mmbox

RUN mkdir /app/data

EXPOSE 1025
EXPOSE 8025

CMD ["/app/bin/mmbox"]
