
# Ava Receptionist — v1 Build Plan

A production-quality foundation for a Von-AI-style receptionist. The full feature list is a multi-month product; v1 ships the app, data model, dashboard, and the *wiring points* for Twilio + ElevenLabs + Lovable AI so real calls can be turned on after you connect the accounts. Nothing will be faked — features that need external credentials will show a clear "Connect X" state until wired.

## Scope for v1 (this build)

**Ships fully working**
- Brand + design system (Ava Receptionist, #2563EB / #06B6D4, light + dark, glassmorphism, premium SaaS feel — Linear/Stripe/ElevenLabs tier).
- Auth (email/password + Google) with Admin / Staff roles via `user_roles` table + `has_role()` RPC.
- Responsive app shell: sidebar nav, top bar, mobile drawer, theme toggle.
- Dashboard: KPI cards (calls today, missed, appointments, avg duration), recent calls, upcoming appointments, live activity feed (Supabase Realtime).
- Calls: list + detail view (transcript, summary, action items, caller info). Searchable history.
- Appointments: calendar + list, create/reschedule/cancel, business hours + holidays.
- Contacts (CRM): people, phone, email, notes, call history per contact.
- Knowledge Base: upload docs (Supabase Storage), list, delete. RAG-ready (embeddings table + retrieval server fn scaffolded).
- Admin panel: business hours, holidays, AI system prompt, voice settings, staff management.
- Real-time notifications (toast + bell) for new appointments / missed calls.
- Full DB schema with RLS (admin vs staff), triggers, indexes.

**Wired but requires you to connect a provider before it goes live**
- **Twilio Voice**: `/api/public/twilio/voice` (TwiML entry), `/api/public/twilio/status`, `/api/public/twilio/sms`. Until Twilio connector is linked, admin shows "Connect Twilio". I'll link via `standard_connectors--connect` when you're ready.
- **ElevenLabs TTS/STT**: server fns for synth + transcription. Voice preview in admin. Same "Connect" gating.
- **Lovable AI**: chat completions (call reasoning + summaries + RAG answers) and embeddings — uses `LOVABLE_API_KEY` (auto-provisioned).
- **Google Calendar / Outlook sync**: App User Connector flow per staff member (each user links their own calendar). Buttons in Settings.
- **SMS + Email confirmations**: SMS via Twilio; email via a simple server fn (Resend can be connected later — I'll stub with a queue table + logged send so the flow is testable).

**Explicitly deferred to v2 (call out now so we agree)**
- Full realtime bidirectional voice pipeline (Twilio Media Streams ↔ ElevenLabs realtime STT ↔ LLM ↔ TTS with barge-in). The endpoints and data model will be in place; the streaming worker itself is a significant separate build we'll do next once v1 is validated and Twilio is connected.
- Live human transfer (`<Dial>` fallback stub included; call-center routing UI later).
- Multi-language auto-detect (schema supports `language` per call; UI picker in v2).
- Advanced analytics dashboards beyond the KPI overview.

## Technical Details

**Stack (as configured)**: TanStack Start + React 19 + TS + Tailwind v4 + shadcn + Lovable Cloud (Supabase). Firebase is not used.

**Data model (Supabase, all with RLS + grants)**
- `profiles` (id → auth.users, name, email, avatar)
- `app_role` enum (`admin`, `staff`) + `user_roles` + `has_role()` SECURITY DEFINER
- `contacts` (name, phone, email, notes, created_by)
- `calls` (twilio_call_sid, from_number, contact_id, direction, status, started_at, ended_at, duration_s, recording_url, language, transferred, voicemail_url)
- `call_transcripts` (call_id, role, content, ts) — streamed rows for realtime UI
- `call_summaries` (call_id, summary, action_items jsonb, sentiment)
- `appointments` (contact_id, staff_id, starts_at, ends_at, status, source, google_event_id, outlook_event_id, notes)
- `business_hours` (weekday, open, close)
- `holidays` (date, label)
- `kb_documents` (title, storage_path, uploaded_by, status)
- `kb_chunks` (doc_id, content, embedding vector(1536)) — pgvector
- `settings` (singleton row: agent_name, greeting, system_prompt, voice_id, model, transfer_number)
- `notifications` (user_id, type, payload, read_at)

**Server surface**
- Server functions (`src/lib/*.functions.ts`) for all app-internal reads/writes with `requireSupabaseAuth`.
- Public API routes under `src/routes/api/public/twilio/*` for Twilio webhooks (signature-verified in v2 once Twilio is linked; stubbed 401 until then).
- App User Connectors for `google_calendar` and `microsoft_outlook`.

**Routes**
```
/                       marketing landing (Ava pitch, CTA to sign in)
/auth                   sign in / sign up (email + Google)
/_authenticated/
  dashboard             KPIs + live feed
  calls                 list + search
  calls/$id             transcript + summary
  appointments          calendar + list
  contacts              CRM list
  contacts/$id          detail
  knowledge             KB docs upload/list
  settings              profile, calendar connect, notifications
  admin/                (admin-only gate)
    business-hours
    holidays
    ai                  prompt + voice + KB status
    staff               invite/manage, roles
    integrations        Twilio / ElevenLabs / Calendars status
```

**Design system**
- CSS tokens in `src/styles.css`: `--primary: oklch(...)` from #2563EB, `--accent` from #06B6D4, gradient + glow tokens, elevation shadows, glass surface tokens for both themes.
- Custom shadcn button variants: `hero`, `glass`, `soft`.
- Typography: Inter (body) + Space Grotesk (display) via `<link>` in `__root.tsx`.
- Framer-Motion-style CSS transitions (via `tw-animate-css`) for enter/hover.
- Theme toggle persisted in `localStorage`, read in a hydration-safe effect.

## Build order (single turn where possible)

1. Enable Lovable Cloud.
2. Migration: enums, tables, RLS, grants, `has_role`, triggers, pgvector, seed settings.
3. Design system + fonts + theme provider + app shell + landing + `/auth`.
4. Managed `_authenticated` layout (auto by integration) + role gate for `/admin`.
5. Dashboard, calls, appointments, contacts, KB, settings, admin pages with mock-free UI (empty states until data exists).
6. Server fns: CRUD + RAG retrieve + AI summarize + Twilio TwiML entry + connector-status probes.
7. Sitemap + robots + head metadata + verify build.

## What I need from you after this ships

- Say the word to run `standard_connectors--connect` for **Twilio** and **ElevenLabs** — I'll wire the live voice path in the next turn.
- Approve moving the streaming voice worker (Twilio Media Streams ↔ ElevenLabs realtime) into a v2 turn.

Approve this and I'll build v1 end-to-end.
