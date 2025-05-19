import mongoose from 'mongoose';


const formResponseSchema = new mongoose.Schema({
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

export default mongoose.model('formResponse', formResponseSchema);