import mongoose from 'mongoose';

const leaveSchema = new mongoose.Schema(
  {
    employee: {
      type: String,
      required: true,
    },

    leaveType: {
      type: String,
      required: true,
      enum: ['Casual', 'Sick', 'Annual'],
    },

    startDate: {
      type: Date,
      required: true,
    },

    endDate: {
      type: Date,
      required: true,
    },

    reason: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ['Pending', 'Approved', 'Rejected'],
      default: 'Pending',
    },
  },
  {
    timestamps: true, // createdAt & updatedAt
  }
);

const Leave = mongoose.model('Leave', leaveSchema);

export default Leave;
