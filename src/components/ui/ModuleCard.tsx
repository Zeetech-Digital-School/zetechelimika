import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ModuleCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
  colorClass: string;
  delay?: number;
}

const ModuleCard = ({
  title,
  description,
  icon: Icon,
  href,
  colorClass,
  delay = 0,
}: ModuleCardProps) => {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.02, y: -4 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "group relative flex flex-col p-6 rounded-2xl bg-card card-elevated overflow-hidden cursor-pointer",
        "border border-border/50 hover:border-transparent transition-all duration-300"
      )}
    >
      {/* Gradient overlay on hover */}
      <div
        className={cn(
          "absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300",
          colorClass
        )}
        style={{
          background: `linear-gradient(135deg, hsl(var(--${colorClass.replace('module-', 'module-')})) 0%, transparent 100%)`,
        }}
      />

      {/* Icon container */}
      <div
        className={cn(
          "relative w-14 h-14 rounded-xl flex items-center justify-center mb-4",
          "transition-all duration-300 group-hover:scale-110"
        )}
        style={{
          backgroundColor: `hsl(var(--${colorClass.replace('module-', 'module-')}) / 0.1)`,
        }}
      >
        <Icon
          className="w-7 h-7 transition-colors duration-300"
          style={{
            color: `hsl(var(--${colorClass.replace('module-', 'module-')}))`,
          }}
        />
      </div>

      {/* Content */}
      <h3 className="font-display text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
        {title}
      </h3>
      <p className="text-sm text-muted-foreground leading-relaxed">
        {description}
      </p>

      {/* Arrow indicator */}
      <div className="mt-4 flex items-center text-sm font-medium text-muted-foreground group-hover:text-primary transition-colors">
        <span>Open</span>
        <motion.svg
          className="w-4 h-4 ml-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          initial={{ x: 0 }}
          whileHover={{ x: 4 }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 8l4 4m0 0l-4 4m4-4H3"
          />
        </motion.svg>
      </div>

      {/* Decorative corner */}
      <div
        className="absolute -bottom-10 -right-10 w-24 h-24 rounded-full opacity-5 group-hover:opacity-10 transition-opacity"
        style={{
          backgroundColor: `hsl(var(--${colorClass.replace('module-', 'module-')}))`,
        }}
      />
    </motion.a>
  );
};

export default ModuleCard;
