import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  GraduationCap,
  FileText,
  BookOpen,
  Award,
  Briefcase,
  ScrollText,
  Bell,
  LogOut,
  User,
  ChevronRight,
  Download,
  Smartphone,
} from "lucide-react";
import ModuleCard from "@/components/ui/ModuleCard";
import NotificationPanel from "@/components/NotificationPanel";
import OfflineBanner from "@/components/OfflineBanner";
import { Button } from "@/components/ui/button";
import { usePWA } from "@/hooks/usePWA";
import { useNotifications } from "@/hooks/useNotifications";

interface DashboardProps {
  user: {
    admissionNumber: string;
    name?: string;
  };
  onLogout: () => void;
}

const modules = [
  {
    id: "admissions",
    title: "Admissions",
    description: "Apply to Zetech or check your application status",
    icon: GraduationCap,
    href: "https://sajili.zetech.ac.ke",
    colorClass: "module-admissions",
  },
  {
    id: "portal",
    title: "Student Portal",
    description: "Registration, fees, reporting & academic records",
    icon: FileText,
    href: "https://portal.zetech.ac.ke",
    colorClass: "module-portal",
  },
  {
    id: "elearning",
    title: "E-Learning",
    description: "Notes, assignments, CATs & online classes",
    icon: BookOpen,
    href: "https://elearning.zetech.ac.ke",
    colorClass: "module-elearning",
  },
  {
    id: "results",
    title: "Results",
    description: "View your grades, transcripts & academic history",
    icon: Award,
    href: "https://student.zetech.ac.ke",
    colorClass: "module-results",
  },
  {
    id: "attachment",
    title: "Attachment",
    description: "Industrial attachment, logbooks & evaluations",
    icon: Briefcase,
    href: "https://hatua.zetech.ac.ke",
    colorClass: "module-attachment",
  },
  {
    id: "graduation",
    title: "Graduation",
    description: "Graduation clearance, status & certificates",
    icon: ScrollText,
    href: "https://shahada.zetech.ac.ke",
    colorClass: "module-graduation",
  },
];

const Dashboard = ({ user, onLogout }: DashboardProps) => {
  const navigate = useNavigate();
  const [notificationPanelOpen, setNotificationPanelOpen] = useState(false);
  const { isInstalled, isInstallable } = usePWA();
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications();

  return (
    <div className="min-h-screen bg-background bg-pattern">
      <OfflineBanner />
      
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-50 glass border-b border-border/50"
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-display font-bold text-lg">Z</span>
              </div>
              <div>
                <h1 className="font-display font-bold text-lg text-foreground">
                  Zetech <span className="text-primary">Elimika</span>
                </h1>
                <p className="text-xs text-muted-foreground">Student Gateway</p>
              </div>
            </div>

            {/* User Actions */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Install Button (mobile only, if not installed) */}
              {!isInstalled && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => navigate("/install")}
                  className="rounded-xl hover:bg-primary/10 text-primary"
                >
                  <Download className="w-5 h-5" />
                </Button>
              )}

              {/* Notifications */}
              {/* <Button
                variant="ghost"
                size="icon"
                onClick={() => setNotificationPanelOpen(true)}
                className="relative rounded-xl hover:bg-muted"
              >
                <Bell className="w-5 h-5 text-muted-foreground" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-secondary text-secondary-foreground text-xs font-bold rounded-full flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </Button> */}

              {/* User Menu */}
              <div className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl bg-muted/50">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <User className="w-4 h-4 text-primary" />
                </div>
                <span className="text-sm font-medium text-foreground max-w-[120px] truncate">
                  {user.admissionNumber}
                </span>
              </div>

              {/* Logout */}
              <Button
                variant="ghost"
                size="icon"
                onClick={onLogout}
                className="rounded-xl hover:bg-destructive/10 hover:text-destructive"
              >
                <LogOut className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Notification Panel */}
      <NotificationPanel
        notifications={notifications}
        isOpen={notificationPanelOpen}
        onClose={() => setNotificationPanelOpen(false)}
        onMarkAsRead={markAsRead}
        onMarkAllAsRead={markAllAsRead}
      />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Install Prompt (if not installed) */}
        {!isInstalled && (isInstallable || true) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 rounded-2xl bg-primary/5 border border-primary/20 cursor-pointer hover:bg-primary/10 transition-colors"
            onClick={() => navigate("/install")}
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Smartphone className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground">Install Elimika App</h3>
                <p className="text-sm text-muted-foreground">
                  Add to your home screen for quick access & offline use
                </p>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </div>
          </motion.div>
        )}

        {/* Welcome Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-2">
            What do you want to do today?
          </h2>
          <p className="text-muted-foreground">
            Welcome back! Select a service to get started.
          </p>
        </motion.section>

        {/* Modules Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {modules.map((module, index) => (
            <ModuleCard
              key={module.id}
              title={module.title}
              description={module.description}
              icon={module.icon}
              href={module.href}
              colorClass={module.colorClass}
              delay={0.1 + index * 0.08}
            />
          ))}
        </section>

        {/* Quick Stats */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-12 p-6 rounded-2xl bg-card border border-border/50"
        >
          <h3 className="font-display font-semibold text-lg text-foreground mb-4">
            Quick Overview
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="text-center p-4 rounded-xl bg-muted/50">
              <p className="text-2xl font-bold text-primary">© {new Date().getFullYear()}</p>
              <p className="text-xs text-muted-foreground mt-1">Academic Year</p>
            </div>
            <div className="text-center p-4 rounded-xl bg-muted/50">
              <p className="text-2xl font-bold text-accent">{new Date().toLocaleString("en-US", { month: "short" })}</p>
              <p className="text-xs text-muted-foreground mt-1">Current Semester</p>
            </div>
            <div className="text-center p-4 rounded-xl bg-muted/50">
              <p className="text-2xl font-bold text-secondary">Active</p>
              <p className="text-xs text-muted-foreground mt-1">Status</p>
            </div>
            {/* <div className="text-center p-4 rounded-xl bg-muted/50">
              <p className="text-2xl font-bold text-module-graduation">{unreadCount}</p>
              {/* <p className="text-xs text-muted-foreground mt-1">Notifications</p> */}
            </div> */}
          </div>
        </motion.section>
      </main>

      {/* Footer */}
      <footer className="mt-auto py-6 border-t border-border/50">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Zetech University. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
