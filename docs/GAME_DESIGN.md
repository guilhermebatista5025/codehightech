# CodeHighTech - Game Design Document

## Visão Geral
Jogo educacional de programação (RPG de progressão profissional focado em Backend).
O jogador entra como desenvolvedor júnior em uma startup e evolui até arquiteto sênior/CTO.
Focado no mundo real: prazos, bugs em produção, code reviews rigorosos, mudanças de requisitos.

## NPCs
- **Rafael (CTO)**: Exigente, obcecado por qualidade/testes/performance.
- **Camila (PM)**: Foca em entregas rápidas, muda requisitos, não entende a parte técnica.
- **Lucas (Dev Sênior)**: Mentor do jogador, faz reviews de PR, dá dicas.
- **Ana (Designer)**: Entrega mockups incompletos/prazos curtos.

## Progressão
1. Estagiário
2. Desenvolvedor Júnior
3. Desenvolvedor Pleno
4. Desenvolvedor Sênior
5. Tech Lead
6. CTO

## Currículo Técnico (15 Fases)
1. Ambiente e Fundamentos (Node, TS, Git)
2. Primeira API REST (Express, Verbos, Zod)
3. Banco de Dados Real (PostgreSQL, Prisma)
4. Testes Automatizados (Vitest, Jest, Supertest, TDD)
5. Autenticação e Autorização (JWT, RBAC)
6. Segurança Backend (OWASP)
7. APIs Externas e Uploads (Multer, S3)
8. Cache e Performance (Redis)
9. Realtime e WebSocket (Socket.io)
10. Design Patterns (SOLID, Clean Arch)
11. Docker e Ambientes
12. CI/CD (GitHub Actions)
13. Observabilidade e Debugging (Sentry, Winston)
14. Microserviços (Filas, BullMQ)
15. Projeto Final e Portfólio

## Stack do Jogo
- Monorepo: Turborepo
- Web App: Next.js 14+ (App Router, PWA)
- Backend (do jogo): Fastify, Node, Prisma, PostgreSQL, Redis, Socket.io
- Frontend: React 18, Tailwind, GSAP, Zustand, React Query
- Editor: Monaco Editor
- Código Sandbox: WebContainers (StackBlitz)

## MVP (3 meses)
- Foco Fase 1 (Editor, Terminal, Missões básicas)
- Salvamento local (StorageManager)
- 3 NPCs via Slack
- IA Mentora com Guardrails

## Sistema de Validação
- Avaliação por COMPORTAMENTO (testes rodando no código), não análise de texto.
- Penalidades por secrets, falta de testes.

## Persistência
- `StorageManager` central, pronto para migrar do LocalStorage para DB no futuro.
