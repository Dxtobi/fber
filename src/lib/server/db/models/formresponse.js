import mongoose from 'mongoose';


const FormResponseSchema = new mongoose.Schema({
  response: {
    type: [Object], 
    required: true
  },
  form: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'form',
      required: true,
    },
  createdAt: { type: Date, default: Date.now }
},{
    timestamps: true,
  });

export const FormResponseModel = mongoose.models.FormResponseModel ?? mongoose.model('FormResponse', FormResponseSchema);
