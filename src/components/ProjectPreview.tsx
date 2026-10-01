import { useState } from 'react';

interface ProjectPreviewProps {
  /** Live URL of the project — used to generate the screenshot. */
  liveUrl: string;
  /** Fallback image shown if the screenshot service fails or while loading errors. */
  fallbackImage: string;
  /** Alt text (project title). */
  alt: string;
  className?: string;
}

/**
 * Builds a Microlink screenshot URL for a given site.
 * Microlink captures the page and returns a ready-to-use image.
 * Docs: https://microlink.io/docs/api/parameters/screenshot
 */
const buildScreenshotUrl = (url: string): string => {
  const params = new URLSearchParams({
    url,
    screenshot: 'true',
    meta: 'false',
    embed: 'screenshot.url',
    // 'page' waits for the full page; viewport keeps a clean 16:9-ish framing.
    'viewport.width': '1280',
    'viewport.height': '800',
    'viewport.deviceScaleFactor': '1',
  });
  return `https://api.microlink.io/?${params.toString()}`;
};

/**
 * Shows an auto-generated screenshot of a live site.
 * Falls back to `fallbackImage` if the screenshot fails to load.
 */
const ProjectPreview = ({ liveUrl, fallbackImage, alt, className }: ProjectPreviewProps) => {
  // If liveUrl is empty or a placeholder ("#"), go straight to the fallback.
  const canScreenshot = Boolean(liveUrl) && liveUrl !== '#' && liveUrl.startsWith('http');

  const [failed, setFailed] = useState(!canScreenshot);
  const [loaded, setLoaded] = useState(false);

  const src = failed ? fallbackImage : buildScreenshotUrl(liveUrl);

  return (
    <>
      {/* Lightweight skeleton while the screenshot is being generated. */}
      {!loaded && (
        <div className="absolute inset-0 animate-pulse bg-gray-200 dark:bg-gray-800" />
      )}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        onError={() => {
          // Screenshot failed → fall back to the static image once.
          if (!failed) {
            setFailed(true);
            setLoaded(false);
          } else {
            // Even the fallback failed; stop showing the skeleton.
            setLoaded(true);
          }
        }}
        className={className}
      />
    </>
  );
};

export default ProjectPreview;
