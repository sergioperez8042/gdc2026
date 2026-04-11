"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { Toaster } from "@/components/ui/Toaster";

export type ToastVariant = "success" | "error" | "info" | "warning";

export interface Toast {
  id: string;
  variant: ToastVariant;
  title: string;
  description?: string;
  /** Auto-dismiss after this many ms. Pass 0 to keep until dismissed manually. */
  duration?: number;
}

type ToastInput = Omit<Toast, "id">;

interface ToastContextValue {
  toasts: Toast[];
  show: (toast: ToastInput) => string;
  dismiss: (id: string) => void;
  clear: () => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

const MAX_TOASTS = 4;
const DEFAULT_DURATION = 5000;

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  // Track active timers so we can clear them on manual dismiss
  const timersRef = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());

  const dismiss = useCallback((id: string) => {
    const timer = timersRef.current.get(id);
    if (timer) {
      clearTimeout(timer);
      timersRef.current.delete(id);
    }
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const show = useCallback(
    (input: ToastInput) => {
      const id = crypto.randomUUID();
      const duration = input.duration ?? DEFAULT_DURATION;

      setToasts((prev) => {
        // Cap concurrent toasts — drop the oldest when we exceed MAX_TOASTS
        const next = [...prev, { ...input, id }];
        if (next.length <= MAX_TOASTS) return next;
        const overflow = next.length - MAX_TOASTS;
        const dropped = next.slice(0, overflow);
        for (const d of dropped) {
          const t = timersRef.current.get(d.id);
          if (t) {
            clearTimeout(t);
            timersRef.current.delete(d.id);
          }
        }
        return next.slice(overflow);
      });

      if (duration > 0) {
        const timer = setTimeout(() => dismiss(id), duration);
        timersRef.current.set(id, timer);
      }

      return id;
    },
    [dismiss],
  );

  const clear = useCallback(() => {
    for (const timer of timersRef.current.values()) clearTimeout(timer);
    timersRef.current.clear();
    setToasts([]);
  }, []);

  // Clean up any pending timers when the provider unmounts
  useEffect(() => {
    const timers = timersRef.current;
    return () => {
      for (const timer of timers.values()) clearTimeout(timer);
      timers.clear();
    };
  }, []);

  const value = useMemo<ToastContextValue>(
    () => ({ toasts, show, dismiss, clear }),
    [toasts, show, dismiss, clear],
  );

  return (
    <ToastContext.Provider value={value}>
      {children}
      <Toaster />
    </ToastContext.Provider>
  );
}

/**
 * Public hook to fire toasts from anywhere in the app.
 *
 * Usage:
 *   const { toast } = useToast();
 *   toast.success("¡Solicitud enviada!", "Te respondemos en 24h");
 *   toast.error("No se pudo enviar", "Inténtalo de nuevo en unos minutos");
 */
export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error("useToast must be used inside <ToastProvider>");
  }

  const { show, dismiss, clear } = ctx;

  return useMemo(
    () => ({
      toast: {
        success: (title: string, description?: string, duration?: number) =>
          show({ variant: "success", title, description, duration }),
        error: (title: string, description?: string, duration?: number) =>
          show({ variant: "error", title, description, duration }),
        info: (title: string, description?: string, duration?: number) =>
          show({ variant: "info", title, description, duration }),
        warning: (title: string, description?: string, duration?: number) =>
          show({ variant: "warning", title, description, duration }),
        custom: (input: ToastInput) => show(input),
      },
      dismiss,
      clear,
    }),
    [show, dismiss, clear],
  );
}

/**
 * Internal hook used by <Toaster /> to read the current toast list.
 * Not exported from the public surface.
 */
export function useToastList() {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error("useToastList must be used inside <ToastProvider>");
  }
  return ctx;
}
