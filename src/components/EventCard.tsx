import { SocialEvent, friends as allFriends } from "@/lib/mockData";
import { MapPin, Clock, CalendarDays, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";
import { format, parseISO } from "date-fns";

const colorMap = {
  coral: "bg-coral-light border-coral/20",
  amber: "bg-amber-light border-amber/20",
  lavender: "bg-lavender-light border-lavender/20",
  mint: "bg-mint-light border-mint/20",
};

const dotMap = {
  coral: "bg-coral",
  amber: "bg-amber",
  lavender: "bg-lavender",
  mint: "bg-mint",
};

type Props = { event?: SocialEvent; loading?: boolean; error?: string };

export default function EventCard({ event, loading, error }: Props) {
  if (loading) {
    return (
      <div className="rounded-2xl border p-5 bg-muted/30 border-muted animate-pulse">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <div className="h-5 bg-muted rounded w-2/3 mb-2" />
            <div className="flex gap-3 mt-1">
              <div className="h-4 bg-muted rounded w-20" />
              <div className="h-4 bg-muted rounded w-16" />
              <div className="h-4 bg-muted rounded w-24" />
            </div>
          </div>
          <div className="w-3 h-3 rounded-full bg-muted mt-1" />
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-8 h-8 rounded-full bg-muted" />
          <div className="w-8 h-8 rounded-full bg-muted" />
          <div className="h-3 bg-muted rounded w-14 ml-1" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl border p-5 bg-destructive/10 border-destructive/20 flex items-center gap-3 text-destructive">
        <AlertCircle className="w-5 h-5 shrink-0" />
        <p className="text-sm font-medium">{error}</p>
      </div>
    );
  }

  if (!event) return null;

  const eventFriends = event.friends.map((id) => allFriends.find((f) => f.id === id)!).filter(Boolean);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-2xl border p-5 ${colorMap[event.color]}`}
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-display font-semibold text-lg text-foreground">{event.title}</h3>
          <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground flex-wrap">
            <span className="flex items-center gap-1"><CalendarDays className="w-3.5 h-3.5" />{format(parseISO(event.date), "EEE, MMM d")}</span>
            <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{event.time}</span>
            <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{event.location}</span>
          </div>
        </div>
        <div className={`w-4 h-4 rounded-full mt-1 ${dotMap[event.color]}`} />
      </div>
      <div className="flex items-center gap-1.5">
        {eventFriends.map((f) => (
          <div
            key={f.id}
            className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs font-semibold text-muted-foreground border-2 border-background"
            title={f.name}
          >
            {f.avatar}
          </div>
        ))}
        <span className="text-xs text-muted-foreground ml-1">
          {eventFriends.length} friend{eventFriends.length !== 1 ? "s" : ""}
        </span>
      </div>
    </motion.div>
  );
}
