import { createFileRoute } from "@tanstack/react-router";
import { CalendarPlus, Filter, RefreshCcw, CheckCircle2, Clock, XCircle } from "lucide-react";
import { appointments, formatDateTime } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/app/appointments")({
  head: () => ({ meta: [{ title: "Appointments — Ava" }, { name: "robots", content: "noindex" }] }),
  component: AppointmentsPage,
});

function AppointmentsPage() {
  const grouped = appointments.reduce<Record<string, typeof appointments>>((acc, a) => {
    const day = new Date(a.startsAt).toLocaleDateString(undefined, {
      weekday: "long",
      month: "long",
      day: "numeric",
    });
    (acc[day] ||= []).push(a);
    return acc;
  }, {});

  return (
    <div className="mx-auto max-w-7xl space-y-6 p-4 sm:p-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold tracking-tight">Appointments</h1>
          <p className="text-sm text-muted-foreground">
            Synced with Google Calendar & Outlook. Ava books, reschedules and cancels in real time.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm"><RefreshCcw className="mr-2 h-4 w-4" /> Sync</Button>
          <Button variant="outline" size="sm"><Filter className="mr-2 h-4 w-4" /> Filter</Button>
          <Button className="bg-gradient-primary shadow-elevated hover:shadow-glow">
            <CalendarPlus className="mr-2 h-4 w-4" /> New appointment
          </Button>
        </div>
      </div>

      {/* Calendar integrations */}
      <div className="grid gap-4 sm:grid-cols-2">
        <IntegrationCard name="Google Calendar" status="connected" account="ava@northwind.io" />
        <IntegrationCard name="Outlook Calendar" status="not-connected" />
      </div>

      <div className="space-y-6">
        {Object.entries(grouped).map(([day, list]) => (
          <div key={day} className="card-elevated rounded-2xl p-6">
            <h2 className="mb-4 font-display text-lg font-semibold">{day}</h2>
            <div className="space-y-3">
              {list.map((a) => (
                <div key={a.id} className="flex items-center gap-4 rounded-xl border p-4 transition-colors hover:bg-muted/40">
                  <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-primary text-primary-foreground shadow-elevated">
                    {a.status === "confirmed" ? <CheckCircle2 className="h-5 w-5" /> :
                     a.status === "pending" ? <Clock className="h-5 w-5" /> :
                     <XCircle className="h-5 w-5" />}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-medium">{a.title}</span>
                      <Badge variant="outline" className="text-[10px]">{a.source === "ava" ? "Booked by Ava" : "Manual"}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {a.contactName} · with {a.staff}
                      {a.notes ? ` · ${a.notes}` : ""}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">{formatDateTime(a.startsAt)}</div>
                    <Badge
                      className="mt-1 text-[10px] capitalize"
                      variant={a.status === "confirmed" ? "default" : a.status === "pending" ? "secondary" : "destructive"}
                    >
                      {a.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function IntegrationCard({
  name,
  status,
  account,
}: {
  name: string;
  status: "connected" | "not-connected";
  account?: string;
}) {
  return (
    <div className="card-elevated flex items-center justify-between rounded-2xl p-5">
      <div>
        <div className="font-medium">{name}</div>
        <div className="text-xs text-muted-foreground">
          {status === "connected" ? `Connected · ${account}` : "Not connected"}
        </div>
      </div>
      <Button variant={status === "connected" ? "outline" : "default"} size="sm">
        {status === "connected" ? "Manage" : "Connect"}
      </Button>
    </div>
  );
}
