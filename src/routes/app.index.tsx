import { createFileRoute, Link } from "@tanstack/react-router";
import {
  PhoneCall,
  PhoneMissed,
  CalendarCheck,
  Clock,
  TrendingUp,
  TrendingDown,
  Sparkles,
  ArrowUpRight,
  Radio,
} from "lucide-react";
import {
  calls,
  appointments,
  stats,
  weeklyCallVolume,
  formatDuration,
  relTime,
  formatDateTime,
} from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/app/")({
  head: () => ({ meta: [{ title: "Dashboard — Ava" }, { name: "robots", content: "noindex" }] }),
  component: Dashboard,
});

function Dashboard() {
  return (
    <div className="mx-auto max-w-7xl space-y-6 p-4 sm:p-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-sm text-muted-foreground">
            Live overview of your AI receptionist.
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-full border bg-success/10 px-3 py-1.5 text-xs font-medium text-success">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
          </span>
          Ava online · {stats.activeCalls} active call
        </div>
      </div>

      {/* KPIs */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard title="Calls today" value={stats.callsToday} delta={stats.callsTodayDelta} icon={PhoneCall} />
        <KpiCard title="Missed" value={stats.missedToday} delta={stats.missedDelta} icon={PhoneMissed} invertDelta />
        <KpiCard title="Appointments" value={stats.appointmentsToday} delta={stats.appointmentsDelta} icon={CalendarCheck} />
        <KpiCard title="Avg duration" value={formatDuration(stats.avgDurationSec)} delta={stats.avgDurationDelta} icon={Clock} suffix="s" />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Chart */}
        <div className="card-elevated rounded-2xl p-6 lg:col-span-2">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="font-display text-lg font-semibold">Call volume — this week</h2>
              <p className="text-xs text-muted-foreground">Answered vs missed by day</p>
            </div>
            <Badge variant="secondary" className="gap-1">
              <TrendingUp className="h-3 w-3" /> 92% resolved
            </Badge>
          </div>
          <div className="flex h-56 items-end gap-3">
            {weeklyCallVolume.map((d) => {
              const max = Math.max(...weeklyCallVolume.map((x) => x.calls));
              const h = (d.calls / max) * 100;
              const mh = (d.missed / max) * 100;
              return (
                <div key={d.day} className="flex flex-1 flex-col items-center gap-2">
                  <div className="relative flex h-full w-full items-end">
                    <div
                      className="w-full rounded-t-md bg-gradient-primary shadow-elevated transition-all"
                      style={{ height: `${h}%` }}
                    />
                    <div
                      className="absolute bottom-0 left-1/2 w-2 -translate-x-1/2 rounded-t-sm bg-destructive/70"
                      style={{ height: `${mh}%` }}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground">{d.day}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* AI insights */}
        <div className="card-elevated rounded-2xl p-6">
          <div className="mb-4 flex items-center gap-2">
            <div className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-primary">
              <Sparkles className="h-4 w-4 text-primary-foreground" />
            </div>
            <h2 className="font-display text-lg font-semibold">AI insights</h2>
          </div>
          <ul className="space-y-3 text-sm">
            <InsightItem tone="positive" text="Peak call time is Thu 2–4 PM. Consider adding a second AI agent for that window." />
            <InsightItem tone="warn" text="3 calls this week transferred on 'billing' questions — add billing FAQ to knowledge base." />
            <InsightItem tone="positive" text="Sentiment up 8% vs last week. Customers respond well to your new greeting." />
          </ul>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Live activity */}
        <div className="card-elevated rounded-2xl p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-lg font-semibold">Recent calls</h2>
            <Button asChild variant="ghost" size="sm">
              <Link to="/app/calls">
                View all <ArrowUpRight className="ml-1 h-3.5 w-3.5" />
              </Link>
            </Button>
          </div>
          <div className="space-y-3">
            {calls.slice(0, 5).map((c) => (
              <Link
                key={c.id}
                to="/app/calls/$id"
                params={{ id: c.id }}
                className="group flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-muted/60"
              >
                <div className={`grid h-9 w-9 place-items-center rounded-full ${statusRing(c.status)}`}>
                  {c.status === "missed" ? (
                    <PhoneMissed className="h-4 w-4 text-destructive" />
                  ) : c.status === "in-progress" ? (
                    <Radio className="h-4 w-4 text-success" />
                  ) : (
                    <PhoneCall className="h-4 w-4 text-primary" />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="truncate text-sm font-medium">{c.contactName}</span>
                    <Badge variant="outline" className="text-[10px]">{c.language}</Badge>
                  </div>
                  <p className="truncate text-xs text-muted-foreground">{c.intent}</p>
                </div>
                <div className="text-right text-xs text-muted-foreground">
                  <div>{relTime(c.startedAt)}</div>
                  <div>{formatDuration(c.durationSec)}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Upcoming appointments */}
        <div className="card-elevated rounded-2xl p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-lg font-semibold">Upcoming appointments</h2>
            <Button asChild variant="ghost" size="sm">
              <Link to="/app/appointments">
                View all <ArrowUpRight className="ml-1 h-3.5 w-3.5" />
              </Link>
            </Button>
          </div>
          <div className="space-y-3">
            {appointments.slice(0, 5).map((a) => (
              <div key={a.id} className="flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-muted/60">
                <div className="grid h-9 w-9 place-items-center rounded-full bg-accent/20 text-accent-foreground">
                  <CalendarCheck className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-medium">{a.title}</div>
                  <p className="truncate text-xs text-muted-foreground">
                    {a.contactName} · {a.staff}
                  </p>
                </div>
                <div className="text-right text-xs">
                  <div className="font-medium">{formatDateTime(a.startsAt)}</div>
                  <Badge
                    variant={a.status === "confirmed" ? "default" : a.status === "pending" ? "secondary" : "destructive"}
                    className="mt-1 text-[10px]"
                  >
                    {a.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function statusRing(status: string) {
  if (status === "missed") return "bg-destructive/10";
  if (status === "in-progress") return "bg-success/15";
  if (status === "voicemail") return "bg-warning/15";
  return "bg-primary/10";
}

function KpiCard({
  title,
  value,
  delta,
  icon: Icon,
  invertDelta,
  suffix,
}: {
  title: string;
  value: number | string;
  delta: number;
  icon: React.ComponentType<{ className?: string }>;
  invertDelta?: boolean;
  suffix?: string;
}) {
  const positive = invertDelta ? delta < 0 : delta > 0;
  return (
    <div className="card-elevated group rounded-2xl p-5 transition-all hover:card-elevated-hover">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            {title}
          </p>
          <p className="mt-2 font-display text-3xl font-bold">
            {value}
            {suffix && <span className="text-lg text-muted-foreground">{suffix}</span>}
          </p>
        </div>
        <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-primary opacity-90 shadow-elevated transition-transform group-hover:scale-110">
          <Icon className="h-5 w-5 text-primary-foreground" />
        </div>
      </div>
      <div className={`mt-3 flex items-center gap-1 text-xs font-medium ${positive ? "text-success" : "text-destructive"}`}>
        {positive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
        <span>{delta > 0 ? "+" : ""}{delta}{typeof value === "number" ? "" : "%"}</span>
        <span className="text-muted-foreground">vs yesterday</span>
      </div>
    </div>
  );
}

function InsightItem({ tone, text }: { tone: "positive" | "warn"; text: string }) {
  return (
    <li className="flex items-start gap-2">
      <span
        className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${
          tone === "positive" ? "bg-success" : "bg-warning"
        }`}
      />
      <span className="text-muted-foreground">{text}</span>
    </li>
  );
}
