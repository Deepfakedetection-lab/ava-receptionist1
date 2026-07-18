import { createFileRoute } from "@tanstack/react-router";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { staff } from "@/lib/mock-data";
import { Users, Clock, MessageSquare, Waves, Plug, Plus, Trash2 } from "lucide-react";

export const Route = createFileRoute("/app/admin")({
  head: () => ({ meta: [{ title: "Admin — Ava" }, { name: "robots", content: "noindex" }] }),
  component: AdminPage,
});

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

function AdminPage() {
  return (
    <div className="mx-auto max-w-7xl space-y-6 p-4 sm:p-6">
      <div>
        <h1 className="font-display text-3xl font-bold tracking-tight">Admin console</h1>
        <p className="text-sm text-muted-foreground">Configure Ava's brain, hours, voice, integrations, and team.</p>
      </div>

      <Tabs defaultValue="prompt">
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-5">
          <TabsTrigger value="prompt"><MessageSquare className="mr-2 h-4 w-4" />AI</TabsTrigger>
          <TabsTrigger value="voice"><Waves className="mr-2 h-4 w-4" />Voice</TabsTrigger>
          <TabsTrigger value="hours"><Clock className="mr-2 h-4 w-4" />Hours</TabsTrigger>
          <TabsTrigger value="integrations"><Plug className="mr-2 h-4 w-4" />Integrations</TabsTrigger>
          <TabsTrigger value="team"><Users className="mr-2 h-4 w-4" />Team</TabsTrigger>
        </TabsList>

        <TabsContent value="prompt" className="mt-6 space-y-4">
          <Panel title="Persona & instructions" description="How Ava should sound, what she should do, and what she shouldn't.">
            <div className="space-y-2">
              <Label>Business name</Label>
              <Input defaultValue="Northwind Dental" />
            </div>
            <div className="space-y-2">
              <Label>Greeting</Label>
              <Input defaultValue="Hi, thanks for calling Northwind Dental. This is Ava — how can I help you today?" />
            </div>
            <div className="space-y-2">
              <Label>System prompt</Label>
              <Textarea
                rows={8}
                defaultValue={`You are Ava, a warm and efficient receptionist for Northwind Dental.
- Always confirm caller name, phone, and reason for the call.
- Book, reschedule or cancel appointments using the calendar tool.
- Answer questions using only the knowledge base. If unsure, offer to transfer.
- Escalate billing questions to Marco in accounts.
- Speak naturally, use the caller's name, and stay concise.`}
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <ToggleRow label="Barge-in (interruption handling)" defaultChecked description="Let callers interrupt Ava mid-sentence." />
              <ToggleRow label="Transfer on low confidence" defaultChecked description="Escalate to a human when unsure." />
              <ToggleRow label="Auto SMS confirmation" defaultChecked />
              <ToggleRow label="Auto email confirmation" defaultChecked />
            </div>
            <div className="flex justify-end"><Button className="bg-gradient-primary shadow-elevated hover:shadow-glow">Save changes</Button></div>
          </Panel>
        </TabsContent>

        <TabsContent value="voice" className="mt-6 space-y-4">
          <Panel title="Voice & language" description="Powered by ElevenLabs. Callers hear this voice.">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Voice</Label>
                <select className="w-full rounded-lg border bg-background px-3 py-2 text-sm">
                  <option>Aria — warm, professional (English)</option>
                  <option>Rachel — friendly (English)</option>
                  <option>Sofia — clear (Italian)</option>
                  <option>Priya — energetic (Hindi/English)</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label>Primary language</Label>
                <select className="w-full rounded-lg border bg-background px-3 py-2 text-sm">
                  <option>English (US)</option>
                  <option>English (UK)</option>
                  <option>Spanish</option>
                  <option>French</option>
                  <option>Italian</option>
                  <option>German</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label>Speaking speed</Label>
                <input type="range" defaultValue={50} className="w-full" />
              </div>
              <div className="space-y-2">
                <Label>Response latency target</Label>
                <select className="w-full rounded-lg border bg-background px-3 py-2 text-sm">
                  <option>Ultra low (300ms)</option>
                  <option>Balanced (500ms)</option>
                  <option>High quality (800ms)</option>
                </select>
              </div>
            </div>
            <ToggleRow label="Auto-detect caller language" defaultChecked />
            <div className="flex justify-end"><Button className="bg-gradient-primary shadow-elevated hover:shadow-glow">Save</Button></div>
          </Panel>
        </TabsContent>

        <TabsContent value="hours" className="mt-6 space-y-4">
          <Panel title="Business hours" description="Outside these hours, Ava takes voicemail or transfers to on-call staff.">
            <div className="space-y-3">
              {days.map((d) => (
                <div key={d} className="grid grid-cols-12 items-center gap-3">
                  <div className="col-span-3 font-medium">{d}</div>
                  <div className="col-span-2"><Switch defaultChecked={d !== "Sunday"} /></div>
                  <div className="col-span-3"><Input type="time" defaultValue="09:00" /></div>
                  <div className="col-span-1 text-center text-muted-foreground">—</div>
                  <div className="col-span-3"><Input type="time" defaultValue="18:00" /></div>
                </div>
              ))}
            </div>
          </Panel>
          <Panel title="Holidays" description="Full-day closures Ava will honor.">
            <div className="flex flex-wrap gap-2">
              {["Dec 25", "Jan 1", "Jul 4", "Nov 27"].map((h) => (
                <Badge key={h} variant="secondary" className="gap-1">
                  {h} <button className="ml-1 opacity-60 hover:opacity-100">×</button>
                </Badge>
              ))}
              <Button variant="outline" size="sm"><Plus className="mr-1 h-3.5 w-3.5" /> Add</Button>
            </div>
          </Panel>
        </TabsContent>

        <TabsContent value="integrations" className="mt-6 space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <IntegrationRow name="Twilio Voice" desc="Phone number provisioning and call routing." status="setup" />
            <IntegrationRow name="ElevenLabs" desc="Ultra-low latency voice + STT." status="setup" />
            <IntegrationRow name="Google Calendar" desc="Two-way appointment sync." status="connected" />
            <IntegrationRow name="Outlook Calendar" desc="Two-way appointment sync." status="not-connected" />
            <IntegrationRow name="HubSpot CRM" desc="Push contacts and call notes." status="not-connected" />
            <IntegrationRow name="Slack" desc="Real-time alerts for missed calls." status="not-connected" />
          </div>
        </TabsContent>

        <TabsContent value="team" className="mt-6 space-y-4">
          <Panel title="Staff & roles" description="Admins manage everything. Staff see calls, appointments, and contacts.">
            <div className="divide-y">
              {staff.map((s) => (
                <div key={s.id} className="flex items-center gap-3 py-3">
                  <div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-primary text-xs font-medium text-primary-foreground">
                    {s.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">{s.name}</div>
                    <div className="text-xs text-muted-foreground">{s.email}</div>
                  </div>
                  <Badge variant={s.role === "admin" ? "default" : "secondary"}>{s.role}</Badge>
                  <Badge variant="outline" className={s.active ? "text-success" : "text-muted-foreground"}>
                    {s.active ? "Active" : "Inactive"}
                  </Badge>
                  <Button variant="ghost" size="icon" className="h-8 w-8"><Trash2 className="h-4 w-4" /></Button>
                </div>
              ))}
            </div>
            <div className="flex justify-end"><Button><Plus className="mr-2 h-4 w-4" /> Invite teammate</Button></div>
          </Panel>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function Panel({ title, description, children }: { title: string; description?: string; children: React.ReactNode }) {
  return (
    <div className="card-elevated space-y-4 rounded-2xl p-6">
      <div>
        <h2 className="font-display text-lg font-semibold">{title}</h2>
        {description && <p className="text-sm text-muted-foreground">{description}</p>}
      </div>
      {children}
    </div>
  );
}

function ToggleRow({ label, description, defaultChecked }: { label: string; description?: string; defaultChecked?: boolean }) {
  return (
    <div className="flex items-start justify-between rounded-xl border p-3">
      <div>
        <div className="text-sm font-medium">{label}</div>
        {description && <div className="text-xs text-muted-foreground">{description}</div>}
      </div>
      <Switch defaultChecked={defaultChecked} />
    </div>
  );
}

function IntegrationRow({ name, desc, status }: { name: string; desc: string; status: "connected" | "setup" | "not-connected" }) {
  const label = status === "connected" ? "Connected" : status === "setup" ? "Setup required" : "Not connected";
  return (
    <div className="card-elevated flex items-start justify-between rounded-2xl p-5">
      <div className="min-w-0">
        <div className="font-medium">{name}</div>
        <p className="text-xs text-muted-foreground">{desc}</p>
        <Badge
          variant={status === "connected" ? "default" : "secondary"}
          className={`mt-2 text-[10px] ${status === "connected" ? "" : status === "setup" ? "text-warning" : ""}`}
        >
          {label}
        </Badge>
      </div>
      <Button size="sm" variant={status === "connected" ? "outline" : "default"}>
        {status === "connected" ? "Manage" : "Connect"}
      </Button>
    </div>
  );
}
