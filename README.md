# MMbox (Mock Mail Box)

golang mock smtp server


## development

```bash
docker compose build
docker compose up -d
```

| server | port |
-----|-----
| smtp   | 1025 |
| http   | 8025 |

受信メール確認

```bash
open http://localhost:8025/mails
```
