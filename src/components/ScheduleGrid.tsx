import { Friend } from "@/lib/mockData";
import { format, addDays, startOfWeek } from "date-fns";

const hours = Array.from({ length: 14 }, (_, i) => i + 7); // 7AM-8PM

interface ScheduleGridProps {
  friends: Friend[];
}

export default function ScheduleGrid({ friends }: ScheduleGridProps) {
  const getBlocksForSlot = (day: number, hour: number) => {
    return friends.filter((f) =>
      f.schedule.some((s) => s.day === day && hour >= s.startHour && hour < s.endHour)
    );
  };

  const isFree = (day: number, hour: number) => {
    return friends.every(
      (f) => !f.schedule.some((s) => s.day === day && hour >= s.startHour && hour < s.endHour)
    );
  };

  return (
    <div className="overflow-x-auto -mx-4 px-4">
      <div className="min-w-[600px]">
        {/* Header */}
        <div className="grid grid-cols-8 gap-1 mb-1">
          <div className="text-xs text-muted-foreground font-medium p-2" />
          {dayNames.map((d) => (
            <div key={d} className="text-xs font-semibold text-center p-2 text-foreground">
              {d}
            </div>
          ))}
        </div>

        {/* Grid */}
        {hours.map((hour) => (
          <div key={hour} className="grid grid-cols-8 gap-1 mb-1">
            <div className="text-xs text-muted-foreground font-medium p-1 text-right pr-3 pt-2">
              {hour > 12 ? hour - 12 : hour}{hour >= 12 ? "p" : "a"}
            </div>
            {Array.from({ length: 7 }, (_, day) => {
              const busy = getBlocksForSlot(day, hour);
              const free = isFree(day, hour) && friends.length > 0;

              return (
                <div
                  key={day}
                  className={`h-8 rounded-lg text-[10px] font-medium flex items-center justify-center transition-colors ${
                    free
                      ? "bg-mint-light text-mint border border-mint/20"
                      : busy.length > 0
                      ? "bg-coral-light text-coral/70 border border-coral/10"
                      : "bg-muted/50"
                  }`}
                >
                  {free ? "Free" : busy.length > 0 ? `${busy.length}` : ""}
                </div>
              );
            })}
          </div>
        ))}

        {/* Legend */}
        <div className="flex items-center gap-4 mt-4 px-2">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded bg-mint-light border border-mint/20" />
            <span className="text-xs text-muted-foreground">Everyone free</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded bg-coral-light border border-coral/10" />
            <span className="text-xs text-muted-foreground">Someone busy</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded bg-muted/50" />
            <span className="text-xs text-muted-foreground">No data</span>
          </div>
        </div>
      </div>
    </div>
  );
}
