import { useState } from "react";
import { friends as allFriends, Friend } from "@/lib/mockData";
import FriendCard from "@/components/FriendCard";
import ScheduleGrid from "@/components/ScheduleGrid";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function Friends() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Friend | null>(null);

  const filtered = allFriends.filter((f) =>
    f.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <AnimatePresence mode="wait">
        {selected ? (
          <motion.div key="detail" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <button
              onClick={() => setSelected(null)}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Back to friends
            </button>

            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center font-display text-lg font-semibold text-secondary-foreground">
                {selected.avatar}
              </div>
              <div>
                <h2 className="font-display font-bold text-xl text-foreground">{selected.name}</h2>
                <p className="text-sm text-muted-foreground capitalize">{selected.status}</p>
              </div>
            </div>

            <h3 className="font-display font-semibold text-foreground mb-3">Weekly Schedule</h3>
            <ScheduleGrid friends={[selected]} />
          </motion.div>
        ) : (
          <motion.div key="list" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <h2 className="font-display font-bold text-2xl text-foreground mb-4">Friends</h2>

            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search friends..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 rounded-xl bg-card"
              />
            </div>

            <div className="space-y-2">
              {filtered.map((f) => (
                <FriendCard key={f.id} friend={f} onClick={setSelected} />
              ))}
              {filtered.length === 0 && (
                <p className="text-center text-muted-foreground py-8">No friends found</p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
