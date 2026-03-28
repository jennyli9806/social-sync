import { useState } from "react";
import { motion } from "framer-motion";
import { UserPlus, Calendar, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const sections = [
  {
    title: "Import Contacts",
    description: "Add friends from your contacts or social media",
    icon: UserPlus,
    path: "/import-contacts",
    color: "text-primary",
    bgColor: "bg-coral-light",
  },
  {
    title: "Connect Calendars",
    description: "Sync Gmail, Outlook, or Apple Calendar",
    icon: Calendar,
    path: "/calendars",
    color: "text-lavender",
    bgColor: "bg-lavender-light",
  },
];

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display font-bold text-2xl text-foreground">Connections</h2>
        <p className="text-sm text-muted-foreground mt-1">Import friends and sync your calendars</p>
      </div>

      <div className="space-y-3">
        {sections.map((section, i) => (
          <motion.div
            key={section.path}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
          >
            <Link
              to={section.path}
              className="flex items-center gap-4 p-5 rounded-2xl border border-border bg-card hover:border-primary/20 transition-colors"
            >
              <div className={`w-12 h-12 rounded-xl ${section.bgColor} ${section.color} flex items-center justify-center`}>
                <section.icon className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <p className="font-display font-semibold text-foreground">{section.title}</p>
                <p className="text-sm text-muted-foreground">{section.description}</p>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
