import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import VideoPlayer from "@/components/ui/VideoPlayer";

const props = {
  src: "https://media.globaldccorp.com/fha-singapur-2026.mp4",
  srcWebm: "https://media.globaldccorp.com/fha-singapur-2026.webm",
  poster: "https://media.globaldccorp.com/fha-singapur-2026-poster.jpg",
  title: "FHA Singapore 2026",
};

describe("VideoPlayer", () => {
  it("renders the play button with poster before activation", () => {
    render(<VideoPlayer {...props} />);

    const playButton = screen.getByRole("button", {
      name: /reproducir video/i,
    });
    expect(playButton).toBeInTheDocument();

    // Poster image is inside the button
    const img = screen.getByAltText(props.title);
    expect(img).toBeInTheDocument();
  });

  it("does not render a <video> element before activation", () => {
    const { container } = render(<VideoPlayer {...props} />);
    expect(container.querySelector("video")).toBeNull();
  });

  it("renders a <video> element after clicking play", async () => {
    const user = userEvent.setup();
    const { container } = render(<VideoPlayer {...props} />);

    const playButton = screen.getByRole("button", {
      name: /reproducir video/i,
    });
    await user.click(playButton);

    const video = container.querySelector("video");
    expect(video).not.toBeNull();
    expect(video?.getAttribute("autoplay")).not.toBeNull();
  });

  it("includes both mp4 and webm sources after activation", async () => {
    const user = userEvent.setup();
    const { container } = render(<VideoPlayer {...props} />);

    await user.click(screen.getByRole("button", { name: /reproducir video/i }));

    const sources = container.querySelectorAll("source");
    const types = Array.from(sources).map((s) => s.getAttribute("type"));
    expect(types).toContain("video/mp4");
    expect(types).toContain("video/webm");
  });

  it("works without webm source", async () => {
    const user = userEvent.setup();
    const noWebm = {
      src: props.src,
      poster: props.poster,
      title: props.title,
    };
    const { container } = render(<VideoPlayer {...noWebm} />);

    await user.click(screen.getByRole("button", { name: /reproducir video/i }));

    const sources = container.querySelectorAll("source");
    expect(sources.length).toBe(1);
    expect(sources[0].getAttribute("type")).toBe("video/mp4");
  });

  it("uses custom aspect class when provided", () => {
    const { container } = render(
      <VideoPlayer {...props} aspect="aspect-16/10" />,
    );
    const wrapper = container.firstElementChild;
    expect(wrapper?.className).toContain("aspect-16/10");
  });
});
