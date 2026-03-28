import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import AppLayout from "@/components/AppLayout";
import Index from "./pages/Index";
import Friends from "./pages/Friends";
import Schedule from "./pages/Schedule";
import CreateEvent from "./pages/CreateEvent";
import Settings from "./pages/Settings";
import ImportContacts from "./pages/ImportContacts";
import CalendarConnect from "./pages/CalendarConnect";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppLayout>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/friends" element={<Friends />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/create" element={<CreateEvent />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/import-contacts" element={<ImportContacts />} />
            <Route path="/calendars" element={<CalendarConnect />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AppLayout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
