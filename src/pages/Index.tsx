import { useState } from "react";
import LandingPage from "@/components/LandingPage";
import Dashboard from "@/components/Dashboard";

type AuthState = "unauthenticated" | "loading" | "authenticated";

interface User {
  admissionNumber: string;
  name?: string;
}

const Index = () => {
  const [authState, setAuthState] = useState<AuthState>("unauthenticated");
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = (username: string, password: string) => {
    setError(null);
    setAuthState("loading");

    // Simulate authentication (in production, this would call an API)
    setTimeout(() => {
      // For demo: accept any admission number format as both username and password
      // In production, this would validate against a real auth system
      if (username === password) {
        setUser({
          admissionNumber: username,
          name: "Student",
        });
        setAuthState("authenticated");
      } else {
        setError("Invalid credentials. For first login, use your Admission Number as both username and password.");
        setAuthState("unauthenticated");
      }
    }, 1500);
  };

  const handleLogout = () => {
    setUser(null);
    setAuthState("unauthenticated");
    setError(null);
  };

  if (authState === "authenticated" && user) {
    return <Dashboard user={user} onLogout={handleLogout} />;
  }

  return (
    <LandingPage
      onLogin={handleLogin}
      isLoading={authState === "loading"}
      error={error}
    />
  );
};

export default Index;
