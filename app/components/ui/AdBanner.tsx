"use client";
import { useState, useEffect, useRef } from "react";

interface AdCampaign {
  id?: string;
  text: string;
  backgroundColor: string;
  textColor: string;
}

interface AdBannerProps {
  // If provided, render this campaign directly (preview mode) and skip fetching
  campaign?: AdCampaign | null;
}

export default function AdBanner({ campaign: campaignProp = null }: AdBannerProps) {
  const [campaign, setCampaign] = useState<AdCampaign | null>(null);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [animationDurationSeconds, setAnimationDurationSeconds] = useState<number>(20);
  const contentRef = useRef<HTMLDivElement | null>(null);

  const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || "https://server.mukulsharma1602.workers.dev";

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && campaign) {
      // Set CSS variable for ad banner height
      document.documentElement.style.setProperty('--ad-banner-height', '40px');
    } else {
      // Reset when no campaign
      document.documentElement.style.setProperty('--ad-banner-height', '0px');
    }
  }, [mounted, campaign]);

  useEffect(() => {
    // If a campaign is provided via props, use it and skip fetching
    if (campaignProp) {
      setCampaign(campaignProp);
      setLoading(false);
      return;
    }

    const fetchActiveCampaign = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${serverUrl}/ad-campaigns/active`);
        
        if (response.ok) {
          const data = await response.json();
          setCampaign(data.campaign);
        } else {
          setCampaign(null);
        }
      } catch (error) {
        console.error("Failed to fetch active campaign:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchActiveCampaign();

    // Refresh campaign every 5 minutes if not in preview mode
    const interval = setInterval(fetchActiveCampaign, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, [serverUrl, campaignProp]);

  // Ensure a fixed pixel speed regardless of text length by adjusting duration
  useEffect(() => {
    if (!mounted) return;
    const element = contentRef.current;
    if (!element) return;

    const computeAndSetDuration = () => {
      // Desired constant speed in pixels per second
      const pixelsPerSecond = 60; // tweak as desired
      // Distance covered by current keyframes is 150% of element width (from 50% to -100%)
      const elementWidth = element.scrollWidth;
      const distancePixels = elementWidth * 1.5;
      const seconds = Math.max(10, distancePixels / pixelsPerSecond); // clamp to a sensible minimum
      setAnimationDurationSeconds(seconds);
    };

    computeAndSetDuration();
    window.addEventListener('resize', computeAndSetDuration);
    return () => window.removeEventListener('resize', computeAndSetDuration);
  }, [mounted, campaign]);

  // Don't render anything during SSR or if no campaign (in live mode)
  if (!mounted || loading || !campaign) {
    return null;
  }

  return (
    <div 
      className="w-full px-4 overflow-hidden"
      style={{
        backgroundColor: campaign.backgroundColor,
        color: campaign.textColor,
        height: '40px',
        lineHeight: '40px',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      suppressHydrationWarning
    >
      <div
        ref={contentRef}
        className="animate-scroll-text whitespace-nowrap text-center font-medium text-sm sm:text-base"
        style={{ 
          animationDuration: `${animationDurationSeconds}s`,
          position: 'absolute',
          top: 0,
          height: '40px',
          lineHeight: '40px',
          willChange: 'transform',
        }}
      >
        <span className="inline-block align-middle">{campaign.text}</span>
        <span className="mx-3">•</span>
        <span className="inline-block align-middle">{campaign.text}</span>
        <span className="mx-3">•</span>
        <span className="inline-block align-middle">{campaign.text}</span>
        <span className="mx-3">•</span>
        <span className="inline-block align-middle">{campaign.text}</span>
        <span className="mx-3">•</span>
        <span className="inline-block align-middle">{campaign.text}</span>
        <span className="mx-3">•</span>
        <span className="inline-block align-middle">{campaign.text}</span>
        <span className="mx-3">•</span>
        <span className="inline-block align-middle">{campaign.text}</span>
      </div>
    </div>
  );
} 