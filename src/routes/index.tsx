import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Phone,
  Calendar,
  Brain,
  MessageSquare,
  Globe2,
  Shield,
  Zap,
  ArrowRight,
  Sparkles,
  BarChart3,
  Users,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSession } from "@/lib/auth-store";
import { ThemeToggle } from "@/components/theme-toggle";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ava Receptionist — Human-like AI Voice Receptionist" },
      {
        name: "description",
        content:
          "Ava answers calls, books appointments, and syncs with your calendar 24/7 — with a natural voice indistinguishable from a real receptionist.",
      },
    ],
  }),
  component: Landing,
});

const features = [
  { icon: Phone, title: "Natural voice conversations", desc: "Low-latency speech with barge-in — feels like a real person on the line." },
  { icon: Calendar, title: "Books & syncs appointments", desc: "Two-way sync with Google Calendar and Outlook. Confirmations by SMS + email." },
  { icon: Brain, title: "Grounded knowledge base", desc: "RAG over your docs, FAQs, and policies. Ava answers accurately, never hallucinates." },
  { icon: Globe2, title: "Multi-language", desc: "Detects and responds in the caller's language. English, Spanish, Italian, French, and more." },
  { icon: MessageSquare, title: "Live transcripts + summaries", desc: "Every call transcribed, summarized, and tagged with action items." },
  { icon: Shield, title: "Enterprise-grade security", desc: "End-to-end encryption, role-based access, SOC 2-ready architecture." },
];

const stats = [
  { value: "24/7", label: "Always on" },
  { value: "<400ms", label: "Response latency" },
  { value: "99.9%", label: "Uptime SLA" },
  { value: "40+", label: "Languages" },
];

