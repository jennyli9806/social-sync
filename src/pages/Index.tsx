import { events } from "@/lib/mockData";
import EventCard from "@/components/EventCard";
import { motion } from "framer-motion";
import { CalendarDays, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function Index() {
  const upcoming = [...events].sort((a, b) => a.date.localeCompare(b.date));

  return (
    <div className="space-y-8">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center py-6"
      >
        <div className="inline-flex items-center gap-2 bg-coral-light text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-4">
          <Sparkles className="w-4 h-4" />
          Plan something fun
        </div>
        <h2 className="font-display text-3xl font-bold text-foreground leading-tight">
          Find the perfect<br />time to hang out
        </h2>
        <p className="text-muted-foreground mt-2 max-w-sm mx-auto">
          See when your friends are free, pick a time, and make it happen.
        </p>
        <div className="flex gap-3 justify-center mt-6">
          <Button asChild className="rounded-full px-6 font-semibold">
            <Link to="/create">Create Event</Link>
          </Button>
          <Button asChild variant="outline" className="rounded-full px-6 font-semibold">
            <Link to="/schedule">
              <CalendarDays className="w-4 h-4 mr-2" />
              View Schedules
            </Link>
          </Button>
        </div>
      </motion.div>

      {/* Upcoming Events */}
      <div>
        <h3 className="font-display font-semibold text-lg text-foreground mb-4">Upcoming Events</h3>
        <div className="space-y-3">
          {upcoming.map((event, i) => (
            <motion.div key={event.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
              <EventCard event={event} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
