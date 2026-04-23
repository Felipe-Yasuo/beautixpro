# BeautixPro

Plataforma SaaS de gestão para salões de beleza — agendamentos, equipe, serviços e relatórios em um único lugar.

🔗 Ver ao vivo: [link]

---

## 📋 Sobre o projeto

O BeautixPro nasceu para resolver a dor de salões de beleza que dependem de agendas físicas, WhatsApp ou planilhas para gerenciar seus atendimentos. A plataforma oferece ao dono do salão um painel completo para controlar serviços, funcionários e agenda, além de uma página pública de agendamento que os clientes acessam sem precisar criar conta. O modelo é SaaS com três planos (Free, Basic e Professional), com limites de funcionalidades por tier e integração com Stripe para cobrança recorrente.

---

## 🖥️ Demo

<!-- adicionar aqui screenshot ou GIF do dashboard e da página de agendamento público -->

---

## ✅ Funcionalidades

### Para o cliente final (sem login)
- Página pública do salão com lista de serviços e profissionais
- Agendamento em etapas: serviço → data → funcionário → horário → dados pessoais
- Cálculo em tempo real de horários disponíveis, considerando duração do serviço e agenda do funcionário
- Proteção contra duplo agendamento via constraint de unicidade no banco

### Para o dono do salão (autenticado)
- **Autenticação** com e-mail/senha (bcryptjs) ou Google OAuth
- **Dashboard** com agendamentos do dia, receita diária com comparativo do dia anterior e lembretes pessoais
- **Gerenciamento de serviços** — criar, editar e excluir serviços com nome, preço e duração
- **Gerenciamento de funcionários** — criar e excluir profissionais e configurar os horários disponíveis de cada um (plano Professional)
- **Configuração de horários** do salão para planos Free e Basic
- **Upload de avatar** via Cloudinary com redimensionamento automático para 400×400px
- **Relatórios** — total de agendamentos, receita total e mensal, e top 5 serviços mais agendados
- **Planos e assinaturas** — upgrade/downgrade via Stripe Checkout e gerenciamento via Stripe Customer Portal
- **Lembretes** — criação e exclusão de notas rápidas no dashboard

### Limites por plano

| Funcionalidade | Free | Basic | Professional |
|----------------|------|-------|--------------|
| Serviços       | 3    | 10    | Ilimitado    |
| Funcionários   | 1*   | 1*    | Ilimitado    |
| Relatórios     | ✗    | ✓     | ✓            |

*Funcionário padrão criado automaticamente

---

## 🛠️ Stack

