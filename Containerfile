# ============
# development
# ============
FROM golang:1.20.2-alpine as dev

RUN apk add --no-cache gcc musl-dev git

ENV TZ=Asia/Tokyo
ENV APP_ROOT=/go/app

WORKDIR ${APP_ROOT}

COPY go.mod go.sum .air.toml ./

RUN go mod download \
    && go install github.com/cosmtrek/air@latest

ARG GOARCH=amd64
ENV GOOS=linux
ENV GOARCH=${GOARCH}
ENV CGO_ENABLED=1

CMD ["air", "-c", ".air.toml"]

# ============
# build
# ============
FROM golang:1.20.2-alpine as build

RUN apk add --no-cache gcc musl-dev tzdata

ARG GOARCH=amd64
ENV GOOS=linux
ENV GOARCH=${GOARCH}
ENV CGO_ENABLED=1

RUN addgroup mmbox && adduser -D -G mmbox mmbox

WORKDIR /workspace

COPY . /workspace/

RUN go mod download \
    && go build -o /go/bin/mmbox -ldflags '-s -w -extldflags "-static"' ./cmd/mmbox/main.go

# ============
# release
# ============
FROM alpine:3.17.3 as release

COPY --from=build /etc/passwd /etc/passwd
COPY --from=build /etc/group /etc/group
COPY --from=build /usr/share/zoneinfo /usr/share/zoneinfo
COPY --from=build --chown=mmbox:mmbox /go/bin/mmbox /app/bin/mmbox

ENV TZ=Asia/Tokyo

USER mmbox

WORKDIR /app

EXPOSE 1025
EXPOSE 8025

CMD ["/app/bin/mmbox"]
