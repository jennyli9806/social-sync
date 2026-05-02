import { useState, useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { Friend } from '@/lib/mockData';
import FriendCard from './FriendCard';
import { Calendar } from './ui/calendar';
import { Button } from '../stories/Button';

export interface HangoutRequestData {
  friendIds: string[];
  date: Date | undefined;
  message: string;
}

interface Props {
  friends: Friend[];
  open?: boolean;
  onClose?: () => void;
  onSend?: (data: HangoutRequestData) => void;
}

export default function HangoutRequestModal({ friends, open = false, onClose, onSend }: Props) {
  const [selectedFriendIds, setSelectedFriendIds] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [message, setMessage] = useState('');
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    dialogRef.current?.focus();
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose?.();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  const handleToggle = (id: string) => {
    setSelectedFriendIds(prev =>
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  const handleSend = () => {
    onSend?.({ friendIds: selectedFriendIds, date: selectedDate, message });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      role="presentation"
      onClick={(e) => { if (e.target === e.currentTarget) onClose?.(); }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="hangout-modal-title"
        tabIndex={-1}
        className="bg-background rounded-2xl shadow-xl w-full max-w-md mx-4 flex flex-col max-h-[90vh] focus:outline-none"
      >
        <div className="flex items-center justify-between p-5 border-b border-border">
          <h2 id="hangout-modal-title" className="font-display font-semibold text-lg text-foreground">
            Send Hangout Request
          </h2>
          <button
            onClick={onClose}
            aria-label="Close"
            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-muted transition-colors text-muted-foreground"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="overflow-y-auto flex-1 p-5 flex flex-col gap-6">
          <section aria-labelledby="hangout-who-heading">
            <h3 id="hangout-who-heading" className="text-sm font-semibold text-foreground uppercase tracking-wide mb-3">
              Who?
            </h3>
            <div className="flex flex-col gap-2">
              {friends.map(friend => (
                <FriendCard
                  key={friend.id}
                  friend={friend}
                  selected={selectedFriendIds.includes(friend.id)}
                  onToggle={handleToggle}
                />
              ))}
            </div>
          </section>

          <section aria-labelledby="hangout-when-heading">
            <h3 id="hangout-when-heading" className="text-sm font-semibold text-foreground uppercase tracking-wide mb-3">
              When?
            </h3>
            <div className="flex justify-center">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                disabled={{ before: new Date() }}
              />
            </div>
          </section>

          <section>
            <label
              htmlFor="hangout-message"
              className="text-sm font-semibold text-foreground uppercase tracking-wide block mb-3"
            >
              Message
            </label>
            <textarea
              id="hangout-message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Add a note…"
              rows={3}
              className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </section>
        </div>

        <div className="flex items-center justify-end gap-3 p-5 border-t border-border">
          <Button label="Cancel" onClick={onClose} />
          <Button label="Send Request" primary onClick={handleSend} />
        </div>
      </div>
    </div>
  );
}
