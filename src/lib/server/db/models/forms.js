import mongoose from 'mongoose';


const carSchema = new mongoose.Schema({
  
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('formSchema', carSchema);