import { SocialEvent, friends as allFriends } from "@/lib/mockData";
import { MapPin, Clock } from "lucide-react";
import { motion } from "framer-motion";

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

export default function EventCard({ event }: { event: SocialEvent }) {
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
          <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
            <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{event.time}</span>
            <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{event.location}</span>
          </div>
        </div>
        <div className={`w-3 h-3 rounded-full mt-1 ${dotMap[event.color]}`} />
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
