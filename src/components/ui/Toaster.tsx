"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from "lucide-react";
import { useToastList, type Toast, type ToastVariant } from "@/contexts/ToastContext";

interface VariantStyle {
  Icon: typeof CheckCircle2;
  iconClass: string;
  borderClass: string;
  glowClass: string;
}

const variantStyles: Record<ToastVariant, VariantStyle> = {
  success: {
    Icon: CheckCircle2,
    iconClass: "text-fresh-400",
    borderClass: "border-fresh-500/30",
    glowClass: "shadow-fresh-500/10",
  },
  error: {
    Icon: AlertCircle,
    iconClass: "text-red-400",
    borderClass: "border-red-500/30",
    glowClass: "shadow-red-500/10",
  },
  info: {
    Icon: Info,
    iconClass: "text-globe-300",
    borderClass: "border-globe-400/30",
    glowClass: "shadow-globe-400/10",
  },
  warning: {
    Icon: AlertTriangle,
    iconClass: "text-gold-400",
    borderClass: "border-gold-400/30",
    glowClass: "shadow-gold-400/10",
  },
};

export function Toaster() {
  const { toasts, dismiss } = useToastList();

  return (
    <div
      role="region"
      aria-label="Notificaciones"
      className="fixed z-[100] pointer-events-none inset-x-4 bottom-4 sm:left-auto sm:right-6 sm:bottom-6 flex flex-col gap-3 max-w-sm sm:w-96"
    >
      <AnimatePresence initial={false}>
        {toasts.map((toast) => (
          <ToastItem
            key={toast.id}
            toast={toast}
            onDismiss={() => dismiss(toast.id)}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}

function ToastItem({
  toast,
  onDismiss,
}: {
  toast: Toast;
  onDismiss: () => void;
}) {
  const { Icon, iconClass, borderClass, glowClass } = variantStyles[toast.variant];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24, scale: 0.92 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, x: 24, scale: 0.92, transition: { duration: 0.18 } }}
      transition={{ type: "spring", stiffness: 320, damping: 28 }}
      role="status"
      aria-live="polite"
      className={`pointer-events-auto flex items-start gap-3 rounded-2xl border bg-dark-card/95 backdrop-blur-xl px-4 py-3.5 shadow-2xl ${borderClass} ${glowClass}`}
    >
      <Icon className={`w-5 h-5 shrink-0 mt-0.5 ${iconClass}`} strokeWidth={2} />

      <div className="flex-1 min-w-0">
        <p className="text-cream text-sm font-semibold leading-snug">
          {toast.title}
        </p>
        {toast.description && (
          <p className="text-cream/55 text-xs mt-1 leading-relaxed">
            {toast.description}
          </p>
        )}
      </div>

      <button
        type="button"
        onClick={onDismiss}
        className="shrink-0 -m-1 p-1 rounded text-cream/40 hover:text-cream hover:bg-dark-border/50 transition-colors"
        aria-label="Cerrar notificación"
      >
        <X className="w-4 h-4" strokeWidth={2} />
      </button>
    </motion.div>
  );
}
