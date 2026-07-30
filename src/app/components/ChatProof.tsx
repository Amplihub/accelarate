import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./ChatProof.css";

gsap.registerPlugin(ScrollTrigger);

const EASE = "power2.out";
const DURATION = 0.7;

function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

const SCREENSHOT_SRC = "https://assets.cdn.filesafe.space/0JdcK8nm75u9Gb745fHy/media/6a05b39360b8c350d308d10a.webp";

// Mobile-only — the single desktop screenshot is swapped for this ordered
// stack of separate mobile-cropped images, one per message.
const MOBILE_SCREENSHOTS = [
  "https://assets.cdn.filesafe.space/0JdcK8nm75u9Gb745fHy/media/69c2e6a4d17eb5bcb76e41f2.png",
  "https://assets.cdn.filesafe.space/0JdcK8nm75u9Gb745fHy/media/69c2e6bb0e9821ea7bb9b8ba.png",
  "https://assets.cdn.filesafe.space/0JdcK8nm75u9Gb745fHy/media/69c2e6bb0e9821ea7bb9b8ba.png",
  "https://assets.cdn.filesafe.space/0JdcK8nm75u9Gb745fHy/media/69c2e6d7f233aed6d93a28a3.png",
  "https://assets.cdn.filesafe.space/0JdcK8nm75u9Gb745fHy/media/69c2e6eefe4d0d3bf2d0fa2e.png",
  "https://assets.cdn.filesafe.space/0JdcK8nm75u9Gb745fHy/media/69c2e740f5a3890392a069f5.png",
  "https://assets.cdn.filesafe.space/0JdcK8nm75u9Gb745fHy/media/69c2e75d4d943d752b931665.png",
  "https://assets.cdn.filesafe.space/0JdcK8nm75u9Gb745fHy/media/6a05b44b82125b9874f13d90.webp",
  "https://assets.cdn.filesafe.space/0JdcK8nm75u9Gb745fHy/media/69f7768ad868be00854d0cea.webp",
];

/* ─────────────────────────────────────────────
   Chat Proof — "The Receipts"
   One staged screenshot beneath the case study
   wall — edge-faded so it reads as a glimpse of
   something bigger, not a bounded rectangle.

   ⚠️ COPY NOTE — eyebrow/headline below are newly
   drafted, not yet approved. Flagging per request
   before this ships.
───────────────────────────────────────────── */
export default function ChatProof() {
  const headerRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const mobileStackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.from(headerRef.current, {
          opacity: 0,
          y: 20,
          duration: DURATION,
          ease: EASE,
          clearProps: "opacity,transform",
          scrollTrigger: { trigger: headerRef.current, start: "top 88%", once: true },
        });
      }
      [frameRef.current, mobileStackRef.current].forEach((el) => {
        if (!el) return;
        gsap.from(el, {
          opacity: 0,
          y: 24,
          duration: DURATION,
          ease: EASE,
          clearProps: "opacity,transform",
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
        });
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="chat-proof"
      className="border-t border-border"
      style={{
        background: "radial-gradient(ellipse 70% 60% at 50% 38%, #E3ECFF 0%, #ffffff 72%)",
        scrollMarginTop: 110,
      }}
    >
      <div className="max-w-[1200px] mx-auto pt-8 md:pt-12 pb-8 md:pb-12 px-6">

        {/* Header — same eyebrow pill + Inter display headline as every
            other section on the page. */}
        <div ref={headerRef}>
          <div className="flex justify-center mb-5">
            <span
              className="inline-block font-bold uppercase tracking-[0.1em] text-[#1A56DB] rounded-full"
              style={{ fontSize: "11px", backgroundColor: "#EAF1FF", padding: "5px 16px" }}
            >
              The Receipts
            </span>
          </div>

          <h2
            className="font-extrabold text-foreground text-center"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "clamp(28px, 4vw, 48px)",
              letterSpacing: "-0.04em",
              lineHeight: 1.1,
            }}
          >
            The Messages We Actually Get
          </h2>
        </div>

        {/* ── Desktop — single staged screenshot, mask dissolving its own
            edges into the page. The section's own radial-gradient background
            (above) now does the job the old per-image glow used to. ── */}
        <div className="hidden md:block">
          <div className="cpf-stage">
            <div ref={frameRef} className="cpf-frame">
              <img className="cpf-image" src={SCREENSHOT_SRC} alt="Client feedback message" loading="lazy" />
            </div>
          </div>
        </div>

        {/* ── Mobile — vertical stack of separate message screenshots, fade
            only at the very top/bottom. ── */}
        <div className="md:hidden">
          <div className="cpf-stage">
            <div ref={mobileStackRef} className="cpf-stack">
              {MOBILE_SCREENSHOTS.map((src, i) => (
                <img
                  key={i}
                  className={
                    "cpf-stack-img" +
                    (i === 0 ? " cpf-stack-img--first" : "") +
                    (i === MOBILE_SCREENSHOTS.length - 1 ? " cpf-stack-img--last" : "")
                  }
                  src={src}
                  alt={`Client feedback message ${i + 1}`}
                  loading="lazy"
                />
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
