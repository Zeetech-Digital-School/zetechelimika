import { motion } from "framer-motion";
import { Sparkles, Shield, Smartphone, Zap } from "lucide-react";
import LoginForm from "@/components/LoginForm";
import heroPattern from "@/assets/hero-pattern.jpg";

interface LandingPageProps {
  onLogin: (username: string, password: string) => void;
  isLoading?: boolean;
  error?: string | null;
}

const features = [
  {
    icon: Zap,
    title: "One Login",
    description: "Access all Zetech systems with a single sign-in",
  },
  {
    icon: Smartphone,
    title: "Mobile First",
    description: "Designed for your phone, works everywhere",
  },
  {
    icon: Shield,
    title: "Secure",
    description: "Enterprise-grade security for your data",
  },
];

const LandingPage = ({ onLogin, isLoading, error }: LandingPageProps) => {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Panel - Hero */}
      <div className="relative flex-1 hero-gradient text-primary-foreground overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url(${heroPattern})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary/80 to-foreground/90" />

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-between min-h-[50vh] lg:min-h-screen p-6 sm:p-10 lg:p-16">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3"
          >
            <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur flex items-center justify-center border border-white/20">
              <span className="font-display font-bold text-2xl">Z</span>
            </div>
            <div>
              <h1 className="font-display font-bold text-xl">Zetech University</h1>
              <p className="text-sm text-white/70">Student Gateway</p>
            </div>
          </motion.div>

          {/* Main Heading */}
          <div className="py-10 lg:py-0">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur border border-white/20 mb-6">
                <Sparkles className="w-4 h-4 text-secondary" />
                <span className="text-sm font-medium">Welcome to Elimika</span>
              </div>

              <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-4">
                One Gateway.
                <br />
                <span className="text-secondary">One Login.</span>
                <br />
                One Zetech.
              </h2>

              <p className="text-lg sm:text-xl text-white/80 max-w-md leading-relaxed">
                Your unified access point to all Zetech University student services. 
                Learn, grow, and succeed with <em>Elimika</em>.
              </p>
            </motion.div>
          </div>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="hidden lg:grid grid-cols-3 gap-6"
          >
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="flex items-start gap-3 p-4 rounded-xl bg-white/5 backdrop-blur border border-white/10"
              >
                <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                  <feature.icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{feature.title}</h3>
                  <p className="text-sm text-white/60">{feature.description}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-1/4 -right-32 w-64 h-64 rounded-full bg-secondary/20 blur-3xl" />
        <div className="absolute bottom-1/4 -left-32 w-96 h-96 rounded-full bg-accent/10 blur-3xl" />
      </div>

      {/* Right Panel - Login */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-10 lg:p-16 bg-background mesh-gradient">
        <div className="w-full max-w-md">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-2">
              Welcome Back
            </h3>
            <p className="text-muted-foreground">
              Sign in to access your student dashboard
            </p>
          </motion.div>

          <LoginForm onLogin={onLogin} isLoading={isLoading} error={error} />

          {/* Help Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-8 p-4 rounded-xl bg-muted/50 border border-border/50"
          >
            <h4 className="font-semibold text-sm text-foreground mb-2">Need Help?</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Contact ICT Support at{" "}
              <a href="mailto:zdscontent@zetech.ac.ke" className="text-primary hover:underline">
                zdscontent@zetech.ac.ke
              </a>{" "}
              or visit the Elearning Help Desk.
            </p>
          </motion.div>

          {/* Footer */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-6 text-center text-xs text-muted-foreground"
          >
            © {new Date().getFullYear()} Zetech University. All rights reserved.
          </motion.p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
