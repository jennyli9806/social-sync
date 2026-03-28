import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { CalendarDays, Users, Plus, Home } from "lucide-react";
import { motion } from "framer-motion";

const navItems = [
  { path: "/", icon: Home, label: "Home" },
  { path: "/friends", icon: Users, label: "Friends" },
  { path: "/create", icon: Plus, label: "New Event" },
  { path: "/schedule", icon: CalendarDays, label: "Schedule" },
];

export default function AppLayout({ children }: { children: ReactNode }) {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col bg-background font-sans">
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border px-6 py-4">
        <h1 className="font-display text-xl font-bold text-foreground tracking-tight">
          hang<span className="text-primary">time</span>
        </h1>
      </header>

      <main className="flex-1 px-4 py-6 max-w-2xl mx-auto w-full">
        {children}
      </main>

      <nav className="sticky bottom-0 bg-background/80 backdrop-blur-xl border-t border-border">
        <div className="flex justify-around items-center max-w-2xl mx-auto py-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className="relative flex flex-col items-center gap-1 px-4 py-2"
              >
                {isActive && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute inset-0 bg-coral-light rounded-xl"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <item.icon
                  className={`relative z-10 w-5 h-5 transition-colors ${
                    isActive ? "text-primary" : "text-muted-foreground"
                  }`}
                />
                <span
                  className={`relative z-10 text-xs font-medium transition-colors ${
                    isActive ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
