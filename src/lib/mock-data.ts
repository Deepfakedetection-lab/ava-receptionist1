// Mock data for the Ava Receptionist dashboard.
// Replace with server-function reads once Lovable Cloud is enabled.

export type CallStatus = "completed" | "missed" | "voicemail" | "transferred" | "in-progress";
export type CallDirection = "inbound" | "outbound";

export interface Contact {
  id: string;
  name: string;
  phone: string;
  email?: string;
  company?: string;
  createdAt: string;
  callCount: number;
  tags: string[];
}

export interface Call {
  id: string;
  contactId: string;
  contactName: string;
  from: string;
  direction: CallDirection;
  status: CallStatus;
  startedAt: string;
  durationSec: number;
  language: string;
  intent: string;
  sentiment: "positive" | "neutral" | "negative";
  summary: string;
  actionItems: string[];
  transcript: { role: "ava" | "caller"; text: string; t: string }[];
}

export interface Appointment {
  id: string;
  contactId: string;
  contactName: string;
  title: string;
  startsAt: string;
  endsAt: string;
  status: "confirmed" | "pending" | "cancelled";
  source: "ava" | "manual";
  staff: string;
  notes?: string;
}

export interface KbDoc {
  id: string;
  title: string;
  size: string;
  type: "pdf" | "txt" | "md" | "docx";
  uploadedAt: string;
  status: "indexed" | "processing" | "error";
  chunks: number;
}

export interface Staff {
  id: string;
  name: string;
  email: string;
  role: "admin" | "staff";
  active: boolean;
  avatarUrl?: string;
}

export const contacts: Contact[] = [
  { id: "c1", name: "Emily Carter", phone: "+1 415 555 0142", email: "emily@northwind.io", company: "Northwind Dental", createdAt: "2026-05-12", callCount: 4, tags: ["VIP", "Patient"] },
  { id: "c2", name: "Marcus Johnson", phone: "+1 212 555 0891", email: "marcus.j@lumina.co", company: "Lumina Legal", createdAt: "2026-06-01", callCount: 2, tags: ["Lead"] },
  { id: "c3", name: "Sofia Rossi", phone: "+39 06 5555 0033", email: "sofia@rossi.it", company: "Studio Rossi", createdAt: "2026-06-14", callCount: 7, tags: ["Enterprise"] },
  { id: "c4", name: "Daniel Park", phone: "+1 646 555 7712", email: "dpark@atlas.dev", company: "Atlas Health", createdAt: "2026-07-02", callCount: 1, tags: [] },
  { id: "c5", name: "Priya Nair", phone: "+91 98450 22110", email: "priya.n@brava.in", company: "Brava Clinic", createdAt: "2026-07-05", callCount: 3, tags: ["Patient"] },
  { id: "c6", name: "James O'Connor", phone: "+353 1 555 8899", email: "james@ocongroup.ie", company: "O'Connor Group", createdAt: "2026-07-09", callCount: 2, tags: ["Lead"] },
];

const now = new Date();
const iso = (offsetMin: number) => new Date(now.getTime() + offsetMin * 60_000).toISOString();

