import { useState, useEffect, useCallback } from "react";

export interface Notification {
  id: string;
  title: string;
  body: string;
  type: "info" | "warning" | "success" | "urgent";
  timestamp: Date;
  read: boolean;
}

// Mock notifications for demo - in production, these would come from a backend
const mockNotifications: Notification[] = [
  {
    id: "1",
    title: "Fee Payment Deadline",
    body: "Your fee payment deadline is Feb 15, 2025. Please clear your balance to avoid deregistration.",
    type: "warning",
    timestamp: new Date(),
    read: false,
  },
  {
    id: "2",
    title: "New Semester Registration",
    body: "Registration for January 2025 semester is now open. Complete your unit registration.",
    type: "info",
    timestamp: new Date(Date.now() - 86400000),
    read: false,
  },
  {
    id: "3",
    title: "CAT Results Posted",
    body: "Your CAT 1 results for all units have been posted. Check your results portal.",
    type: "success",
    timestamp: new Date(Date.now() - 172800000),
    read: true,
  },
];

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [permission, setPermission] = useState<NotificationPermission>("default");

  useEffect(() => {
    if ("Notification" in window) {
      setPermission(Notification.permission);
    }
  }, []);

  const requestPermission = useCallback(async () => {
    if (!("Notification" in window)) {
      console.log("This browser does not support notifications");
      return false;
    }

    try {
      const result = await Notification.requestPermission();
      setPermission(result);
      return result === "granted";
    } catch (error) {
      console.error("Error requesting notification permission:", error);
      return false;
    }
  }, []);

  const sendNotification = useCallback(
    (title: string, options?: NotificationOptions) => {
      if (permission !== "granted") return;

      try {
        const notification = new Notification(title, {
          icon: "/pwa-192x192.png",
          badge: "/pwa-192x192.png",
          ...options,
        });

        notification.onclick = () => {
          window.focus();
          notification.close();
        };
      } catch (error) {
        console.error("Error sending notification:", error);
      }
    },
    [permission]
  );

  const markAsRead = useCallback((id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  }, []);

  const markAllAsRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  return {
    notifications,
    unreadCount,
    permission,
    requestPermission,
    sendNotification,
    markAsRead,
    markAllAsRead,
  };
};
