import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, waitFor } from "@testing-library/react";
import { ToastProvider } from "@/contexts/ToastContext";
import ContactForm from "@/components/ui/ContactForm";
import es from "@/i18n/es.json";

const dict = es.contact.form;

function setup() {
  return render(
    <ToastProvider>
      <ContactForm dict={dict} />
    </ToastProvider>,
  );
}

function fillValid(container: HTMLElement) {
  fireEvent.change(container.querySelector('input[name="name"]')!, {
    target: { value: "Juan Perez" },
  });
  fireEvent.change(container.querySelector('input[name="email"]')!, {
    target: { value: "juan@example.com" },
  });
  fireEvent.change(container.querySelector('select[name="subject_topic"]')!, {
    target: { value: dict.subjects.general },
  });
  fireEvent.change(container.querySelector('textarea[name="message"]')!, {
    target: { value: "Necesito una cotizacion para 500 kg de cafe de especialidad." },
  });
}

describe("ContactForm submission", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  afterEach(() => {
    cleanup();
    vi.unstubAllGlobals();
  });

  it("POSTs the form data to /api/contact on a valid submit", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ ok: true }),
    });
    vi.stubGlobal("fetch", fetchMock);

    const { container } = setup();
    fillValid(container);
    fireEvent.submit(container.querySelector("form")!);

    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1));

    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe("/api/contact");
    expect(init.method).toBe("POST");
    expect(init.headers["Content-Type"]).toBe("application/json");
    expect(JSON.parse(init.body)).toMatchObject({
      name: "Juan Perez",
      email: "juan@example.com",
    });
  });

  it("does not call the API when validation fails", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);

    const { container } = setup();
    // Submit with every field empty — schema validation must block the request.
    fireEvent.submit(container.querySelector("form")!);

    await waitFor(() => {
      expect(container.querySelector('[role="alert"]')).not.toBeNull();
    });
    expect(fetchMock).not.toHaveBeenCalled();
  });
});
