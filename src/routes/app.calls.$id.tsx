import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, PhoneCall, Sparkles, Download, Send, Copy, User, Bot } from "lucide-react";
import { calls, formatDuration, type Call } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const Route = createFileRoute("/app/calls/$id")({
  head: ({ params }) => ({
    meta: [{ title: `Call ${params.id} — Ava` }, { name: "robots", content: "noindex" }],
  }),
  component: CallDetail,
  errorComponent: () => <div className="p-8 text-sm text-muted-foreground">Failed to load call.</div>,
  notFoundComponent: () => (
    <div className="p-8 text-sm text-muted-foreground">
      Call not found. <Link to="/app/calls" className="text-primary underline">Back to calls</Link>
    </div>
  ),
  loader: ({ params }): { call: Call } => {
    const call = calls.find((c) => c.id === params.id);
    if (!call) throw notFound();
    return { call };
  },
});

function CallDetail() {
  const { call } = Route.useLoaderData() as { call: Call };

  return (
    <div className="mx-auto max-w-7xl space-y-6 p-4 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Button asChild variant="ghost" size="sm">
          <Link to="/app/calls">
            <ArrowLeft className="mr-2 h-4 w-4" /> All calls
          </Link>
        </Button>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" /> Export transcript
          </Button>
          <Button size="sm" className="bg-gradient-primary shadow-elevated hover:shadow-glow">
            <Send className="mr-2 h-4 w-4" /> Send to CRM
          </Button>
        </div>
      </div>

      <div className="card-elevated rounded-2xl p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-primary shadow-elevated">
              <PhoneCall className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-display text-2xl font-bold">{call.contactName}</h1>
              <p className="text-sm text-muted-foreground">{call.from} · {new Date(call.startedAt).toLocaleString()}</p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                <Badge>{call.status}</Badge>
                <Badge variant="outline">{call.direction}</Badge>
                <Badge variant="outline">{call.language}</Badge>
                <Badge variant="secondary">{call.intent}</Badge>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-xs uppercase tracking-wider text-muted-foreground">Duration</div>
            <div className="font-display text-2xl font-bold">{formatDuration(call.durationSec)}</div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Transcript */}
        <div className="card-elevated rounded-2xl p-6 lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-lg font-semibold">Transcript</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                navigator.clipboard.writeText(
                  call.transcript.map((t) => `[${t.t}] ${t.role.toUpperCase()}: ${t.text}`).join("\n"),
                );
                toast.success("Transcript copied");
              }}
            >
              <Copy className="mr-2 h-3.5 w-3.5" /> Copy
            </Button>
          </div>
          {call.transcript.length === 0 ? (
            <p className="text-sm text-muted-foreground">No transcript available for this call.</p>
          ) : (
            <div className="space-y-4">
              {call.transcript.map((t, i) => (
                <div key={i} className={`flex gap-3 ${t.role === "ava" ? "" : "flex-row-reverse"}`}>
                  <div className={`grid h-8 w-8 shrink-0 place-items-center rounded-full ${
                    t.role === "ava" ? "bg-gradient-primary" : "bg-muted"
                  }`}>
                    {t.role === "ava"
                      ? <Bot className="h-4 w-4 text-primary-foreground" />
                      : <User className="h-4 w-4" />}
                  </div>
                  <div className={`max-w-[75%] rounded-2xl px-4 py-2.5 text-sm ${
                    t.role === "ava" ? "bg-primary/10 text-foreground" : "bg-muted"
                  }`}>
                    <div className="mb-1 flex items-center gap-2 text-[10px] uppercase tracking-wider text-muted-foreground">
                      <span>{t.role === "ava" ? "Ava" : call.contactName}</span>
                      <span>·</span>
                      <span>{t.t}</span>
                    </div>
                    <p>{t.text}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Summary & actions */}
        <div className="space-y-6">
          <div className="card-elevated rounded-2xl p-6">
            <div className="mb-3 flex items-center gap-2">
              <div className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-primary">
                <Sparkles className="h-4 w-4 text-primary-foreground" />
              </div>
              <h2 className="font-display text-lg font-semibold">AI summary</h2>
            </div>
            <p className="text-sm text-muted-foreground">{call.summary}</p>
          </div>

          <div className="card-elevated rounded-2xl p-6">
            <h2 className="mb-3 font-display text-lg font-semibold">Action items</h2>
            {call.actionItems.length === 0 ? (
              <p className="text-sm text-muted-foreground">No action items detected.</p>
            ) : (
              <ul className="space-y-2 text-sm">
                {call.actionItems.map((a, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary" />
                    <span>{a}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="card-elevated rounded-2xl p-6">
            <h2 className="mb-3 font-display text-lg font-semibold">Signals</h2>
            <div className="space-y-2 text-sm">
              <SignalRow label="Sentiment" value={call.sentiment} />
              <SignalRow label="Intent" value={call.intent} />
              <SignalRow label="Language" value={call.language} />
              <SignalRow label="Direction" value={call.direction} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SignalRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium capitalize">{value}</span>
    </div>
  );
}
