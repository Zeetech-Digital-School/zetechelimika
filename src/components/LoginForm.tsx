import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, LogIn, User, Lock, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface LoginFormProps {
  onLogin: (username: string, password: string) => void;
  isLoading?: boolean;
  error?: string | null;
}

const LoginForm = ({ onLogin, isLoading = false, error }: LoginFormProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim() && password.trim()) {
      onLogin(username.toUpperCase(), password);
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="space-y-5"
    >
      {/* Error Message */}
      {error && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="flex items-center gap-2 p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm"
        >
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{error}</span>
        </motion.div>
      )}

      {/* Username Field */}
      <div className="space-y-2">
        <Label htmlFor="username" className="text-sm font-medium text-foreground">
          Admission Number
        </Label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            id="username"
            type="text"
            placeholder="e.g., DBMA-01-0161/2025"
            value={username}
            onChange={(e) => setUsername(e.target.value.toUpperCase())}
            className={cn(
              "pl-10 h-12 bg-background border-border/60 rounded-xl",
              "focus:border-primary focus:ring-2 focus:ring-primary/20",
              "placeholder:text-muted-foreground/60 uppercase",
              "transition-all duration-200"
            )}
            required
            disabled={isLoading}
          />
        </div>
      </div>

      {/* Password Field */}
      <div className="space-y-2">
        <Label htmlFor="password" className="text-sm font-medium text-foreground">
          Password
        </Label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={cn(
              "pl-10 pr-12 h-12 bg-background border-border/60 rounded-xl",
              "focus:border-primary focus:ring-2 focus:ring-primary/20",
              "placeholder:text-muted-foreground/60",
              "transition-all duration-200"
            )}
            required
            disabled={isLoading}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            tabIndex={-1}
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Help Text */}
      <p className="text-xs text-muted-foreground">
        First time? Use your <span className="font-medium text-foreground">Admission Number</span> as both username and password.
      </p>

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={isLoading || !username.trim() || !password.trim()}
        className={cn(
          "w-full h-12 rounded-xl font-semibold text-base",
          "bg-primary hover:bg-primary-hover text-primary-foreground",
          "shadow-lg hover:shadow-xl transition-all duration-200",
          "disabled:opacity-50 disabled:cursor-not-allowed"
        )}
      >
        {isLoading ? (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full"
          />
        ) : (
          <>
            <LogIn className="w-5 h-5 mr-2" />
            Sign In to Elimika
          </>
        )}
      </Button>

      {/* Forgot Password */}
      <div className="text-center">
        <button
          type="button"
          className="text-sm text-primary hover:text-primary-hover transition-colors font-medium"
        >
          Forgot your password?
        </button>
      </div>
    </motion.form>
  );
};

export default LoginForm;
