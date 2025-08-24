# Ad Campaign System

This document describes the ad campaign system implemented for the DataInYourself website.

## Overview

The ad campaign system allows administrators to create, manage, and display promotional banners on the website. The banners appear as a single line of text that scrolls from right to left just above the header.

## Features

### Admin Dashboard
- **Create Campaigns**: Add new promotional campaigns with custom text, dates, colors, and priority
- **Edit Campaigns**: Modify existing campaigns
- **Delete Campaigns**: Remove campaigns from the system
- **Activate/Deactivate**: Toggle campaign status
- **Priority Management**: Set campaign priority (1-10, higher numbers = higher priority)
- **Date Range**: Set start and end dates for campaigns
- **Color Customization**: Choose background and text colors
- **Live Preview**: See how campaigns will appear on the website

### Public Display
- **Automatic Display**: Only active campaigns within their date range are shown
- **Priority-based Selection**: If multiple campaigns are active, the highest priority one is displayed
- **Scrolling Animation**: Text scrolls from right to left continuously
- **Responsive Design**: Works on all device sizes
- **Auto-refresh**: Campaigns are refreshed every 5 minutes

## Technical Implementation

### Backend (Server)
- **Model**: `IAdCampaign` interface in `server/src/db/model/AdCampaign.model.ts`
- **API Endpoints**:
  - `POST /admin/ad-campaigns` - Create new campaign (protected)
  - `GET /admin/ad-campaigns` - Get all campaigns (protected)
  - `GET /ad-campaigns/active` - Get active campaign for public display
  - `PATCH /admin/ad-campaigns/:id` - Update campaign (protected)
  - `DELETE /admin/ad-campaigns/:id` - Delete campaign (protected)

### Frontend (Client)
- **Admin Component**: `AdCampaignManager` in `app/components/AdCampaignManager.tsx`
- **Display Component**: `AdBanner` in `app/components/ui/AdBanner.tsx`
- **Integration**: Added to admin dashboard with tab navigation
- **Styling**: Custom CSS animations for scrolling text

### Database Storage
- Uses Cloudflare KV for storage
- Key format: `ad-campaign:{id}`
- JSON serialization of campaign objects

## Usage

### Creating a Campaign
1. Log in to the admin dashboard
2. Navigate to the "Ad Campaigns" tab
3. Click "Create Campaign"
4. Fill in the required fields:
   - **Campaign Text**: The message to display
   - **Start Date**: When the campaign should begin
   - **End Date**: When the campaign should end
   - **Priority**: Campaign priority (1-10)
   - **Background Color**: Banner background color
   - **Text Color**: Text color for the banner
5. Click "Create Campaign"

### Managing Campaigns
- **Edit**: Click the "Edit" button to modify campaign details
- **Activate/Deactivate**: Toggle campaign status with the respective button
- **Delete**: Remove campaigns with the "Delete" button
- **Preview**: See how campaigns will appear in the preview section

### Campaign Status
- **Active**: Campaign is enabled and will display if within date range
- **Inactive**: Campaign is disabled and won't display
- **Live**: Campaign is currently being displayed (active + within date range)

## Configuration

### Environment Variables
- `NEXT_PUBLIC_SERVER_URL`: Server URL for API calls

### CSS Animations
The scrolling animation is defined in `app/styles/globals.css`:
```css
@keyframes scrollText {
  0% { transform: translateX(100%); }
  100% { transform: translateX(-100%); }
}

.animate-scroll-text {
  animation: scrollText 20s linear infinite;
  display: inline-block;
}
```

## Security
- All admin endpoints require JWT authentication
- Public endpoint (`/ad-campaigns/active`) is open for banner display
- Campaign data is validated on both client and server

## Future Enhancements
- Click tracking for campaigns
- A/B testing capabilities
- Scheduled campaigns
- Rich media support (images, links)
- Analytics dashboard
- Campaign templates 