export const calls: Call[] = [
  {
    id: "call_9821",
    contactId: "c1",
    contactName: "Emily Carter",
    from: "+1 415 555 0142",
    direction: "inbound",
    status: "completed",
    startedAt: iso(-38),
    durationSec: 214,
    language: "English",
    intent: "Book appointment",
    sentiment: "positive",
    summary: "Emily called to book a cleaning appointment. Confirmed Thursday 2:30 PM with Dr. Han. Reminded her to bring insurance card. Follow-up SMS confirmation sent.",
    actionItems: [
      "Confirmed appointment for Thursday 2:30 PM",
      "Sent SMS + email confirmation",
      "Added note: bring updated insurance card",
    ],
    transcript: [
      { role: "ava", text: "Hi, thanks for calling Northwind Dental. This is Ava — how can I help you today?", t: "00:00" },
      { role: "caller", text: "Hi Ava, I'd like to book a cleaning. Any time this week?", t: "00:04" },
      { role: "ava", text: "Absolutely. I have Thursday at 2:30 PM with Dr. Han, or Friday at 10 AM. Which works better?", t: "00:09" },
      { role: "caller", text: "Thursday at 2:30 is perfect.", t: "00:18" },
      { role: "ava", text: "Great — booked. I'll text you a confirmation. Anything else?", t: "00:22" },
      { role: "caller", text: "That's it, thank you!", t: "00:29" },
      { role: "ava", text: "You're welcome, Emily. Have a wonderful day.", t: "00:31" },
    ],
  },
  {
    id: "call_9820",
    contactId: "c3",
    contactName: "Sofia Rossi",
    from: "+39 06 5555 0033",
    direction: "inbound",
    status: "transferred",
    startedAt: iso(-92),
    durationSec: 88,
    language: "Italian",
    intent: "Billing question",
    sentiment: "neutral",
    summary: "Sofia asked about a billing discrepancy on her last invoice. Confidence low on billing policy — transferred to Marco in accounts.",
    actionItems: ["Transferred to Marco (accounts)", "Attached invoice #INV-4412 to context"],
    transcript: [
      { role: "ava", text: "Buongiorno, sono Ava. Come posso aiutarla?", t: "00:00" },
      { role: "caller", text: "Ho una domanda sulla mia fattura di giugno.", t: "00:03" },
      { role: "ava", text: "Certo. Un attimo, la trasferisco a Marco della contabilità.", t: "00:07" },
    ],
  },
  {
    id: "call_9819",
    contactId: "c2",
    contactName: "Marcus Johnson",
    from: "+1 212 555 0891",
    direction: "inbound",
    status: "voicemail",
    startedAt: iso(-160),
    durationSec: 42,
    language: "English",
    intent: "Callback request",
    sentiment: "neutral",
    summary: "Marcus left a voicemail requesting a callback about a partnership opportunity. Left number and best time (afternoons).",
    actionItems: ["Task created: Return call to Marcus, afternoon"],
    transcript: [
      { role: "ava", text: "You've reached Lumina Legal. Please leave a message after the tone.", t: "00:00" },
      { role: "caller", text: "Hi, this is Marcus Johnson. Please call me back about a partnership — afternoons are best.", t: "00:04" },
    ],
  },
  {
    id: "call_9818",
    contactId: "c4",
    contactName: "Daniel Park",
    from: "+1 646 555 7712",
    direction: "inbound",
    status: "missed",
    startedAt: iso(-240),
    durationSec: 0,
    language: "English",
    intent: "Unknown",
    sentiment: "neutral",
    summary: "Call dropped before Ava could connect (network issue).",
    actionItems: [],
    transcript: [],
  },
  {
    id: "call_9817",
    contactId: "c5",
    contactName: "Priya Nair",
    from: "+91 98450 22110",
    direction: "inbound",
    status: "completed",
    startedAt: iso(-360),
    durationSec: 178,
    language: "English",
    intent: "Reschedule appointment",
    sentiment: "positive",
    summary: "Priya rescheduled her Wednesday appointment to Friday 11 AM. Confirmed with SMS.",
    actionItems: ["Rescheduled to Friday 11 AM", "SMS confirmation sent"],
    transcript: [
      { role: "ava", text: "Hi Priya, welcome back — how can I help?", t: "00:00" },
      { role: "caller", text: "Could I move Wednesday's appointment to Friday morning?", t: "00:04" },
      { role: "ava", text: "Sure — Friday at 11 AM is open. Booked.", t: "00:09" },
    ],
  },
  {
    id: "call_9816",
    contactId: "c6",
    contactName: "James O'Connor",
    from: "+353 1 555 8899",
    direction: "outbound",
    status: "completed",
    startedAt: iso(-500),
    durationSec: 265,
    language: "English",
    intent: "Follow-up",
    sentiment: "positive",
    summary: "Follow-up on quote #Q-2201. James is ready to proceed and requested a contract by email.",
    actionItems: ["Send contract Q-2201 to james@ocongroup.ie"],
    transcript: [],
  },
];

