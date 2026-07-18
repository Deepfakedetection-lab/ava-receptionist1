import { createFileRoute } from "@tanstack/react-router";
import { useSession } from "@/lib/auth-store";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

export const Route = createFileRoute("/app/settings")({
  head: () => ({ meta: [{ title: "Settings — Ava" }, { name: "robots", content: "noindex" }] }),
  component: SettingsPage,
});

function SettingsPage() {
  const { session } = useSession();
  return (
    <div className="mx-auto max-w-3xl space-y-6 p-4 sm:p-6">
      <div>
        <h1 className="font-display text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-sm text-muted-foreground">Your account, preferences, and notifications.</p>
      </div>

      <div className="card-elevated space-y-4 rounded-2xl p-6">
        <h2 className="font-display text-lg font-semibold">Profile</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2"><Label>Name</Label><Input defaultValue={session?.name} /></div>
          <div className="space-y-2"><Label>Email</Label><Input defaultValue={session?.email} /></div>
        </div>
        <div className="flex justify-end"><Button>Save</Button></div>
      </div>

      <div className="card-elevated space-y-4 rounded-2xl p-6">
        <h2 className="font-display text-lg font-semibold">Notifications</h2>
        {[
          "Email me when a call is missed",
          "Push notifications for new appointments",
          "Daily AI summary digest",
          "Weekly analytics report",
        ].map((label) => (
          <div key={label} className="flex items-center justify-between rounded-xl border p-3">
            <span className="text-sm">{label}</span>
            <Switch defaultChecked />
          </div>
        ))}
      </div>

      <div className="card-elevated space-y-3 rounded-2xl p-6">
        <h2 className="font-display text-lg font-semibold">Security</h2>
        <p className="text-sm text-muted-foreground">
          Two-factor authentication and encrypted-at-rest customer data will activate automatically
          once Lovable Cloud is enabled.
        </p>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline">Enable 2FA</Button>
          <Button variant="outline">Rotate API keys</Button>
        </div>
      </div>
    </div>
  );
}
