// controllers/leaveController.js
const Leave = require('../models/leave.js');

// 1. Create a new leave request
exports.createLeave = async (req, res) => {
  try {
    const leave = new Leave(req.body);
    await leave.save();
    res.status(201).json({ success: true, leave });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// 2. Get all leaves
exports.getAllLeaves = async (req, res) => {
  try {
    const leaves = await Leave.find();
    res.status(200).json({ success: true, leaves });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 3. Get leave by ID
exports.getLeaveById = async (req, res) => {
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

// 4. Update leave (approve/reject or edit)
exports.updateLeave = async (req, res) => {
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
exports.deleteLeave = async (req, res) => {
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

// 6. Get leaves by employee ID
exports.getLeavesByEmployee = async (req, res) => {
  try {
    const leaves = await Leave.find({ employeeId: req.params.employeeId });
    res.status(200).json({ success: true, leaves });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 7. Get leaves by status (pending, approved, rejected)
exports.getLeavesByStatus = async (req, res) => {
  try {
    const leaves = await Leave.find({ status: req.params.status });
    res.status(200).json({ success: true, leaves });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 8. Count leaves by employee
exports.countLeavesByEmployee = async (req, res) => {
  try {
    const count = await Leave.countDocuments({
      employeeId: req.params.employeeId,
    });
    res
      .status(200)
      .json({ success: true, employeeId: req.params.employeeId, count });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
