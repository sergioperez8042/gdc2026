import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import type { Dictionary } from "@/i18n/dictionaries";

// Mock framer-motion to avoid animation issues in jsdom
vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: Record<string, unknown>) => {
      const safe = { ...props };
      delete safe.initial;
      delete safe.animate;
      delete safe.whileInView;
      delete safe.viewport;
      delete safe.transition;
      delete safe.variants;
      return <div {...(safe as React.HTMLAttributes<HTMLDivElement>)}>{children as React.ReactNode}</div>;
    },
  },
  useInView: () => true,
  useAnimation: () => ({ start: vi.fn(), stop: vi.fn() }),
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

// Minimal dict shape that EventsSection needs
const mockDict = {
  events: {
    surtitle: "Trayectoria",
    title: "Eventos",
    subtitle: "Presencia en ferias.",
  },
} as unknown as Dictionary;

describe("EventsSection", () => {
  beforeEach(() => {
    vi.resetModules();
    vi.doUnmock("@/data/historicalEvents");
  });

  it("renders null when historicalEvents is empty", async () => {
    // Mock the data module to return an empty array
    vi.doMock("@/data/historicalEvents", () => ({
      historicalEvents: [],
    }));

    // Dynamic import after mock is set up
    const { default: EventsSection } = await import(
      "@/components/sections/EventsSection"
    );

    const { container } = render(
      <EventsSection dict={mockDict} locale="es" />,
    );
    expect(container.innerHTML).toBe("");
  });

  it("renders the section with events when data is present", async () => {
    // Re-import to get real events
    const mod = await import("@/components/sections/EventsSection");
    const EventsSection = mod.default;

    render(<EventsSection dict={mockDict} locale="es" />);

    expect(screen.getByText("Eventos")).toBeInTheDocument();
    expect(screen.getByText("Trayectoria")).toBeInTheDocument();
  });

  it("renders event cards with name and location", async () => {
    const { historicalEvents } = await import("@/data/historicalEvents");
    const { default: EventsSection } = await import(
      "@/components/sections/EventsSection"
    );

    render(<EventsSection dict={mockDict} locale="es" />);

    for (const event of historicalEvents) {
      expect(screen.getAllByText(event.name).length).toBeGreaterThan(0);
      expect(screen.getByText(event.location)).toBeInTheDocument();
    }
  });

  it("uses locale-specific descriptions", async () => {
    const { historicalEvents } = await import("@/data/historicalEvents");
    const { default: EventsSection } = await import(
      "@/components/sections/EventsSection"
    );

    const { rerender } = render(
      <EventsSection dict={mockDict} locale="es" />,
    );
    // Spanish description should be present
    for (const event of historicalEvents) {
      expect(screen.getByText(event.description.es)).toBeInTheDocument();
    }

    // Switch to English
    rerender(<EventsSection dict={mockDict} locale="en" />);
    for (const event of historicalEvents) {
      expect(screen.getByText(event.description.en)).toBeInTheDocument();
    }
  });
});
