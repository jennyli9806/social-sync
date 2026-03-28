import { useState } from "react";
import { friends as allFriends } from "@/lib/mockData";
import FriendCard from "@/components/FriendCard";
import ScheduleGrid from "@/components/ScheduleGrid";
import { motion } from "framer-motion";

export default function Schedule() {
  const [selectedIds, setSelectedIds] = useState<string[]>(allFriends.map((f) => f.id));

  const toggle = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const selectedFriends = allFriends.filter((f) => selectedIds.includes(f.id));

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <h2 className="font-display font-bold text-2xl text-foreground mb-1">Group Schedule</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Select friends to compare schedules and find free time.
        </p>
      </motion.div>

      {/* Friend selector */}
      <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4">
        {allFriends.map((f) => {
          const isSelected = selectedIds.includes(f.id);
          return (
            <button
              key={f.id}
              onClick={() => toggle(f.id)}
              className={`flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium transition-colors ${
                isSelected
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-card text-foreground border-border hover:border-primary/30"
              }`}
            >
              <span className="text-xs">{f.avatar}</span>
              {f.name.split(" ")[0]}
            </button>
          );
        })}
      </div>

      {/* Schedule grid */}
      <ScheduleGrid friends={selectedFriends} />
    </div>
  );
}
