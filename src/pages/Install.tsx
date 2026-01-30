import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Download,
  Smartphone,
  Wifi,
  WifiOff,
  Bell,
  BellRing,
  Check,
  ArrowLeft,
  Share,
  MoreVertical,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePWA } from "@/hooks/usePWA";
import { useNotifications } from "@/hooks/useNotifications";

const InstallPage = () => {
  const navigate = useNavigate();
  const { isInstallable, isInstalled, isOnline, installApp } = usePWA();
  const { permission, requestPermission } = useNotifications();

  const handleInstall = async () => {
    const success = await installApp();
    if (success) {
      // Show success feedback
    }
  };

  const handleEnableNotifications = async () => {
    await requestPermission();
  };

  return (
    <div className="min-h-screen bg-background bg-pattern">
      {/* Header */}
      <header className="sticky top-0 z-50 glass border-b border-border/50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/")}
              className="rounded-xl"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="font-display font-bold text-lg text-foreground">
                Install Elimika
              </h1>
              <p className="text-xs text-muted-foreground">Get the app on your device</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-lg">
        {/* Status Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mb-6 p-4 rounded-2xl flex items-center gap-3 ${
            isOnline
              ? "bg-accent/10 border border-accent/30"
              : "bg-destructive/10 border border-destructive/30"
          }`}
        >
          {isOnline ? (
            <>
              <Wifi className="w-5 h-5 text-accent" />
              <span className="text-sm font-medium">You're online</span>
            </>
          ) : (
            <>
              <WifiOff className="w-5 h-5 text-destructive" />
              <span className="text-sm font-medium">You're offline — app still works!</span>
            </>
          )}
        </motion.div>

        {/* Install Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8 p-6 rounded-2xl bg-card border border-border/50 card-elevated"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center">
              <Smartphone className="w-8 h-8 text-primary-foreground" />
            </div>
            <div>
              <h2 className="font-display text-xl font-bold text-foreground">
                Install App
              </h2>
              <p className="text-sm text-muted-foreground">
                Add Elimika to your home screen
              </p>
            </div>
          </div>

          {isInstalled ? (
            <div className="flex items-center gap-2 p-4 rounded-xl bg-accent/10 text-accent">
              <Check className="w-5 h-5" />
              <span className="font-medium">App is installed!</span>
            </div>
          ) : isInstallable ? (
            <Button
              onClick={handleInstall}
              variant="hero"
              size="lg"
              className="w-full"
            >
              <Download className="w-5 h-5 mr-2" />
              Install Zetech Elimika
            </Button>
          ) : (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                To install manually, use your browser menu:
              </p>
              
              {/* iOS Instructions */}
              <div className="p-4 rounded-xl bg-muted/50">
                <p className="font-semibold text-sm mb-2">On iPhone (Safari):</p>
                <ol className="text-sm text-muted-foreground space-y-1">
                  <li className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center">1</span>
                    Tap the <Share className="w-4 h-4 inline mx-1" /> Share button
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center">2</span>
                    Select "Add to Home Screen"
                  </li>
                </ol>
              </div>

              {/* Android Instructions */}
              <div className="p-4 rounded-xl bg-muted/50">
                <p className="font-semibold text-sm mb-2">On Android (Chrome):</p>
                <ol className="text-sm text-muted-foreground space-y-1">
                  <li className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center">1</span>
                    Tap the <MoreVertical className="w-4 h-4 inline mx-1" /> menu
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center">2</span>
                    Select "Install app" or "Add to Home Screen"
                  </li>
                </ol>
              </div>
            </div>
          )}
        </motion.section>

        {/* Notifications Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8 p-6 rounded-2xl bg-card border border-border/50 card-elevated"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center">
              <BellRing className="w-8 h-8 text-secondary-foreground" />
            </div>
            <div>
              <h2 className="font-display text-xl font-bold text-foreground">
                Notifications
              </h2>
              <p className="text-sm text-muted-foreground">
                Stay updated with alerts
              </p>
            </div>
          </div>

          {permission === "granted" ? (
            <div className="flex items-center gap-2 p-4 rounded-xl bg-accent/10 text-accent">
              <Check className="w-5 h-5" />
              <span className="font-medium">Notifications enabled!</span>
            </div>
          ) : permission === "denied" ? (
            <div className="p-4 rounded-xl bg-muted/50">
              <p className="text-sm text-muted-foreground">
                Notifications are blocked. Please enable them in your browser settings.
              </p>
            </div>
          ) : (
            <>
              <p className="text-sm text-muted-foreground mb-4">
                Get notified about fee deadlines, registration dates, exam schedules, and important announcements.
              </p>
              <Button
                onClick={handleEnableNotifications}
                variant="gold"
                size="lg"
                className="w-full"
              >
                <Bell className="w-5 h-5 mr-2" />
                Enable Notifications
              </Button>
            </>
          )}
        </motion.section>

        {/* Features */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="font-display font-semibold text-lg mb-4">Why install?</h3>
          <div className="grid gap-3">
            {[
              { icon: Smartphone, title: "Works like a native app", desc: "Full-screen experience on your device" },
              { icon: WifiOff, title: "Works offline", desc: "Access your dashboard anytime" },
              { icon: BellRing, title: "Push notifications", desc: "Never miss important updates" },
            ].map((feature, i) => (
              <div
                key={feature.title}
                className="flex items-start gap-3 p-4 rounded-xl bg-muted/30"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <feature.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-sm">{feature.title}</p>
                  <p className="text-xs text-muted-foreground">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.section>
      </main>
    </div>
  );
};

export default InstallPage;
