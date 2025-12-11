import { useState } from "react";

export default function ApplyLeave({ myLeaves, setMyLeaves }) {
  const [formData, setFormData] = useState({
    leaveType: "",
    startDate: "",
    endDate: "",
    reason: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    // Frontend validation
    const newErrors = {};
    if (!formData.leaveType) newErrors.leaveType = "Please select a leave type";
    if (!formData.startDate) newErrors.startDate = "Start date is required";
    if (!formData.endDate) newErrors.endDate = "End date is required";
    if (!formData.reason) newErrors.reason = "Reason is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return; // Stop submission if errors exist
    }

    setIsSubmitting(true);

    // For now, log and add to state (simulate backend)
    console.log("Form submitted:", formData);

    // Add new leave to MyLeaves
    setMyLeaves([
      ...myLeaves,
      { ...formData, id: Date.now(), status: "Pending" },
    ]);

    // Reset form
    setFormData({ leaveType: "", startDate: "", endDate: "", reason: "" });
    setErrors({});
    setIsSubmitting(false);
  }

  return (
    <div className="text-gray-900 bg-white min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-6 text-purple-600">Apply Leave</h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-gray-100 p-6 rounded-xl max-w-xl shadow"
      >
        {/* Leave Type */}
        <div>
          <label className="block font-semibold mb-2 text-gray-700">
            Leave Type
          </label>
          <select
            name="leaveType"
            value={formData.leaveType}
            onChange={handleChange}
            className="w-full p-3 bg-white border border-gray-300 rounded-lg outline-none focus:ring focus:ring-purple-400"
          >
            <option value="">Select leave type</option>
            <option value="Casual">Casual Leave</option>
            <option value="Sick">Sick Leave</option>
            <option value="Annual">Annual Leave</option>
          </select>
          {errors.leaveType && (
            <p className="text-red-500 text-sm mt-1">{errors.leaveType}</p>
          )}
        </div>

        {/* Start Date */}
        <div>
          <label className="block font-semibold mb-2 text-gray-700">
            Start Date
          </label>
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            className="w-full p-3 bg-white border border-gray-300 rounded-lg outline-none focus:ring focus:ring-purple-400"
          />
          {errors.startDate && (
            <p className="text-red-500 text-sm mt-1">{errors.startDate}</p>
          )}
        </div>

        {/* End Date */}
        <div>
          <label className="block font-semibold mb-2 text-gray-700">
            End Date
          </label>
          <input
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            className="w-full p-3 bg-white border border-gray-300 rounded-lg outline-none focus:ring focus:ring-purple-400"
          />
          {errors.endDate && (
            <p className="text-red-500 text-sm mt-1">{errors.endDate}</p>
          )}
        </div>

        {/* Reason */}
        <div>
          <label className="block font-semibold mb-2 text-gray-700">Reason</label>
          <textarea
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            className="w-full p-3 bg-white border border-gray-300 rounded-lg outline-none focus:ring focus:ring-purple-400 h-24"
          ></textarea>
          {errors.reason && (
            <p className="text-red-500 text-sm mt-1">{errors.reason}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-purple-600 hover:bg-purple-700 py-3 rounded-lg font-semibold transition"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit Leave Request"}
        </button>
      </form>
    </div>
  );
}
