"use client";

import { useState, useEffect, useCallback } from "react";
import { Picture } from "@/components/ui/Picture";
import Link from "next/link";
import { pushEvent } from "@/lib/analytics";

/* ===========================================
   Video data
   =========================================== */

interface Video {
  title: string;
  description: string;
  duration: string;
  embedUrl: string;
  ctaHeadline: string;
  ctaText: string;
}

const videos: Video[] = [
  {
    title: "Platform Overview",
    description:
      "A complete tour of the Sealmetrics dashboard, from traffic overview to AI insights.",
    duration: "3:24",
    embedUrl:
      "https://iframe.mediadelivery.net/embed/609541/e616aab7-d8cf-47d1-b250-517df6a8c593",
    ctaHeadline: "Ready to see your own data?",
    ctaText:
      "Install in 5 to 30 minutes, depending on your platform. No cookies, no consent banners, just clean analytics.",
  },
  {
    title: "Getting Started",
    description:
      "How to create your account, add your site, and install the tracking script.",
    duration: "2:15",
    embedUrl:
      "https://iframe.mediadelivery.net/embed/609541/c39d3844-8ef3-4362-8579-d71a6b832b0f",
    ctaHeadline: "Get started in minutes",
    ctaText:
      "Create your account, install the tracker, and start seeing real-time data from your first visitor.",
  },
];

/* ===========================================
   Video card
   =========================================== */

function VideoCard({
  video,
  category,
  onClick,
}: {
  video: Video;
  category: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group text-left bg-warm-white border border-warm-100 rounded-[4px] overflow-hidden cursor-pointer transition-all hover:border-warm-200 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)]"
    >
      {/* Corporate thumbnail */}
      <div className="relative aspect-video bg-warm-900 flex items-center justify-center overflow-hidden">
        {/* Category label */}
        <span className="absolute top-3 left-3 text-[0.6rem] font-medium tracking-[0.08em] uppercase text-warm-400">
          {category}
        </span>
        {/* Play button */}
        <div className="w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center transition-all group-hover:scale-110 group-hover:bg-white/20">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="white"
            stroke="none"
          >
            <polygon points="8,5 20,12 8,19" />
          </svg>
        </div>
        {/* Logo watermark */}
        <Picture
          src="/logos/logo-sealmetrics-white.svg"
          alt=""
          width={90}
          height={16}

          className="absolute bottom-3 left-3 h-4 w-auto opacity-25"
        />
        {/* Duration */}
        <span className="absolute bottom-3 right-3 text-[0.65rem] font-mono font-medium text-warm-300 bg-white/10 rounded-[2px] px-1.5 py-0.5">
          {video.duration}
        </span>
      </div>
      {/* Info */}
      <div className="p-5">
        <h3 className="text-[0.9rem] font-medium text-text-primary mb-1.5 leading-snug">
          {video.title}
        </h3>
        <p className="text-[0.8rem] text-text-secondary leading-relaxed mb-2">
          {video.description}
        </p>
        <span className="text-[0.7rem] text-text-tertiary">
          In Spanish — English version coming soon
        </span>
      </div>
    </button>
  );
}

/* ===========================================
   Video modal
   =========================================== */

function VideoModal({
  video,
  onClose,
}: {
  video: Video;
  onClose: () => void;
}) {
  // Close on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-8 bg-black/60 backdrop-blur-sm animate-[fadeIn_0.2s_ease]"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="w-full max-w-[900px] max-h-[90vh] bg-white border border-warm-100 rounded-[4px] overflow-hidden shadow-2xl grid grid-rows-[auto_1fr] sm:grid-rows-[1fr_auto]">
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 z-[210] w-9 h-9 rounded-full bg-black/50 border border-white/10 text-white/70 flex items-center justify-center cursor-pointer hover:bg-black/70 hover:text-white transition-colors"
          aria-label="Close video"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        {/* Video player */}
        <div className="relative bg-warm-900 aspect-video">
          {video.embedUrl ? (
            <iframe
              src={`${video.embedUrl}?autoplay=true&preload=true&responsive=true`}
              loading="lazy"
              allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture; fullscreen"
              allowFullScreen
              className="absolute inset-0 w-full h-full border-none"
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-warm-400 gap-3">
              <svg
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                className="opacity-40"
              >
                <polygon points="8,5 20,12 8,19" />
              </svg>
              <span className="text-[0.85rem]">{video.title}</span>
              <span className="text-[0.7rem] text-warm-300">
                Video embed URL not configured yet
              </span>
            </div>
          )}
        </div>

        {/* CTA section */}
        <div className="p-8 sm:p-10 border-t border-warm-100">
          <h3 className="font-serif text-[1.3rem] sm:text-[1.5rem] text-text-primary mb-3 leading-tight">
            {video.ctaHeadline}
          </h3>
          <p className="text-[0.9rem] text-text-secondary leading-relaxed mb-6 max-w-[480px]">
            {video.ctaText}
          </p>
          <div data-md="skip" className="flex flex-wrap gap-3">
            <Link
              href="/demo"
              className="inline-flex items-center px-7 py-3 text-[0.9rem] font-medium text-white bg-text-primary rounded-[4px] no-underline hover:bg-[#333] transition-colors"
            >
              Book a Demo →
            </Link>
            <a
              href="https://my.sealmetrics.com/register"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-7 py-3 text-[0.9rem] font-medium text-text-primary border border-warm-200 rounded-[4px] no-underline hover:bg-warm-50 transition-colors"
            >
              Start 14-day trial
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ===========================================
   Main export
   =========================================== */

export function VideoGrid() {
  const [activeVideo, setActiveVideo] = useState<Video | null>(null);

  const handleClose = useCallback(() => setActiveVideo(null), []);

  // Fire micro-conversion on video play
  const handleSelect = useCallback((video: Video) => {
    setActiveVideo(video);
    pushEvent({ event: "video_play", title: video.title });
  }, []);

  return (
    <>
      <section className="py-20 bg-white border-t border-warm-100">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
          {/* The grid had no heading at all, so the card titles below sat as
              h3 directly under the page h1. This names the section and
              restores the outline. */}
          <h2 className="headline-section mb-8">Product demos and tutorials</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-[800px]">
            {videos.map((video) => (
              <VideoCard
                key={video.title}
                video={video}
                category="Product Demo"
                onClick={() => handleSelect(video)}
              />
            ))}
          </div>
        </div>
      </section>

      {activeVideo && (
        <VideoModal video={activeVideo} onClose={handleClose} />
      )}
    </>
  );
}
