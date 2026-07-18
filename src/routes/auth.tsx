import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Sparkles, Mail, Lock, ArrowRight, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { auth } from "@/lib/auth-store";
import { toast } from "sonner";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Sign in — Ava Receptionist" },
      { name: "description", content: "Sign in to manage your AI receptionist." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (email: string, name?: string) => {
    setLoading(true);
    setTimeout(() => {
      auth.signIn(email, name);
      toast.success("Welcome to Ava");
      navigate({ to: "/app" });
    }, 400);
  };

  return (
    <div className="min-h-screen bg-background bg-mesh">
      <div className="mx-auto flex min-h-screen max-w-6xl">
        {/* Left panel */}
        <div className="hidden flex-1 flex-col justify-between p-12 lg:flex">
          <Link to="/" className="flex items-center gap-2">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-primary shadow-elevated">
              <Sparkles className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-display text-lg font-semibold">Ava Receptionist</span>
          </Link>
          <div className="space-y-6">
            <h1 className="font-display text-4xl font-bold leading-tight">
              The AI receptionist your team{" "}
              <span className="gradient-text">actually trusts.</span>
            </h1>
            <div className="space-y-4">
              {[
                "Handle unlimited calls in parallel",
                "Book appointments in real time",
                "Grounded on your knowledge — never invents answers",
              ].map((t) => (
                <div key={t} className="flex items-start gap-3">
                  <div className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                  <p className="text-muted-foreground">{t}</p>
                </div>
              ))}
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            © 2026 Ava · Enterprise-grade security · SOC 2 ready
          </p>
        </div>

        {/* Right panel */}
        <div className="flex flex-1 items-center justify-center p-6 sm:p-12">
          <div className="w-full max-w-md">
            <div className="mb-8 flex items-center justify-between lg:hidden">
              <Link to="/" className="flex items-center gap-2">
                <div className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-primary">
                  <Sparkles className="h-4 w-4 text-primary-foreground" />
                </div>
                <span className="font-display font-semibold">Ava</span>
              </Link>
            </div>

            <div className="card-elevated rounded-2xl p-8">
              <Tabs defaultValue="signin">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="signin">Sign in</TabsTrigger>
                  <TabsTrigger value="signup">Create account</TabsTrigger>
                </TabsList>

                <TabsContent value="signin" className="mt-6 space-y-4">
                  <h2 className="font-display text-2xl font-semibold">Welcome back</h2>
                  <p className="text-sm text-muted-foreground">
                    Enter any email to try the demo. No password required.
                  </p>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      const fd = new FormData(e.currentTarget);
                      handleSubmit(String(fd.get("email") || "demo@ava.app"));
                    }}
                    className="space-y-4"
                  >
                    <div className="space-y-2">
                      <Label htmlFor="signin-email">Work email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          id="signin-email"
                          name="email"
                          type="email"
                          placeholder="you@company.com"
                          className="pl-9"
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signin-password">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          id="signin-password"
                          type="password"
                          placeholder="••••••••"
                          className="pl-9"
                          defaultValue="demo-mode"
                        />
                      </div>
                    </div>
                    <Button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-gradient-primary shadow-elevated hover:shadow-glow"
                    >
                      {loading ? "Signing in..." : (<>Sign in <ArrowRight className="ml-2 h-4 w-4" /></>)}
                    </Button>
                  </form>
                  <div className="relative py-2 text-center text-xs uppercase text-muted-foreground">
                    <span className="absolute left-0 top-1/2 h-px w-full bg-border" />
                    <span className="relative bg-card px-2">or</span>
                  </div>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => handleSubmit("google.user@ava.demo", "Google User")}
                  >
                    Continue with Google
                  </Button>
                </TabsContent>

                <TabsContent value="signup" className="mt-6 space-y-4">
                  <h2 className="font-display text-2xl font-semibold">Create your account</h2>
                  <p className="text-sm text-muted-foreground">Start your free 14-day trial.</p>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      const fd = new FormData(e.currentTarget);
                      handleSubmit(
                        String(fd.get("email") || "demo@ava.app"),
                        String(fd.get("name") || "New User"),
                      );
                    }}
                    className="space-y-4"
                  >
                    <div className="space-y-2">
                      <Label htmlFor="signup-name">Full name</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input id="signup-name" name="name" placeholder="Jane Doe" className="pl-9" required />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-email">Work email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input id="signup-email" name="email" type="email" placeholder="you@company.com" className="pl-9" required />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-password">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input id="signup-password" type="password" placeholder="At least 8 characters" className="pl-9" defaultValue="demo-mode" />
                      </div>
                    </div>
                    <Button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-gradient-primary shadow-elevated hover:shadow-glow"
                    >
                      {loading ? "Creating..." : "Create account"}
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            </div>
            <p className="mt-6 text-center text-xs text-muted-foreground">
              This is a demo. Full backend (Cloud, roles, encryption) activates on enabling
              Lovable Cloud.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
