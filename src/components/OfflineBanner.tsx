import { motion, AnimatePresence } from "framer-motion";
import { Wifi, WifiOff, X } from "lucide-react";
import { usePWA } from "@/hooks/usePWA";
import { useState, useEffect } from "react";

const OfflineBanner = () => {
  const { isOnline } = usePWA();
  const [showBanner, setShowBanner] = useState(false);
  const [wasOffline, setWasOffline] = useState(false);

  useEffect(() => {
    if (!isOnline) {
      setShowBanner(true);
      setWasOffline(true);
    } else if (wasOffline) {
      // Show "back online" message briefly
      setShowBanner(true);
      const timer = setTimeout(() => {
        setShowBanner(false);
        setWasOffline(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isOnline, wasOffline]);

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className={`fixed top-0 left-0 right-0 z-[100] px-4 py-3 flex items-center justify-center gap-2 ${
            isOnline
              ? "bg-accent text-accent-foreground"
              : "bg-muted text-foreground"
          }`}
        >
          {isOnline ? (
            <>
              <Wifi className="w-4 h-4" />
              <span className="text-sm font-medium">You're back online!</span>
            </>
          ) : (
            <>
              <WifiOff className="w-4 h-4" />
              <span className="text-sm font-medium">
                You're offline — don't worry, Elimika still works!
              </span>
            </>
          )}
          <button
            onClick={() => setShowBanner(false)}
            className="ml-2 p-1 rounded-full hover:bg-foreground/10 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default OfflineBanner;
