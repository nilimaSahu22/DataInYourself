export interface IAdCampaign {
  id: string
  text: string
  isActive: boolean
  startDate: string
  endDate: string
  createdAt: string
  updatedAt: string
  createdBy: string
  priority: number // Higher number = higher priority
  backgroundColor?: string
  textColor?: string
} 