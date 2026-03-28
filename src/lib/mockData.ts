export interface Friend {
  id: string;
  name: string;
  avatar: string;
  status: "available" | "busy" | "away";
  schedule: ScheduleBlock[];
}

export interface ScheduleBlock {
  day: number; // 0-6, Sun-Sat
  startHour: number;
  endHour: number;
  label: string;
}

export interface SocialEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  friends: string[];
  color: "coral" | "amber" | "lavender" | "mint";
}

export const friends: Friend[] = [
  {
    id: "1", name: "Alex Rivera", avatar: "AR", status: "available",
    schedule: [
      { day: 1, startHour: 9, endHour: 17, label: "Work" },
      { day: 2, startHour: 9, endHour: 17, label: "Work" },
      { day: 3, startHour: 9, endHour: 17, label: "Work" },
      { day: 4, startHour: 9, endHour: 17, label: "Work" },
      { day: 5, startHour: 9, endHour: 15, label: "Work" },
      { day: 6, startHour: 10, endHour: 12, label: "Gym" },
    ],
  },
  {
    id: "2", name: "Jordan Kim", avatar: "JK", status: "busy",
    schedule: [
      { day: 1, startHour: 8, endHour: 16, label: "Work" },
      { day: 2, startHour: 8, endHour: 16, label: "Work" },
      { day: 2, startHour: 18, endHour: 20, label: "Yoga" },
      { day: 3, startHour: 8, endHour: 16, label: "Work" },
      { day: 4, startHour: 8, endHour: 16, label: "Work" },
      { day: 5, startHour: 8, endHour: 14, label: "Work" },
    ],
  },
  {
    id: "3", name: "Sam Patel", avatar: "SP", status: "available",
    schedule: [
      { day: 1, startHour: 10, endHour: 18, label: "Work" },
      { day: 2, startHour: 10, endHour: 18, label: "Work" },
      { day: 3, startHour: 10, endHour: 18, label: "Work" },
      { day: 4, startHour: 10, endHour: 18, label: "Work" },
      { day: 5, startHour: 10, endHour: 16, label: "Work" },
    ],
  },
  {
    id: "4", name: "Casey Morgan", avatar: "CM", status: "away",
    schedule: [
      { day: 1, startHour: 7, endHour: 15, label: "Work" },
      { day: 2, startHour: 7, endHour: 15, label: "Work" },
      { day: 3, startHour: 7, endHour: 15, label: "Work" },
      { day: 3, startHour: 17, endHour: 19, label: "Soccer" },
      { day: 4, startHour: 7, endHour: 15, label: "Work" },
      { day: 5, startHour: 7, endHour: 13, label: "Work" },
      { day: 6, startHour: 8, endHour: 10, label: "Run" },
    ],
  },
  {
    id: "5", name: "Taylor Chen", avatar: "TC", status: "available",
    schedule: [
      { day: 2, startHour: 12, endHour: 20, label: "Work" },
      { day: 3, startHour: 12, endHour: 20, label: "Work" },
      { day: 4, startHour: 12, endHour: 20, label: "Work" },
      { day: 5, startHour: 12, endHour: 20, label: "Work" },
      { day: 6, startHour: 12, endHour: 20, label: "Work" },
    ],
  },
];

export const events: SocialEvent[] = [
  { id: "1", title: "Brunch at Café Luna", date: "2026-03-29", time: "11:00 AM", location: "Café Luna", friends: ["1", "3"], color: "coral" },
  { id: "2", title: "Game Night", date: "2026-03-30", time: "7:00 PM", location: "Alex's Place", friends: ["1", "2", "4"], color: "lavender" },
  { id: "3", title: "Hiking Trip", date: "2026-04-05", time: "9:00 AM", location: "Eagle Creek Trail", friends: ["2", "3", "5"], color: "mint" },
  { id: "4", title: "Movie Marathon", date: "2026-04-12", time: "3:00 PM", location: "My Place", friends: ["1", "2", "3", "4", "5"], color: "amber" },
];

export const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
