import mongoose from 'mongoose';

const StatusEnum = {
  PENDING: { value: 1, label: 'Pending' },
  IN_PROGRESS: { value: 2, label: 'In Progress' },
  COMPLETED: { value: 3, label: 'Completed' },
  CANCELLED: { value: 4, label: 'Cancelled' },
};

const StatusValues = Object.values(StatusEnum).map(status => status.value);
const StatusLabels = Object.fromEntries(
  Object.entries(StatusEnum).map(([key, { value, label }]) => [value, label])
);

const TodoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  completed: { type: Boolean, default: false },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  status: {
    type: Number,
    enum: StatusValues, 
    default: StatusEnum.PENDING.value, 
    get: function (value) {
      return StatusLabels[value];
    },
  },
});

TodoSchema.set('toJSON', { getters: true, virtuals: false });

export default mongoose.model('Todo', TodoSchema);
