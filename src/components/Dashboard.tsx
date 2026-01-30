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
} from "lucide-react";
import ModuleCard from "@/components/ui/ModuleCard";
import { Button } from "@/components/ui/button";

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

const notifications = [
  { id: 1, text: "Fee payment deadline: Feb 15, 2025", type: "warning" },
  { id: 2, text: "New semester registration now open", type: "info" },
];

const Dashboard = ({ user, onLogout }: DashboardProps) => {
  return (
    <div className="min-h-screen bg-background bg-pattern">
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
            <div className="flex items-center gap-3">
              {/* Notifications */}
              <Button
                variant="ghost"
                size="icon"
                className="relative rounded-xl hover:bg-muted"
              >
                <Bell className="w-5 h-5 text-muted-foreground" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-secondary text-secondary-foreground text-xs font-bold rounded-full flex items-center justify-center">
                  {notifications.length}
                </span>
              </Button>

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

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
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

        {/* Notifications Banner */}
        {notifications.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="mb-8 p-4 rounded-2xl bg-secondary/10 border border-secondary/30"
          >
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-secondary/20 flex items-center justify-center flex-shrink-0">
                <Bell className="w-5 h-5 text-secondary" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-foreground mb-1">Notifications</h3>
                <ul className="space-y-1">
                  {notifications.map((notif) => (
                    <li key={notif.id} className="text-sm text-muted-foreground flex items-center gap-2">
                      <ChevronRight className="w-3 h-3 text-secondary flex-shrink-0" />
                      {notif.text}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        )}

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
              <p className="text-2xl font-bold text-primary">2025</p>
              <p className="text-xs text-muted-foreground mt-1">Academic Year</p>
            </div>
            <div className="text-center p-4 rounded-xl bg-muted/50">
              <p className="text-2xl font-bold text-accent">Jan</p>
              <p className="text-xs text-muted-foreground mt-1">Current Semester</p>
            </div>
            <div className="text-center p-4 rounded-xl bg-muted/50">
              <p className="text-2xl font-bold text-secondary">Active</p>
              <p className="text-xs text-muted-foreground mt-1">Status</p>
            </div>
            <div className="text-center p-4 rounded-xl bg-muted/50">
              <p className="text-2xl font-bold text-module-graduation">0</p>
              <p className="text-xs text-muted-foreground mt-1">Pending Tasks</p>
            </div>
          </div>
        </motion.section>
      </main>

      {/* Footer */}
      <footer className="mt-auto py-6 border-t border-border/50">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">
            © 2025 Zetech University. Zetech Elimika — One Gateway. One Login. One Zetech.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
