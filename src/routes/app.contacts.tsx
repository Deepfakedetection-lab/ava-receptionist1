import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Search, UserPlus, Mail, Phone, Building2 } from "lucide-react";
import { contacts } from "@/lib/mock-data";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export const Route = createFileRoute("/app/contacts")({
  head: () => ({ meta: [{ title: "Contacts — Ava" }, { name: "robots", content: "noindex" }] }),
  component: ContactsPage,
});

function ContactsPage() {
  const [q, setQ] = useState("");
  const filtered = contacts.filter(
    (c) =>
      !q ||
      c.name.toLowerCase().includes(q.toLowerCase()) ||
      c.email?.toLowerCase().includes(q.toLowerCase()) ||
      c.phone.includes(q),
  );

  return (
    <div className="mx-auto max-w-7xl space-y-6 p-4 sm:p-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold tracking-tight">Contacts</h1>
          <p className="text-sm text-muted-foreground">Customers Ava has spoken with — synced to your CRM.</p>
        </div>
        <Button className="bg-gradient-primary shadow-elevated hover:shadow-glow">
          <UserPlus className="mr-2 h-4 w-4" /> Add contact
        </Button>
      </div>

      <div className="card-elevated rounded-2xl p-4">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search name, phone, email…" className="pl-9" />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((c) => (
          <div key={c.id} className="card-elevated rounded-2xl p-5 transition-all hover:card-elevated-hover">
            <div className="flex items-start gap-3">
              <Avatar className="h-11 w-11">
                <AvatarFallback className="bg-gradient-primary text-primary-foreground">
                  {c.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <div className="truncate font-medium">{c.name}</div>
                {c.company && (
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Building2 className="h-3 w-3" /> {c.company}
                  </div>
                )}
              </div>
              <Badge variant="secondary" className="text-[10px]">{c.callCount} calls</Badge>
            </div>
            <div className="mt-4 space-y-1.5 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Phone className="h-3.5 w-3.5" /> {c.phone}
              </div>
              {c.email && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="h-3.5 w-3.5" /> <span className="truncate">{c.email}</span>
                </div>
              )}
            </div>
            {c.tags.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-1">
                {c.tags.map((t) => (
                  <Badge key={t} variant="outline" className="text-[10px]">{t}</Badge>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
