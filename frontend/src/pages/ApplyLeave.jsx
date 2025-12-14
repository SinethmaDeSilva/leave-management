import { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';

export default function ApplyLeave({ addLeave }) {
  const [formData, setFormData] = useState({
    leaveType: '',
    startDate: '',
    endDate: '',
    reason: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Get employee name from localStorage (fallback to 'N/A')
  const employeeName = localStorage.getItem('employeeName') || 'N/A';

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const newErrors = {};
    if (!formData.leaveType) newErrors.leaveType = 'Please select a leave type';
    if (!formData.startDate) newErrors.startDate = 'Start date is required';
    if (!formData.endDate) newErrors.endDate = 'End date is required';
    if (!formData.reason) newErrors.reason = 'Reason is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await axios.post('http://localhost:5000/api/leaves', {
        employee: employeeName,
        leaveType: formData.leaveType,
        startDate: formData.startDate,
        endDate: formData.endDate,
        reason: formData.reason,
        status: 'Pending',
      });

      // Optional: sync frontend state with DB response
      addLeave(response.data.leave);

      toast.success('Leave request submitted successfully!');

      setFormData({
        leaveType: '',
        startDate: '',
        endDate: '',
        reason: '',
      });
      setErrors({});
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message || 'Failed to submit leave request'
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className='text-gray-900 bg-white min-h-screen p-6'>
      <h1 className='text-2xl font-bold mb-6 text-purple-600'>Apply Leave</h1>

      <form
        onSubmit={handleSubmit}
        className='space-y-6 bg-gray-100 p-6 rounded-xl max-w-xl shadow'
      >
        {/* Leave Type */}
        <div>
          <label className='block font-semibold mb-2 text-gray-700'>
            Leave Type
          </label>
          <select
            name='leaveType'
            value={formData.leaveType}
            onChange={handleChange}
            className='w-full p-3 bg-white border border-gray-300 rounded-lg outline-none focus:ring focus:ring-purple-400'
          >
            <option value=''>Select leave type</option>
            <option value='Casual'>Casual Leave</option>
            <option value='Sick'>Sick Leave</option>
            <option value='Annual'>Annual Leave</option>
          </select>
          {errors.leaveType && (
            <p className='text-red-500 text-sm mt-1'>{errors.leaveType}</p>
          )}
        </div>

        {/* Start Date */}
        <div>
          <label className='block font-semibold mb-2 text-gray-700'>
            Start Date
          </label>
          <input
            type='date'
            name='startDate'
            value={formData.startDate}
            onChange={handleChange}
            className='w-full p-3 bg-white border border-gray-300 rounded-lg outline-none focus:ring focus:ring-purple-400'
          />
          {errors.startDate && (
            <p className='text-red-500 text-sm mt-1'>{errors.startDate}</p>
          )}
        </div>

        {/* End Date */}
        <div>
          <label className='block font-semibold mb-2 text-gray-700'>
            End Date
          </label>
          <input
            type='date'
            name='endDate'
            value={formData.endDate}
            onChange={handleChange}
            className='w-full p-3 bg-white border border-gray-300 rounded-lg outline-none focus:ring focus:ring-purple-400'
          />
          {errors.endDate && (
            <p className='text-red-500 text-sm mt-1'>{errors.endDate}</p>
          )}
        </div>

        {/* Reason */}
        <div>
          <label className='block font-semibold mb-2 text-gray-700'>
            Reason
          </label>
          <textarea
            name='reason'
            value={formData.reason}
            onChange={handleChange}
            className='w-full p-3 bg-white border border-gray-300 rounded-lg outline-none focus:ring focus:ring-purple-400 h-24'
          ></textarea>
          {errors.reason && (
            <p className='text-red-500 text-sm mt-1'>{errors.reason}</p>
          )}
        </div>

        <button
          type='submit'
          className='w-full bg-purple-600 hover:bg-purple-700 py-3 rounded-lg font-semibold transition'
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Leave Request'}
        </button>
      </form>
    </div>
  );
}
