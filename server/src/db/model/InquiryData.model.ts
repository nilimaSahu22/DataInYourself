import mongoose, { Schema, Document } from 'mongoose'

export interface IInquiryData extends Document {
  name: string
  phoneNumber: string
  emailId: string
  subject: string
  called: boolean
  description: string
}

const InquiryDataSchema: Schema = new Schema({
  name: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  emailId: { type: String, required: true },
  subject: { type: String, required: true },
  called: { type: Boolean, required: true, default: false },
  description: { type: String, required: true },
})

export default mongoose.model<IInquiryData>('InquiryData', InquiryDataSchema) 