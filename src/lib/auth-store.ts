// Lightweight local auth session. Replace with Lovable Cloud auth when enabled.
import { useEffect, useState } from "react";

export type Role = "admin" | "staff";
export interface Session {
  id: string;
  email: string;
  name: string;
  role: Role;
}

const STORAGE_KEY = "ava-session";

type Listener = (s: Session | null) => void;
const listeners = new Set<Listener>();

function read(): Session | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Session) : null;
  } catch {
    return null;
  }
}

function write(s: Session | null) {
  if (typeof window === "undefined") return;
  if (s) localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
  else localStorage.removeItem(STORAGE_KEY);
  listeners.forEach((l) => l(s));
}

export const auth = {
  get: read,
  signIn(email: string, name?: string, role: Role = "admin"): Session {
    const session: Session = {
      id: crypto.randomUUID(),
      email,
      name: name ?? email.split("@")[0].replace(/\b\w/g, (c) => c.toUpperCase()),
      role,
    };
    write(session);
    return session;
  },
  signOut() {
    write(null);
  },
  subscribe(l: Listener) {
    listeners.add(l);
    return () => listeners.delete(l);
  },
};

export function useSession(): { session: Session | null; hydrated: boolean } {
  const [session, setSession] = useState<Session | null>(null);
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    setSession(read());
    setHydrated(true);
    return auth.subscribe(setSession);
  }, []);
  return { session, hydrated };
}
