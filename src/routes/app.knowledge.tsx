import { createFileRoute } from "@tanstack/react-router";
import { Upload, FileText, CheckCircle2, Loader2, AlertCircle, Sparkles, Trash2 } from "lucide-react";
import { kbDocs } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/app/knowledge")({
  head: () => ({ meta: [{ title: "Knowledge base — Ava" }, { name: "robots", content: "noindex" }] }),
  component: KnowledgePage,
});

function KnowledgePage() {
  return (
    <div className="mx-auto max-w-7xl space-y-6 p-4 sm:p-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold tracking-tight">Knowledge base</h1>
          <p className="text-sm text-muted-foreground">
            Upload FAQs, policies, and services. Ava grounds every answer in your documents — never invents.
          </p>
        </div>
        <Button className="bg-gradient-primary shadow-elevated hover:shadow-glow">
          <Upload className="mr-2 h-4 w-4" /> Upload document
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Documents" value={kbDocs.length.toString()} />
        <StatCard label="Indexed chunks" value={kbDocs.reduce((s, d) => s + d.chunks, 0).toString()} />
        <StatCard label="Grounding score" value="98%" hint="AI grounded rate this week" />
      </div>

      {/* Dropzone */}
      <label className="card-elevated block cursor-pointer rounded-2xl border-2 border-dashed border-border p-10 text-center transition-colors hover:border-primary/50 hover:bg-primary/5">
        <input type="file" className="hidden" multiple />
        <Upload className="mx-auto h-8 w-8 text-muted-foreground" />
        <p className="mt-3 font-medium">Drop files here or click to upload</p>
        <p className="text-xs text-muted-foreground">PDF, DOCX, MD, TXT — up to 25 MB per file</p>
      </label>

      <div className="card-elevated overflow-hidden rounded-2xl">
        <div className="border-b p-4">
          <h2 className="font-display text-lg font-semibold">Indexed documents</h2>
        </div>
        <div className="divide-y">
          {kbDocs.map((d) => (
            <div key={d.id} className="flex items-center gap-4 p-4">
              <div className="grid h-10 w-10 place-items-center rounded-lg bg-primary/10 text-primary">
                <FileText className="h-5 w-5" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="truncate font-medium">{d.title}</div>
                <div className="text-xs text-muted-foreground">
                  {d.size} · Uploaded {d.uploadedAt} · {d.chunks} chunks
                </div>
              </div>
              <StatusBadge status={d.status} />
              <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>

      <div className="card-elevated rounded-2xl p-6">
        <div className="mb-3 flex items-center gap-2">
          <div className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-primary">
            <Sparkles className="h-4 w-4 text-primary-foreground" />
          </div>
          <h2 className="font-display text-lg font-semibold">Test the knowledge base</h2>
        </div>
        <p className="mb-4 text-sm text-muted-foreground">Ask a question the way a caller would.</p>
        <div className="flex gap-2">
          <input
            className="flex-1 rounded-lg border bg-background px-4 py-2 text-sm"
            placeholder="e.g. What's your cancellation policy?"
          />
          <Button className="bg-gradient-primary shadow-elevated hover:shadow-glow">Ask Ava</Button>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <div className="card-elevated rounded-2xl p-5">
      <div className="text-xs uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="mt-1 font-display text-3xl font-bold">{value}</div>
      {hint && <div className="mt-1 text-xs text-muted-foreground">{hint}</div>}
    </div>
  );
}

function StatusBadge({ status }: { status: "indexed" | "processing" | "error" }) {
  if (status === "indexed")
    return (
      <Badge className="gap-1 bg-success/15 text-success hover:bg-success/20" variant="secondary">
        <CheckCircle2 className="h-3 w-3" /> Indexed
      </Badge>
    );
  if (status === "processing")
    return (
      <Badge variant="secondary" className="gap-1">
        <Loader2 className="h-3 w-3 animate-spin" /> Processing
      </Badge>
    );
  return (
    <Badge variant="destructive" className="gap-1">
      <AlertCircle className="h-3 w-3" /> Error
    </Badge>
  );
}
