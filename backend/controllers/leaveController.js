import Leave from '../models/leave.js';

// 1. Create a new leave request
export const createLeave = async (req, res) => {
  try {
    const leave = new Leave(req.body);
    await leave.save();
    res.status(201).json({ success: true, leave });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// 2. Get all leaves
export const getAllLeaves = async (req, res) => {
  try {
    const leaves = await Leave.find();
    res.status(200).json({ success: true, leaves });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 3. Get leave by ID
export const getLeaveById = async (req, res) => {
  try {
    const leave = await Leave.findById(req.params.id);
    if (!leave)
      return res
        .status(404)
        .json({ success: false, message: 'Leave not found' });

    res.status(200).json({ success: true, leave });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 4. Update leave
export const updateLeave = async (req, res) => {
  try {
    const leave = await Leave.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!leave)
      return res
        .status(404)
        .json({ success: false, message: 'Leave not found' });

    res.status(200).json({ success: true, leave });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// 5. Delete leave
export const deleteLeave = async (req, res) => {
  try {
    const leave = await Leave.findByIdAndDelete(req.params.id);
    if (!leave)
      return res
        .status(404)
        .json({ success: false, message: 'Leave not found' });

    res
      .status(200)
      .json({ success: true, message: 'Leave deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 6. Get leaves by employee
export const getLeavesByEmployee = async (req, res) => {
  try {
    const leaves = await Leave.find({ employeeId: req.params.employeeId });
    res.status(200).json({ success: true, leaves });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 7. Get leaves by status
export const getLeavesByStatus = async (req, res) => {
  try {
    const leaves = await Leave.find({ status: req.params.status });
    res.status(200).json({ success: true, leaves });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 8. Count leaves by employee
export const countLeavesByEmployee = async (req, res) => {
  try {
    const count = await Leave.countDocuments({
      employeeId: req.params.employeeId,
    });

    res.status(200).json({
      success: true,
      employeeId: req.params.employeeId,
      count,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
