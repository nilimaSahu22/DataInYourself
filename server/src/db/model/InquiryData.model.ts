// Remove Mongoose imports and schema, keep only TypeScript interface
export interface IInquiryData {
  id: string
  name: string
  phoneNumber: string
  emailId: string
  subject: string
  called: boolean
  description: string
} 