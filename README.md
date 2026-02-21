# IntentFlow

## Overview

**IntentFlow** is a small end-to-end demo that turns natural language into concrete actions on a Todo list, using:

- **FastAPI + sentence-transformers** to detect user intent from free-form text
- **Node/Express gateway** to orchestrate between AI services and domain microservices
- **Todo microservice** backed by **Supabase**
- **React + TypeScript + Vite** frontend for authentication and interaction

You can type things like _"remind me to call mom tomorrow"_ or _"show me my tasks"_ and the system classifies the intent and calls the appropriate backend route.

## Features

- **Email/password auth with Supabase**
- **Intent classification** using `sentence-transformers` (`all-MiniLM-L6-v2`)
- **Todo microservice** for creating and listing tasks
- **JWT-based auth propagation** from frontend → gateway → microservices
- **Simple React UI** with login/signup and an intent input box

## Project structure

- `frontend/` – React + TypeScript + Vite SPA
  - `src/pages/Auth.tsx` – email/password auth with Supabase
  - `src/pages/Dashboard.tsx` – text box that sends user input to the gateway
  - `src/lib/supabase.ts` – Supabase browser client
- `backend/gateway/` – Node/Express API gateway
  - `src/app.ts` – Express setup and CORS
  - `src/routes/router.ts` – `/api/intents` route
  - `src/controller/agent.controller.ts` – calls AI intent service + todo microservice
  - `src/services/aiClient.ts` – HTTP client to the FastAPI intent service
  - `src/services/todoClient.ts` – HTTP client to the todo microservice
  - `src/middlewares/auth.middleware.ts` – validates Supabase JWT and attaches user
- `backend/services/todo_service/` – Todo microservice (Node/Express + Supabase)
  - `src/app.ts` – Express setup
  - `src/routes/todoRoutes.ts` – `/add_task`, `/list_tasks`
  - `src/controllers/todoController.ts` – maps HTTP layer → service layer
  - `src/services/todoService.ts` – talks to Supabase
  - `src/config/supabase.ts` – server-side Supabase client
- `backend/ai_services/` – Intent analysis service (FastAPI)
  - `app/main.py` – FastAPI app and `/get_intent` endpoint
  - `app/service/analyze_intent.py` – loads `intents.json` and computes similarities
- `backend/intents.json` – example utterances for each supported intent

## Prerequisites

- **Node.js** 18+ and **npm**
- **Python** 3.9+ (for FastAPI + sentence-transformers)
- A **Supabase project** with:
  - email/password auth enabled
  - a `tasks` table (or similar) as expected by the todo service

## Environment variables

Set Supabase credentials for both frontend and backend.

- **Frontend** – create `frontend/.env`:

```bash
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

- **Gateway + Todo microservice** – create `.env` files (either at repo root or in each service directory, matching how you run them) with:

```bash
SUPABASE_URL=your-supabase-url
SUPABASE_ANON_KEY=your-supabase-anon-key
```

These are read via `dotenv` in `backend/gateway/src/config/env.ts` and `backend/services/todo_service/src/config/env.ts`.

## Install & run

### 1. Backend – AI intent service (FastAPI)

From `backend/ai_services/`:

```bash
pip install fastapi uvicorn sentence-transformers scikit-learn
uvicorn app.main:app --reload --port 8000
```

This exposes:

- `POST /get_intent` – body: `{ "text": "..." }` → `{ "intent": "add_task" | ... }`

### 2. Backend – Todo microservice

From `backend/services/todo_service/`:

```bash
npm install
npm run dev
```

Key routes (authenticated via Supabase JWT):

- `POST /add_task` – body: `{ "entity": ... }`
- `POST /list_tasks`

### 3. Backend – API gateway

From `backend/gateway/`:

```bash
npm install
npm run dev
```

Key route:

- `POST /api/intents`
  - expects header `Authorization: Bearer <supabase-access-token>`
  - body: `{ "input": "<natural language text>" }`
  - calls FastAPI `/get_intent`, then forwards to the todo service when appropriate

### 4. Frontend – React app

From `frontend/`:

```bash
npm install
npm run dev
```

By default, Vite serves on `http://localhost:5173`, which is already allowed by CORS in the gateway (`origin: "http://localhost:5173"`).

## Usage flow

1. **Sign up / log in** on `/` using the React app (Supabase email/password).
2. After login, you are redirected to `/dashboard`.
3. Type a natural-language command (e.g. _"add a task to buy groceries"_).
4. The frontend sends the text to `POST /api/intents` with your Supabase JWT.
5. The gateway:
   - calls FastAPI `/get_intent` to classify the intent
   - if the intent is todo-related, calls the todo microservice with extracted entities
6. The combined response is logged in the browser console; you can extend the UI to render tasks, messages, etc.

## Extending the project

- Add new intents to `backend/intents.json` and update `analyze_intent.py` if needed.
- Implement additional microservices (e.g., blog writer, photo manager) by:
  - creating a new service
  - adding a client in the gateway
  - branching on `intent` in `agent.controller.ts`.