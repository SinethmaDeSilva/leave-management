import express from 'express';
import {
  createLeave,
  getAllLeaves,
  getLeaveById,
  updateLeave,
  deleteLeave,
  getLeavesByEmployee,
  getLeavesByStatus,
  countLeavesByEmployee,
} from '../controllers/leaveController.js';

const router = express.Router();

// Create leave
router.post('/', createLeave);

// Get all leaves
router.get('/', getAllLeaves);

// Get leave by ID
router.get('/:id', getLeaveById);

// Update leave (approve/reject/edit)
router.put('/:id', updateLeave);

// Delete leave
router.delete('/:id', deleteLeave);

// Get leaves by employee
router.get('/employee/:employeeId', getLeavesByEmployee);

// Get leaves by status
router.get('/status/:status', getLeavesByStatus);

// Count leaves by employee
router.get('/count/:employeeId', countLeavesByEmployee);

export default router;
