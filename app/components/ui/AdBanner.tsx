"use client";
import { useState, useEffect } from "react";

interface AdCampaign {
  id: string;
  text: string;
  backgroundColor: string;
  textColor: string;
}

export default function AdBanner() {
  const [campaign, setCampaign] = useState<AdCampaign | null>(null);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || "https://server.mukulsharma1602.workers.dev";

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const fetchActiveCampaign = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${serverUrl}/ad-campaigns/active`);
        
        if (response.ok) {
          const data = await response.json();
          setCampaign(data.campaign);
        }
      } catch (error) {
        console.error("Failed to fetch active campaign:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchActiveCampaign();

    // Refresh campaign every 5 minutes
    const interval = setInterval(fetchActiveCampaign, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, [serverUrl, mounted]);

  // Don't render anything during SSR or if no active campaign
  if (!mounted || loading || !campaign) {
    return null;
  }

  return (
    <div 
      className="w-full py-2 px-4 overflow-hidden relative"
      style={{
        backgroundColor: campaign.backgroundColor,
        color: campaign.textColor,
      }}
    >
      <div className="animate-scroll-text whitespace-nowrap text-center font-medium text-sm sm:text-base">
        {campaign.text}
      </div>
    </div>
  );
} 