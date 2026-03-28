import { useState } from "react";
import { friends as allFriends } from "@/lib/mockData";
import FriendCard from "@/components/FriendCard";
import ScheduleGrid from "@/components/ScheduleGrid";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, CalendarDays, MapPin, PartyPopper } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

type Step = "friends" | "schedule" | "details";

export default function CreateEvent() {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>("friends");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");

  const selectedFriends = allFriends.filter((f) => selectedIds.includes(f.id));

  const toggle = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleCreate = () => {
    toast.success("Event created! 🎉", { description: `${title} has been scheduled.` });
    navigate("/");
  };

  const steps: Step[] = ["friends", "schedule", "details"];
  const currentIndex = steps.indexOf(step);

  return (
    <div className="space-y-6">
      {/* Progress */}
      <div className="flex items-center gap-2">
        {steps.map((s, i) => (
          <div key={s} className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${
              i <= currentIndex ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
            }`}>
              {i + 1}
            </div>
            {i < steps.length - 1 && (
              <div className={`w-8 h-0.5 ${i < currentIndex ? "bg-primary" : "bg-muted"}`} />
            )}
          </div>
        ))}
        <span className="ml-3 text-sm text-muted-foreground font-medium capitalize">{step}</span>
      </div>

      <AnimatePresence mode="wait">
        {step === "friends" && (
          <motion.div key="friends" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <h2 className="font-display font-bold text-2xl text-foreground mb-1">Who's coming?</h2>
            <p className="text-sm text-muted-foreground mb-4">Select friends to invite</p>
            <div className="space-y-2">
              {allFriends.map((f) => (
                <FriendCard key={f.id} friend={f} selected={selectedIds.includes(f.id)} onToggle={toggle} />
              ))}
            </div>
            <div className="mt-6 flex justify-end">
              <Button
                onClick={() => setStep("schedule")}
                disabled={selectedIds.length === 0}
                className="rounded-full px-6 font-semibold"
              >
                View Schedules <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </motion.div>
        )}

        {step === "schedule" && (
          <motion.div key="schedule" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <h2 className="font-display font-bold text-2xl text-foreground mb-1">Find a time</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Green slots = everyone is free!
            </p>
            <ScheduleGrid friends={selectedFriends} selectedSlot={selectedSlot} onSlotClick={handleSlotClick} />
            <div className="mt-6 flex justify-between">
              <Button variant="outline" onClick={() => setStep("friends")} className="rounded-full px-6 font-semibold">
                <ArrowLeft className="w-4 h-4 mr-2" /> Back
              </Button>
              <Button onClick={() => setStep("details")} className="rounded-full px-6 font-semibold">
                Pick Time <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </motion.div>
        )}

        {step === "details" && (
          <motion.div key="details" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <h2 className="font-display font-bold text-2xl text-foreground mb-1">Event Details</h2>
            <p className="text-sm text-muted-foreground mb-6">Fill in the details for your hangout</p>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Event Name</label>
                <Input
                  placeholder="e.g. Pizza Night 🍕"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="rounded-xl bg-card"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block flex items-center gap-1.5">
                    <CalendarDays className="w-3.5 h-3.5" /> Date
                  </label>
                  <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="rounded-xl bg-card" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Time</label>
                  <Input type="time" value={time} onChange={(e) => setTime(e.target.value)} className="rounded-xl bg-card" />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5" /> Location
                </label>
                <Input
                  placeholder="e.g. My apartment"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="rounded-xl bg-card"
                />
              </div>

              {/* Selected friends preview */}
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Inviting</label>
                <div className="flex gap-2 flex-wrap">
                  {selectedFriends.map((f) => (
                    <span key={f.id} className="bg-coral-light text-primary text-sm px-3 py-1 rounded-full font-medium">
                      {f.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-between">
              <Button variant="outline" onClick={() => setStep("schedule")} className="rounded-full px-6 font-semibold">
                <ArrowLeft className="w-4 h-4 mr-2" /> Back
              </Button>
              <Button
                onClick={handleCreate}
                disabled={!title || !date || !time}
                className="rounded-full px-6 font-semibold"
              >
                <PartyPopper className="w-4 h-4 mr-2" /> Create Event
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
