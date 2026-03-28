import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Calendar, Check, Loader2, ArrowLeft, ExternalLink, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Link } from "react-router-dom";

interface CalendarProvider {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
}

const providers: CalendarProvider[] = [
  {
    id: "google",
    name: "Google Calendar",
    description: "Sync your personal Gmail calendar",
    icon: <Mail className="w-5 h-5" />,
    color: "text-destructive",
    bgColor: "bg-destructive/10",
  },
  {
    id: "google_work",
    name: "Google Workspace",
    description: "Connect your work Google calendar",
    icon: <Calendar className="w-5 h-5" />,
    color: "text-[hsl(220,70%,55%)]",
    bgColor: "bg-[hsl(220,70%,95%)]",
  },
  {
    id: "outlook",
    name: "Outlook / Microsoft 365",
    description: "Sync your Outlook or work calendar",
    icon: <Calendar className="w-5 h-5" />,
    color: "text-[hsl(200,80%,45%)]",
    bgColor: "bg-[hsl(200,80%,93%)]",
  },
  {
    id: "apple",
    name: "Apple Calendar",
    description: "Connect your iCloud calendar",
    icon: <Calendar className="w-5 h-5" />,
    color: "text-foreground",
    bgColor: "bg-muted",
  },
];

const mockCalendarEvents = [
  { title: "Team Standup", time: "9:00 AM – 9:30 AM", day: "Mon–Fri", provider: "google_work" },
  { title: "Lunch with team", time: "12:00 PM – 1:00 PM", day: "Wed", provider: "google_work" },
  { title: "Gym Session", time: "6:00 PM – 7:30 PM", day: "Mon, Wed, Fri", provider: "google" },
  { title: "Yoga Class", time: "8:00 AM – 9:00 AM", day: "Sat", provider: "google" },
  { title: "Date Night", time: "7:00 PM – 10:00 PM", day: "Fri", provider: "google" },
  { title: "Project Review", time: "2:00 PM – 3:00 PM", day: "Thu", provider: "outlook" },
];

export default function CalendarConnect() {
  const [connectedProviders, setConnectedProviders] = useState<string[]>([]);
  const [connecting, setConnecting] = useState<string | null>(null);
  const [showEvents, setShowEvents] = useState(false);

  const handleConnect = async (providerId: string) => {
    setConnecting(providerId);

    // Simulate OAuth flow
    await new Promise((r) => setTimeout(r, 2000));

    setConnectedProviders((prev) => [...prev, providerId]);
    setConnecting(null);
    toast.success(`${providers.find((p) => p.id === providerId)?.name} connected!`);
  };

  const handleDisconnect = (providerId: string) => {
    setConnectedProviders((prev) => prev.filter((id) => id !== providerId));
    toast.info("Calendar disconnected");
  };

  const syncedEvents = mockCalendarEvents.filter((e) => connectedProviders.includes(e.provider));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display font-bold text-2xl text-foreground">Calendars</h2>
          <p className="text-sm text-muted-foreground mt-1">Connect your calendars to share availability</p>
        </div>
        <Link to="/schedule">
          <Button variant="outline" size="sm" className="rounded-full text-sm font-medium">
            <ArrowLeft className="w-3.5 h-3.5 mr-1.5" /> Schedule
          </Button>
        </Link>
      </div>

      {/* Calendar providers */}
      <div className="space-y-3">
        {providers.map((provider, i) => {
          const isConnected = connectedProviders.includes(provider.id);
          const isConnecting = connecting === provider.id;

          return (
            <motion.div
              key={provider.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className={`flex items-center gap-4 p-4 rounded-2xl border transition-colors ${
                isConnected ? "bg-mint-light/50 border-mint/20" : "bg-card border-border"
              }`}
            >
              <div className={`w-11 h-11 rounded-xl ${provider.bgColor} ${provider.color} flex items-center justify-center`}>
                {isConnecting ? <Loader2 className="w-5 h-5 animate-spin" /> : provider.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-foreground">{provider.name}</p>
                <p className="text-sm text-muted-foreground">{provider.description}</p>
              </div>
              {isConnected ? (
                <div className="flex items-center gap-2">
                  <span className="flex items-center gap-1 text-xs font-medium text-mint bg-mint-light px-2.5 py-1 rounded-full">
                    <Check className="w-3 h-3" /> Synced
                  </span>
                  <button onClick={() => handleDisconnect(provider.id)} className="text-xs text-muted-foreground hover:text-destructive transition-colors">
                    Remove
                  </button>
                </div>
              ) : (
                <Button
                  size="sm"
                  onClick={() => handleConnect(provider.id)}
                  disabled={isConnecting}
                  className="rounded-full text-sm font-medium"
                >
                  {isConnecting ? "Connecting..." : "Connect"}
                </Button>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Synced events preview */}
      {connectedProviders.length > 0 && (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-display font-semibold text-foreground">
              Your Schedule Preview
            </h3>
            <button onClick={() => setShowEvents(!showEvents)} className="text-sm text-primary font-medium hover:underline">
              {showEvents ? "Hide" : `Show ${syncedEvents.length} events`}
            </button>
          </div>

          {showEvents && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="space-y-2">
              {syncedEvents.map((event, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center gap-3 p-3 rounded-xl bg-card border border-border"
                >
                  <div className="w-1 h-10 rounded-full bg-primary" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{event.title}</p>
                    <p className="text-xs text-muted-foreground">{event.time} · {event.day}</p>
                  </div>
                  <span className="text-[10px] text-muted-foreground bg-muted px-2 py-0.5 rounded-full capitalize">
                    {event.provider.replace("_", " ")}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          )}

          <div className="bg-amber-light border border-amber/20 rounded-xl p-4 flex items-start gap-3">
            <RefreshCw className="w-4 h-4 text-amber mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-foreground">Auto-sync enabled</p>
              <p className="text-xs text-muted-foreground">Your busy times will be automatically shared with friends you invite to events</p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Empty state */}
      {connectedProviders.length === 0 && (
        <div className="text-center py-8">
          <div className="w-14 h-14 rounded-full bg-coral-light mx-auto flex items-center justify-center mb-3">
            <Calendar className="w-6 h-6 text-primary" />
          </div>
          <p className="text-sm text-muted-foreground max-w-xs mx-auto">
            Connect a calendar to automatically show your availability when planning events with friends
          </p>
        </div>
      )}
    </div>
  );
}
