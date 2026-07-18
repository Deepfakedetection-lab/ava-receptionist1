import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  PhoneCall,
  CalendarDays,
  Users,
  BookOpen,
  Settings,
  ShieldCheck,
  Sparkles,
  LogOut,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { auth, useSession } from "@/lib/auth-store";
import { useNavigate } from "@tanstack/react-router";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const mainNav = [
  { to: "/app", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { to: "/app/calls", label: "Calls", icon: PhoneCall },
  { to: "/app/appointments", label: "Appointments", icon: CalendarDays },
  { to: "/app/contacts", label: "Contacts (CRM)", icon: Users },
  { to: "/app/knowledge", label: "Knowledge base", icon: BookOpen },
];

const adminNav = [
  { to: "/app/admin", label: "Admin console", icon: ShieldCheck },
  { to: "/app/settings", label: "Settings", icon: Settings },
];

export function AppSidebar() {
  const pathname = useRouterState({ select: (r) => r.location.pathname });
  const { session } = useSession();
  const navigate = useNavigate();

  const isActive = (to: string, exact?: boolean) =>
    exact ? pathname === to : pathname === to || pathname.startsWith(to + "/");

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <div className="flex items-center gap-2 px-2 py-1.5">
          <div className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-gradient-primary shadow-elevated">
            <Sparkles className="h-4 w-4 text-primary-foreground" />
          </div>
          <div className="flex min-w-0 flex-col">
            <span className="truncate font-display text-sm font-semibold">Ava Receptionist</span>
            <span className="truncate text-[10px] uppercase tracking-wider text-muted-foreground">
              Enterprise
            </span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Workspace</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNav.map((item) => (
                <SidebarMenuItem key={item.to}>
                  <SidebarMenuButton asChild isActive={isActive(item.to, item.exact)} tooltip={item.label}>
                    <Link to={item.to}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Manage</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {adminNav.map((item) => (
                <SidebarMenuItem key={item.to}>
                  <SidebarMenuButton asChild isActive={isActive(item.to)} tooltip={item.label}>
                    <Link to={item.to}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip="Sign out"
              onClick={() => {
                auth.signOut();
                navigate({ to: "/" });
              }}
            >
              <Avatar className="h-6 w-6">
                <AvatarFallback className="bg-gradient-primary text-[10px] text-primary-foreground">
                  {session?.name?.slice(0, 2).toUpperCase() ?? "AV"}
                </AvatarFallback>
              </Avatar>
              <div className="flex min-w-0 flex-1 flex-col text-left">
                <span className="truncate text-xs font-medium">{session?.name ?? "Guest"}</span>
                <span className="truncate text-[10px] text-muted-foreground">
                  {session?.role === "admin" ? "Administrator" : "Staff"}
                </span>
              </div>
              <LogOut className="h-3.5 w-3.5" />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
