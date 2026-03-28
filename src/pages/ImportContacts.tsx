import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Instagram, Twitter, Facebook, UserPlus, Check, Loader2, ArrowLeft, Phone, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Link } from "react-router-dom";

interface ContactSource {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  color: string;
  bgColor: string;
}

const sources: ContactSource[] = [
  { id: "google", name: "Google Contacts", icon: <Mail className="w-5 h-5" />, description: "Import from your Gmail contacts", color: "text-destructive", bgColor: "bg-destructive/10" },
  { id: "instagram", name: "Instagram", icon: <Instagram className="w-5 h-5" />, description: "Find friends on Instagram", color: "text-accent", bgColor: "bg-accent/10" },
  { id: "twitter", name: "X / Twitter", icon: <Twitter className="w-5 h-5" />, description: "Connect with your followers", color: "text-foreground", bgColor: "bg-muted" },
  { id: "facebook", name: "Facebook", icon: <Facebook className="w-5 h-5" />, description: "Sync your Facebook friends", color: "text-[hsl(220,70%,55%)]", bgColor: "bg-[hsl(220,70%,95%)]" },
  { id: "phone", name: "Phone Contacts", icon: <Phone className="w-5 h-5" />, description: "Import from your phone", color: "text-mint", bgColor: "bg-mint-light" },
];

const mockImportedContacts = [
  { name: "Emma Watson", source: "google", avatar: "EW" },
  { name: "Liam Park", source: "google", avatar: "LP" },
  { name: "Mia Johnson", source: "google", avatar: "MJ" },
  { name: "Noah Williams", source: "instagram", avatar: "NW" },
  { name: "Olivia Davis", source: "instagram", avatar: "OD" },
  { name: "Ethan Brown", source: "facebook", avatar: "EB" },
  { name: "Ava Martinez", source: "phone", avatar: "AM" },
  { name: "Lucas Taylor", source: "twitter", avatar: "LT" },
];

type View = "sources" | "importing" | "results" | "manual";

