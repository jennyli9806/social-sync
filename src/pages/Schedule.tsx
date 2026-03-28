import { useState } from "react";
import { friends as allFriends } from "@/lib/mockData";
import FriendCard from "@/components/FriendCard";
import ScheduleGrid, { SlotSelection } from "@/components/ScheduleGrid";
import { motion, AnimatePresence } from "framer-motion";
import { format, addDays, startOfWeek } from "date-fns";
import { Clock, Users, X } from "lucide-react";

export default function Schedule() {
  const [selectedIds, setSelectedIds] = useState<string[]>(allFriends.map((f) => f.id));
  const [activeSlot, setActiveSlot] = useState<SlotSelection | null>(null);

  const toggle = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const selectedFriends = allFriends.filter((f) => selectedIds.includes(f.id));

  const getSlotDetails = () => {
    if (!activeSlot) return null;
    const { day, hour, date } = activeSlot;
    const busy = selectedFriends.filter((f) =>
      f.schedule.some((s) => s.day === day && hour >= s.startHour && hour < s.endHour)
    );
    const free = selectedFriends.filter((f) =>
      !f.schedule.some((s) => s.day === day && hour >= s.startHour && hour < s.endHour)
    );
    const busyWithLabels = busy.map((f) => {
      const block = f.schedule.find((s) => s.day === day && hour >= s.startHour && hour < s.endHour);
      return { ...f, activity: block?.label || "Busy" };
    });
    return { date, hour, free, busy: busyWithLabels };
  };

  const slotDetails = getSlotDetails();

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <h2 className="font-display font-bold text-2xl text-foreground mb-1">Group Schedule</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Tap a time slot to see who's available.
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
      <ScheduleGrid friends={selectedFriends} selectedSlot={activeSlot} onSlotClick={setActiveSlot} />

      {/* Slot detail panel */}
      <AnimatePresence>
        {slotDetails && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            className="rounded-2xl border border-border bg-card p-5 shadow-sm"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary" />
                <span className="font-display font-semibold text-foreground">
                  {format(slotDetails.date, "EEE, MMM d")} · {slotDetails.hour > 12 ? slotDetails.hour - 12 : slotDetails.hour}:00 {slotDetails.hour >= 12 ? "PM" : "AM"}
                </span>
              </div>
              <button onClick={() => setActiveSlot(null)} className="text-muted-foreground hover:text-foreground">
                <X className="w-4 h-4" />
              </button>
            </div>

            {slotDetails.free.length > 0 && (
              <div className="mb-3">
                <div className="flex items-center gap-1.5 mb-2">
                  <div className="w-2 h-2 rounded-full bg-mint" />
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Available ({slotDetails.free.length})</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {slotDetails.free.map((f) => (
                    <span key={f.id} className="bg-mint-light text-mint text-sm px-3 py-1 rounded-full font-medium border border-mint/20">
                      {f.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {slotDetails.busy.length > 0 && (
              <div>
                <div className="flex items-center gap-1.5 mb-2">
                  <div className="w-2 h-2 rounded-full bg-coral" />
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Busy ({slotDetails.busy.length})</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {slotDetails.busy.map((f) => (
                    <span key={f.id} className="bg-coral-light text-coral/80 text-sm px-3 py-1 rounded-full font-medium border border-coral/15">
                      {f.name} <span className="text-coral/50">· {f.activity}</span>
                    </span>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
