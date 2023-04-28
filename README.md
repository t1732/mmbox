# MMbox (Mock Mail Box)

golang mock smtp server
Provides a smtp server for development and a webui to view received mail

## Docker run

```bash
docker run -p 8025:8025 -p 1025:1025 sqrt3/mmbox:latest
```

## compose

sample

```yml
version: '3'
services:
  mmbox:
    image: sqrt3/mmbox
    restart: always
    ports:
      - 1025:1025
      - 8025:8025
    environment:
      TZ: Asia/Tokyo
    volumes:
      - type: volume
        source: mmbox-data
        target: /app/data:z
        volume:
          nocopy: true

volumes:
  mmbox-data:
```

## API

Delete mail after a certain period of time when using staging environment
Hold for 3 days only

```sh
curl -X DELETE "http://127.0.0.1:8025/flush?expireDays=3"
```

crontab

```crontab
* 0 * * * curl --silent -X DELETE "http://127.0.0.1:8025/flush?expireDays=3"
```

## Usage in Rails

Add or edit the following to the environments file for your environment.
Here is an example of running mmbox on the same server as rails.

```ruby
  config.action_mailer.delivery_method = :smtp
  config.action_mailer.smtp_settings = {
    enable_starttls_auto: true,
    address: '127.0.0.1',
    port: 1025,
  }
end
```


## install amazonlinux(fedora)

require tar,gzip,wget

```sh
wget https://github.com/t1732/mmbox/releases/download/v0.1.1/mmbox_linux_amd64.tar.gz
tar -zxvf mmbox_linux_amd64.tar.gz
mv mmbox /var/
```

create /etc/systemd/system/mmbox.service

```
[Unit]
Description=mmbox HTTP,SMTP Server
After=network.target

[Service]
WorkingDirectory=/var/mmbox
ExecStart=/var/mmbox/bin/mmbox
Restart=always

[Install]
WantedBy=multi-user.target
```

```sh
systemctl enable mmbox
systemctl start mmbox
```