export const appointments: Appointment[] = [
  { id: "a1", contactId: "c1", contactName: "Emily Carter", title: "Dental cleaning", startsAt: iso(60 * 8), endsAt: iso(60 * 8 + 45), status: "confirmed", source: "ava", staff: "Dr. Han", notes: "Bring insurance card" },
  { id: "a2", contactId: "c5", contactName: "Priya Nair", title: "Consultation", startsAt: iso(60 * 26), endsAt: iso(60 * 26 + 30), status: "confirmed", source: "ava", staff: "Dr. Alvarez" },
  { id: "a3", contactId: "c3", contactName: "Sofia Rossi", title: "Contract review", startsAt: iso(60 * 32), endsAt: iso(60 * 32 + 60), status: "pending", source: "manual", staff: "Marco Bianchi" },
  { id: "a4", contactId: "c6", contactName: "James O'Connor", title: "Kick-off call", startsAt: iso(60 * 50), endsAt: iso(60 * 50 + 30), status: "confirmed", source: "ava", staff: "Alex Chen" },
  { id: "a5", contactId: "c2", contactName: "Marcus Johnson", title: "Partnership discussion", startsAt: iso(60 * 72), endsAt: iso(60 * 72 + 45), status: "pending", source: "manual", staff: "Alex Chen" },
];

export const kbDocs: KbDoc[] = [
  { id: "k1", title: "Company FAQ.pdf", size: "412 KB", type: "pdf", uploadedAt: "2026-06-01", status: "indexed", chunks: 42 },
  { id: "k2", title: "Services & Pricing.md", size: "18 KB", type: "md", uploadedAt: "2026-06-10", status: "indexed", chunks: 12 },
  { id: "k3", title: "Cancellation Policy.docx", size: "36 KB", type: "docx", uploadedAt: "2026-07-01", status: "indexed", chunks: 6 },
  { id: "k4", title: "New Patient Intake.pdf", size: "220 KB", type: "pdf", uploadedAt: "2026-07-08", status: "processing", chunks: 0 },
];

export const staff: Staff[] = [
  { id: "s1", name: "Alex Chen", email: "alex@ava.demo", role: "admin", active: true },
  { id: "s2", name: "Dr. Han", email: "han@ava.demo", role: "staff", active: true },
  { id: "s3", name: "Dr. Alvarez", email: "alvarez@ava.demo", role: "staff", active: true },
  { id: "s4", name: "Marco Bianchi", email: "marco@ava.demo", role: "staff", active: false },
];

export const stats = {
  callsToday: 47,
  callsTodayDelta: 12,
  missedToday: 3,
  missedDelta: -2,
  appointmentsToday: 18,
  appointmentsDelta: 4,
  avgDurationSec: 142,
  avgDurationDelta: -8,
  resolutionRate: 92,
  activeCalls: 1,
};

export const weeklyCallVolume = [
  { day: "Mon", calls: 32, missed: 4 },
  { day: "Tue", calls: 41, missed: 2 },
  { day: "Wed", calls: 38, missed: 5 },
  { day: "Thu", calls: 52, missed: 3 },
  { day: "Fri", calls: 47, missed: 3 },
  { day: "Sat", calls: 22, missed: 1 },
  { day: "Sun", calls: 14, missed: 2 },
];

export function formatDuration(sec: number): string {
  if (!sec) return "—";
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export function relTime(iso: string): string {
  const diff = (Date.now() - new Date(iso).getTime()) / 1000;
  if (diff < 60) return "just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  const d = Math.floor(diff / 86400);
  if (d < 7) return `${d}d ago`;
  return new Date(iso).toLocaleDateString();
}

export function formatDateTime(iso: string): string {
  return new Date(iso).toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}