function Landing() {
  const { session } = useSession();
  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <header className="glass sticky top-0 z-40 border-b">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
          <Link to="/" className="flex items-center gap-2">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-primary shadow-elevated">
              <Sparkles className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-display text-lg font-semibold tracking-tight">Ava</span>
            <span className="hidden text-xs font-medium text-muted-foreground sm:inline">
              Receptionist
            </span>
          </Link>
          <nav className="hidden items-center gap-8 md:flex">
            <a href="#features" className="text-sm text-muted-foreground transition-colors hover:text-foreground">Features</a>
            <a href="#how" className="text-sm text-muted-foreground transition-colors hover:text-foreground">How it works</a>
            <a href="#pricing" className="text-sm text-muted-foreground transition-colors hover:text-foreground">Pricing</a>
          </nav>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            {session ? (
              <Button asChild variant="default" size="sm">
                <Link to="/app">Open dashboard</Link>
              </Button>
            ) : (
              <>
                <Button asChild variant="ghost" size="sm" className="hidden sm:inline-flex">
                  <Link to="/auth">Sign in</Link>
                </Button>
                <Button asChild size="sm" className="bg-gradient-primary shadow-elevated hover:shadow-glow">
                  <Link to="/auth">Get started</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden bg-hero">
        <div className="mx-auto max-w-7xl px-4 pb-20 pt-16 sm:px-6 sm:pt-24 lg:pb-32">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border bg-card px-3 py-1 text-xs font-medium text-muted-foreground shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-success"></span>
              </span>
              Live · Handling calls right now
            </div>
            <h1 className="font-display text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
              An AI receptionist
              <br />
              <span className="gradient-text">that sounds human.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl">
              Ava answers every call, books appointments, transfers to your team, and captures
              every detail — 24/7, in 40+ languages, with a voice so natural your customers
              won't know the difference.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button asChild size="lg" className="bg-gradient-primary shadow-elevated hover:shadow-glow">
                <Link to="/auth">
                  Start free trial <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/app">See a live demo</Link>
              </Button>
            </div>
            <p className="mt-4 text-xs text-muted-foreground">No credit card · 100 free minutes</p>
          </div>

          {/* Product mock */}
          <div className="relative mx-auto mt-16 max-w-5xl">
            <div className="absolute inset-x-0 -top-4 h-40 bg-gradient-primary opacity-20 blur-3xl" />
            <div className="glass relative rounded-2xl border p-2 shadow-elevated">
              <div className="rounded-xl bg-card p-6 shadow-sm">
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="grid h-10 w-10 place-items-center rounded-full bg-gradient-primary text-primary-foreground pulse-ring">
                        <Phone className="h-4 w-4" />
                      </div>
                    </div>
                    <div>
                      <div className="text-sm font-semibold">Emily Carter · +1 415 555 0142</div>
                      <div className="text-xs text-muted-foreground">Inbound · English · 00:38</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 rounded-full bg-success/10 px-3 py-1 text-xs font-medium text-success">
                    <span className="h-1.5 w-1.5 rounded-full bg-success" /> Live
                  </div>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex gap-3">
                    <div className="rounded-lg bg-muted px-3 py-2 max-w-xs">
                      "Hi Ava, I'd like to book a cleaning. Any time this week?"
                    </div>
                  </div>
                  <div className="flex justify-end gap-3">
                    <div className="rounded-lg bg-gradient-primary px-3 py-2 text-primary-foreground max-w-xs shadow-elevated">
                      "Absolutely. I have Thursday at 2:30 PM with Dr. Han, or Friday at 10 AM.
                      Which works better?"
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="rounded-lg bg-muted px-3 py-2 max-w-xs">
                      "Thursday 2:30 is perfect."
                    </div>
                  </div>
                  <div className="flex justify-end gap-3">
                    <div className="rounded-lg bg-gradient-primary px-3 py-2 text-primary-foreground max-w-xs shadow-elevated">
                      "Great — booked. I'll text you a confirmation."
                    </div>
                  </div>
                </div>
                <div className="mt-5 flex flex-wrap gap-2 border-t pt-4 text-xs">
                  <span className="rounded-full bg-accent/20 px-2.5 py-1 text-accent-foreground">
                    <CheckCircle2 className="mr-1 inline h-3 w-3" /> Appointment booked
                  </span>
                  <span className="rounded-full bg-accent/20 px-2.5 py-1 text-accent-foreground">
                    <CheckCircle2 className="mr-1 inline h-3 w-3" /> SMS sent
                  </span>
                  <span className="rounded-full bg-accent/20 px-2.5 py-1 text-accent-foreground">
                    <CheckCircle2 className="mr-1 inline h-3 w-3" /> Google Calendar synced
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y bg-muted/30">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 py-12 sm:grid-cols-4 sm:px-6">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="font-display text-3xl font-bold gradient-text sm:text-4xl">
                {s.value}
              </div>
              <div className="mt-1 text-sm text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
            Everything a great receptionist does.
            <span className="gradient-text"> Never sleeps.</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Built for teams that answer every call — from solo practices to global enterprises.
          </p>
        </div>
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div
              key={f.title}
              className="group card-elevated rounded-2xl p-6 hover:card-elevated-hover"
            >
              <div className="mb-4 grid h-11 w-11 place-items-center rounded-xl bg-gradient-primary shadow-elevated transition-transform group-hover:scale-110">
                <f.icon className="h-5 w-5 text-primary-foreground" />
              </div>
              <h3 className="font-display text-lg font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="border-t bg-mesh">
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
              Live in <span className="gradient-text">under 10 minutes</span>
            </h2>
          </div>
          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {[
              { icon: Zap, step: "01", title: "Connect your number", desc: "Forward your existing line or get a fresh Twilio number." },
              { icon: Brain, step: "02", title: "Feed your knowledge", desc: "Upload your FAQs, policies, services — Ava learns instantly." },
              { icon: BarChart3, step: "03", title: "Watch the dashboard", desc: "Live calls, transcripts, appointments, and analytics in real time." },
            ].map((s) => (
              <div key={s.step} className="glass rounded-2xl border p-8">
                <div className="text-sm font-semibold text-primary">{s.step}</div>
                <s.icon className="mt-3 h-8 w-8 text-primary" />
                <h3 className="mt-4 font-display text-xl font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="pricing" className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
        <div className="glass overflow-hidden rounded-3xl border p-10 text-center shadow-elevated sm:p-16">
          <div className="mx-auto max-w-2xl">
            <Users className="mx-auto h-10 w-10 text-primary" />
            <h2 className="mt-4 font-display text-4xl font-bold tracking-tight">
              Never miss a call again.
            </h2>
            <p className="mt-3 text-lg text-muted-foreground">
              Join thousands of businesses trusting Ava to handle every conversation.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button asChild size="lg" className="bg-gradient-primary shadow-elevated hover:shadow-glow">
                <Link to="/auth">
                  Start free trial <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href="mailto:hello@ava.demo">Talk to sales</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-8 text-sm text-muted-foreground sm:flex-row sm:px-6">
          <div className="flex items-center gap-2">
            <div className="grid h-6 w-6 place-items-center rounded-md bg-gradient-primary">
              <Sparkles className="h-3 w-3 text-primary-foreground" />
            </div>
            <span>© 2026 Ava Receptionist</span>
          </div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-foreground">Privacy</a>
            <a href="#" className="hover:text-foreground">Terms</a>
            <a href="#" className="hover:text-foreground">Security</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
