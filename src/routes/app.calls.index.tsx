import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PhoneCall, PhoneMissed, Radio, Voicemail, ArrowUpRight, Search, PhoneOutgoing } from "lucide-react";
import { calls, formatDuration, relTime, type CallStatus } from "@/lib/mock-data";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/app/calls/")({
  head: () => ({ meta: [{ title: "Calls — Ava" }, { name: "robots", content: "noindex" }] }),
  component: CallsList,
});

const filters: { key: CallStatus | "all"; label: string }[] = [
  { key: "all", label: "All" },
  { key: "completed", label: "Completed" },
  { key: "missed", label: "Missed" },
  { key: "voicemail", label: "Voicemail" },
  { key: "transferred", label: "Transferred" },
];

function CallsList() {
  const [q, setQ] = useState("");
  const [status, setStatus] = useState<(typeof filters)[number]["key"]>("all");

  const filtered = useMemo(() => {
    return calls.filter((c) => {
      const matchesQ =
        !q ||
        c.contactName.toLowerCase().includes(q.toLowerCase()) ||
        c.summary.toLowerCase().includes(q.toLowerCase()) ||
        c.from.includes(q);
      const matchesStatus = status === "all" || c.status === status;
      return matchesQ && matchesStatus;
    });
  }, [q, status]);

  return (
    <div className="mx-auto max-w-7xl space-y-6 p-4 sm:p-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold tracking-tight">Calls</h1>
          <p className="text-sm text-muted-foreground">
            Every conversation Ava handled, with transcripts and AI summaries.
          </p>
        </div>
        <Button className="bg-gradient-primary shadow-elevated hover:shadow-glow">
          <PhoneOutgoing className="mr-2 h-4 w-4" /> Start outbound call
        </Button>
      </div>

      <div className="card-elevated rounded-2xl p-4 sm:p-5">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative min-w-[240px] flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search caller, number, or content…"
              className="pl-9"
            />
          </div>
          <div className="flex flex-wrap gap-1.5">
            {filters.map((f) => (
              <button
                key={f.key}
                onClick={() => setStatus(f.key)}
                className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-all ${
                  status === f.key
                    ? "border-transparent bg-primary text-primary-foreground shadow-elevated"
                    : "bg-background hover:bg-muted"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="card-elevated overflow-hidden rounded-2xl">
        <div className="divide-y">
          {filtered.length === 0 && (
            <div className="p-10 text-center text-sm text-muted-foreground">No calls match your filters.</div>
          )}
          {filtered.map((c) => (
            <Link
              key={c.id}
              to="/app/calls/$id"
              params={{ id: c.id }}
              className="grid grid-cols-12 items-center gap-4 p-4 transition-colors hover:bg-muted/40"
            >
              <div className="col-span-12 flex items-center gap-3 sm:col-span-5">
                <StatusIcon status={c.status} />
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="truncate font-medium">{c.contactName}</span>
                    <Badge variant="outline" className="text-[10px]">{c.direction}</Badge>
                  </div>
                  <div className="truncate text-xs text-muted-foreground">{c.from} · {c.language}</div>
                </div>
              </div>
              <div className="col-span-8 sm:col-span-4">
                <div className="truncate text-sm text-muted-foreground">{c.summary}</div>
              </div>
              <div className="col-span-2 hidden text-sm sm:block">
                <Badge
                  variant={
                    c.sentiment === "positive" ? "default" : c.sentiment === "negative" ? "destructive" : "secondary"
                  }
                  className="text-[10px] capitalize"
                >
                  {c.sentiment}
                </Badge>
              </div>
              <div className="col-span-4 flex items-center justify-end gap-3 sm:col-span-1">
                <div className="text-right text-xs text-muted-foreground">
                  <div>{relTime(c.startedAt)}</div>
                  <div>{formatDuration(c.durationSec)}</div>
                </div>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

function StatusIcon({ status }: { status: CallStatus }) {
  const map = {
    completed: { icon: PhoneCall, cls: "bg-primary/10 text-primary" },
    missed: { icon: PhoneMissed, cls: "bg-destructive/10 text-destructive" },
    voicemail: { icon: Voicemail, cls: "bg-warning/15 text-warning" },
    transferred: { icon: PhoneCall, cls: "bg-accent/20 text-accent-foreground" },
    "in-progress": { icon: Radio, cls: "bg-success/15 text-success" },
  } as const;
  const { icon: Icon, cls } = map[status];
  return (
    <div className={`grid h-10 w-10 shrink-0 place-items-center rounded-full ${cls}`}>
      <Icon className="h-4 w-4" />
    </div>
  );
}
