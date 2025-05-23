import mongoose from 'mongoose';


const FormSchema = new mongoose.Schema({
  components: {
    type: [Object], 
    required: true
  },
  description: {
    type: String,
  },
  user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  link:{
      type:String
  },
  formName:{
      type:String,
      required:true
  },

  status:{
      type:String,
      enum: ['draft', 'published', 'archived', 'deleted'],
      default: 'draft'
  },
  createdAt: { type: Date, default: Date.now }
},{
    timestamps: true,
  });
export const FormModel = mongoose.models.Form ?? mongoose.model('Form', FormSchema);