**Frontend**
- [Next.js 16](https://nextjs.org/) (App Router, Server Actions, SSR)
- [React 19](https://react.dev/)
- [Tailwind CSS 4](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/) + [Radix UI](https://www.radix-ui.com/)
- [Lucide React](https://lucide.dev/) — ícones
- [Sonner](https://sonner.dev/) — notificações toast
- [React Day Picker](https://react-day-picker.js.org/) — seleção de datas
- [date-fns](https://date-fns.org/) — manipulação de datas

**Backend**
- Next.js Route Handlers + Server Actions
- [NextAuth v5](https://authjs.dev/) — autenticação (Google OAuth + Credentials)
- [Zod 4](https://zod.dev/) — validação de schemas
- [bcryptjs](https://github.com/dcodeIO/bcrypt.js) — hash de senhas
- Rate limiting in-memory com janela deslizante

**Banco de dados**
- [PostgreSQL](https://www.postgresql.org/) (hospedado no [Neon](https://neon.tech/))
- [Prisma 7](https://www.prisma.io/) — ORM com adapter pg

**Pagamentos**
- [Stripe](https://stripe.com/) — checkout, assinaturas recorrentes e webhooks

**Armazenamento de imagens**
- [Cloudinary](https://cloudinary.com/) — upload e transformação de avatares

---

## 🏗️ Arquitetura

O projeto segue as convenções do App Router do Next.js com camadas de organização colocadas junto às rotas:

```
src/app/
├── (panel)/dashboard/      # Rotas protegidas (autenticadas)
│   ├── _actions/           # Server Actions de mutação
│   ├── _components/        # Componentes da feature
│   ├── _data-access/       # Queries ao banco (somente leitura)
│   └── [feature]/          # profile, services, plans, reports
│
├── (public)/               # Rotas públicas
│   ├── page.tsx            # Landing page
│   ├── login/              # Autenticação
│   └── salao/[id]/         # Página pública de agendamento
│
└── api/
    ├── auth/[...nextauth]/ # Handler do NextAuth
    ├── image/upload/       # Upload para Cloudinary
    └── webhook/            # Webhook do Stripe

src/lib/                    # Configurações e utilitários compartilhados
prisma/                     # Schema e migrations
```

**Padrões usados:**
- **Colocação de arquivos** — cada feature tem seus `_actions`, `_components` e `_data-access` dentro da própria pasta de rota
- **Server Actions** — mutações de formulários processadas no servidor, sem endpoints REST manuais para a maioria das operações
- **Data Access Layer** — funções de leitura isoladas das ações, facilitando cache e revalidação
- **Route Groups** — `(panel)` e `(public)` separam layouts sem afetar a URL
- **Plan gating** — controle de acesso a features verificado no servidor antes de qualquer mutação

---

## 🚀 Como rodar localmente

### Pré-requisitos

- Node.js 20+
- PostgreSQL (local ou via [Neon](https://neon.tech/))
- Conta no [Stripe](https://stripe.com/) (para pagamentos)
- Conta no [Cloudinary](https://cloudinary.com/) (para upload de imagens)
- Conta no [Google Cloud](https://console.cloud.google.com/) com OAuth 2.0 configurado (para login social)

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/beautixpro.git
cd beautixpro
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure as variáveis de ambiente

```bash
cp .env.example .env
```

Preencha o arquivo `.env` conforme a seção [Variáveis de ambiente](#-variáveis-de-ambiente) abaixo.

### 4. Execute as migrations do banco

```bash
npx prisma migrate dev
```

### 5. Inicie o servidor de desenvolvimento

```bash
npm run dev
```

O app estará disponível em `http://localhost:3000`.

### 6. (Opcional) Configure o webhook do Stripe localmente

```bash
# Instale o Stripe CLI: https://stripe.com/docs/stripe-cli
stripe listen --forward-to localhost:3000/api/webhook
```

Copie o webhook secret gerado e adicione em `STRIPE_WEBHOOK_SECRET` no `.env`.

---

## 🔑 Variáveis de ambiente

```env
# Banco de dados (PostgreSQL)
DATABASE_URL=

# NextAuth
NEXTAUTH_URL=http://localhost:3000
AUTH_SECRET=

# Google OAuth
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

# Stripe
STRIPE_SECRET_KEY=
STRIPE_BASIC_PRICE_ID=
STRIPE_PROFESSIONAL_PRICE_ID=
STRIPE_WEBHOOK_SECRET=

# Cloudinary
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=
```

Para gerar o `AUTH_SECRET`:

```bash
openssl rand -base64 32
```

---

## 📦 Scripts disponíveis

| Script          | Descrição                                        |
|-----------------|--------------------------------------------------|
| `npm run dev`   | Inicia o servidor de desenvolvimento             |
| `npm run build` | Gera o build de produção                         |
| `npm run start` | Inicia o servidor em modo produção               |
| `npm run lint`  | Executa o ESLint                                 |

> O script `postinstall` executa `prisma generate` automaticamente após `npm install`.

---

## 🗺️ Roadmap

- [ ] Notificações por e-mail (confirmação de agendamento para o cliente)
- [ ] Cancelamento de agendamento pelo cliente via link
- [ ] Integração com WhatsApp para lembretes automáticos
- [ ] Calendário visual de agendamentos (visão semanal/mensal)
- [ ] Suporte a múltiplos salões por conta
