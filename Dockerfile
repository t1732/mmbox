# ============
# dev backend
# ============
FROM golang:1.25.5-alpine AS dev-backend

RUN apk add --no-cache gcc musl-dev tzdata git

ENV APP_ROOT=/app

WORKDIR ${APP_ROOT}

COPY go.mod go.sum .air.toml ./

ENV CGO_ENABLED=1

CMD ["sh", "-c", "go install github.com/air-verse/air@v1.63.4 && air -c .air.toml"]

# ============
# dev webui
# ============
FROM node:24.12.0-slim AS dev-webui

RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y ca-certificates curl tzdata git && \
    rm -rf /var/lib/apt/lists /var/cache/apt/archives

ENV APP_ROOT=/app

WORKDIR ${APP_ROOT}

CMD ["sh", "-c", "npm install && npm run dev"]

# ============
# build webui
# ============
FROM node:24.12.0-alpine AS build-webui

WORKDIR /workspace

COPY . ./
RUN npm install && npm run build && mkdir /app && mv dist /app/ && rm -rf /workspace/*

# ============
# build backend
# ============
FROM golang:1.25.5-alpine AS build-backend

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
