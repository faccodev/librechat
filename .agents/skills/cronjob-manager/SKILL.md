---
name: cronjob-manager
description: Crie, liste, edite, execute ou remova cronjobs (tarefas agendadas por tempo no formato cron) diretamente por esta conversa.
user-invocable: true
---

# CronJob Manager Skill

Use this skill when the user asks to manage, create, list, toggle, delete, or trigger scheduled tasks/cronjobs directly via chat.

## Instructions
When the user asks you to perform cronjob operations, you must perform them using code execution via `bash_tool` calling the REST API endpoints or using curl, or since you have direct project access, you can run Node.js scripts using `npx ts-node` or helper scripts in this workspace.

### REST API Endpoints available locally:
- **List CronJobs**: `GET /api/cronjobs`
- **Create CronJob**: `POST /api/cronjobs`
  - Body: `{ name: string, description?: string, schedule: string, timezone?: string, enabled?: boolean, agent?: string, provider?: string, model?: string, prompt: string }`
- **Update CronJob**: `PATCH /api/cronjobs/:id`
- **Toggle CronJob**: `POST /api/cronjobs/:id/toggle`
- **Delete CronJob**: `DELETE /api/cronjobs/:id`
- **Run CronJob Now**: `POST /api/cronjobs/:id/run`

### Exemplo de criação via curl:
```bash
curl -X POST http://localhost:3080/api/cronjobs \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{"name": "test-job", "schedule": "0 0 * * *", "prompt": "Hello world"}'
```
*(Nota: Você pode obter os dados e interagir com o DB diretamente importando o arquivo `~/models` e executando scripts de suporte se necessário).*