export default function ImportContacts() {
  const [view, setView] = useState<View>("sources");
  const [connectedSources, setConnectedSources] = useState<string[]>([]);
  const [importingSource, setImportingSource] = useState<string | null>(null);
  const [importedContacts, setImportedContacts] = useState<typeof mockImportedContacts>([]);
  const [selectedContacts, setSelectedContacts] = useState<string[]>([]);
  const [manualName, setManualName] = useState("");
  const [manualEmail, setManualEmail] = useState("");
  const [search, setSearch] = useState("");

  const handleConnect = async (sourceId: string) => {
    setImportingSource(sourceId);
    setView("importing");

    // Simulate OAuth / import flow
    await new Promise((r) => setTimeout(r, 2000));

    setConnectedSources((prev) => [...prev, sourceId]);
    const newContacts = mockImportedContacts.filter((c) => c.source === sourceId);
    setImportedContacts((prev) => [...prev, ...newContacts]);
    setImportingSource(null);
    setView("results");
    toast.success(`Connected to ${sources.find((s) => s.id === sourceId)?.name}!`);
  };

  const toggleContact = (name: string) => {
    setSelectedContacts((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]
    );
  };

  const handleAddSelected = () => {
    toast.success(`Added ${selectedContacts.length} friend${selectedContacts.length !== 1 ? "s" : ""}! 🎉`);
    setSelectedContacts([]);
  };

  const handleManualAdd = () => {
    if (!manualName.trim()) return;
    toast.success(`${manualName} added as a friend!`);
    setManualName("");
    setManualEmail("");
    setView("sources");
  };

  const filteredContacts = importedContacts.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display font-bold text-2xl text-foreground">Add Friends</h2>
          <p className="text-sm text-muted-foreground mt-1">Import from your contacts or social media</p>
        </div>
        <Link to="/friends">
          <Button variant="outline" size="sm" className="rounded-full text-sm font-medium">
            <ArrowLeft className="w-3.5 h-3.5 mr-1.5" /> Friends
          </Button>
        </Link>
      </div>

      <AnimatePresence mode="wait">
        {view === "importing" && (
          <motion.div key="importing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center justify-center py-16 gap-4">
            <div className="w-16 h-16 rounded-full bg-coral-light flex items-center justify-center">
              <Loader2 className="w-7 h-7 text-primary animate-spin" />
            </div>
            <p className="font-medium text-foreground">Connecting to {sources.find((s) => s.id === importingSource)?.name}...</p>
            <p className="text-sm text-muted-foreground">This will only take a moment</p>
          </motion.div>
        )}

        {view === "results" && (
          <motion.div key="results" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <div className="flex items-center gap-2 mb-4">
              <button onClick={() => setView("sources")} className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors">
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
            </div>

            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search imported contacts..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10 rounded-xl bg-card" />
            </div>

            <p className="text-sm text-muted-foreground mb-3">
              Found {importedContacts.length} contacts · {selectedContacts.length} selected
            </p>

            <div className="space-y-2 max-h-80 overflow-y-auto">
              {filteredContacts.map((contact) => {
                const isSelected = selectedContacts.includes(contact.name);
                return (
                  <motion.button
                    key={contact.name}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => toggleContact(contact.name)}
                    className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-colors text-left ${
                      isSelected ? "bg-coral-light border-primary/30" : "bg-card border-border hover:border-primary/20"
                    }`}
                  >
                    <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-xs font-semibold text-secondary-foreground">
                      {contact.avatar}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-foreground text-sm">{contact.name}</p>
                      <p className="text-xs text-muted-foreground capitalize">via {contact.source}</p>
                    </div>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                      isSelected ? "border-primary bg-primary" : "border-muted-foreground/30"
                    }`}>
                      {isSelected && <Check className="w-3 h-3 text-primary-foreground" />}
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {selectedContacts.length > 0 && (
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mt-4">
                <Button onClick={handleAddSelected} className="w-full rounded-full font-semibold">
                  <UserPlus className="w-4 h-4 mr-2" /> Add {selectedContacts.length} Friend{selectedContacts.length !== 1 ? "s" : ""}
                </Button>
              </motion.div>
            )}

            <button onClick={() => setView("sources")} className="w-full mt-3 text-sm text-primary font-medium hover:underline">
              Import from another source
            </button>
          </motion.div>
        )}

        {view === "manual" && (
          <motion.div key="manual" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <button onClick={() => setView("sources")} className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors mb-4">
              <ArrowLeft className="w-4 h-4" /> Back
            </button>

            <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
              <h3 className="font-display font-semibold text-foreground">Add Manually</h3>
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Name</label>
                <Input placeholder="Friend's name" value={manualName} onChange={(e) => setManualName(e.target.value)} className="rounded-xl bg-background" />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Email (optional)</label>
                <Input placeholder="friend@email.com" value={manualEmail} onChange={(e) => setManualEmail(e.target.value)} className="rounded-xl bg-background" />
              </div>
              <Button onClick={handleManualAdd} disabled={!manualName.trim()} className="w-full rounded-full font-semibold">
                <UserPlus className="w-4 h-4 mr-2" /> Add Friend
              </Button>
            </div>
          </motion.div>
        )}

        {view === "sources" && (
          <motion.div key="sources" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-3">
            {sources.map((source, i) => {
              const isConnected = connectedSources.includes(source.id);
              return (
                <motion.button
                  key={source.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => !isConnected && handleConnect(source.id)}
                  disabled={isConnected}
                  className="w-full flex items-center gap-4 p-4 rounded-2xl border border-border bg-card hover:border-primary/20 transition-colors text-left disabled:opacity-70"
                >
                  <div className={`w-11 h-11 rounded-xl ${source.bgColor} ${source.color} flex items-center justify-center`}>
                    {source.icon}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{source.name}</p>
                    <p className="text-sm text-muted-foreground">{source.description}</p>
                  </div>
                  {isConnected ? (
                    <span className="flex items-center gap-1 text-xs font-medium text-mint bg-mint-light px-2.5 py-1 rounded-full">
                      <Check className="w-3 h-3" /> Synced
                    </span>
                  ) : (
                    <span className="text-xs font-medium text-primary">Connect</span>
                  )}
                </motion.button>
              );
            })}

            {/* Manual add option */}
            <motion.button
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              onClick={() => setView("manual")}
              className="w-full flex items-center gap-4 p-4 rounded-2xl border border-dashed border-border bg-card/50 hover:border-primary/30 transition-colors text-left"
            >
              <div className="w-11 h-11 rounded-xl bg-coral-light text-primary flex items-center justify-center">
                <UserPlus className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-foreground">Add Manually</p>
                <p className="text-sm text-muted-foreground">Type in a friend's name</p>
              </div>
            </motion.button>

            {/* Show results button if we have imported contacts */}
            {importedContacts.length > 0 && (
              <Button onClick={() => setView("results")} variant="outline" className="w-full rounded-full font-medium mt-2">
                View {importedContacts.length} imported contacts
              </Button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
