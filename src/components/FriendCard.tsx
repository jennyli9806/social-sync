import { Friend } from "@/lib/mockData";
import { motion } from "framer-motion";

const statusColors = {
  available: "bg-mint",
  busy: "bg-destructive",
  away: "bg-amber",
};

const statusLabels = {
  available: "Available",
  busy: "Busy",
  away: "Away",
};

interface FriendCardProps {
  friend: Friend;
  selected?: boolean;
  onToggle?: (id: string) => void;
  onClick?: (friend: Friend) => void;
}

export default function FriendCard({ friend, selected, onToggle, onClick }: FriendCardProps) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      whileTap={{ scale: 0.97 }}
      onClick={() => {
        onToggle?.(friend.id);
        onClick?.(friend);
      }}
      className={`w-full flex items-center gap-4 p-4 rounded-2xl border transition-colors text-left ${
        selected
          ? "bg-coral-light border-primary/30"
          : "bg-card border-border hover:border-primary/20"
      }`}
    >
      <div className="relative">
        <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center font-display font-semibold text-secondary-foreground">
          {friend.avatar}
        </div>
        <div className={`absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-background ${statusColors[friend.status]}`} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-medium text-foreground truncate">{friend.name}</p>
        <p className="text-sm text-muted-foreground">{statusLabels[friend.status]}</p>
      </div>
      {onToggle && (
        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
          selected ? "border-primary bg-primary" : "border-muted-foreground/30"
        }`}>
          {selected && (
            <svg className="w-3.5 h-3.5 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          )}
        </div>
      )}
    </motion.button>
  );
}
