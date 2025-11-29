import { axiosInstance } from "./axios";

export const login = async (credentials) => {
  const response = await axiosInstance.post("/auth/login", credentials);
  if (response.data.token) {
    localStorage.setItem("token", response.data.token);
  }
  return response.data;
};

export const register = async (userData) => {
  const response = await axiosInstance.post("/auth/register", userData);
  return response.data;
};

export const getAuthUser = async () => {
  try {
    const res = await axiosInstance.get("/auth/me");
    return res.data.user || res.data;
  } catch (error) {
    console.log("Error in getAuthUser:", error);
    return null;
  }
};

export const logout = async () => {
  const response = await axiosInstance.post("/auth/logout");
  return response.data;
};

export const getStudents = async () => {
  const response = await axiosInstance.get("/students");
  return response.data.data || response.data;
};

export const createStudent = async (studentData) => {
  const response = await axiosInstance.post("/students", studentData);
  return response.data;
};

export const updateStudent = async (id, studentData) => {
  const response = await axiosInstance.put(`/students/${id}`, studentData);
  return response.data;
};

export const deleteStudent = async (id) => {
  const response = await axiosInstance.delete(`/students/${id}`);
  return response.data;
};

export const markAttendance = async (attendanceData) => {
  const response = await axiosInstance.post("/attendance", attendanceData);
  return response.data;
};

export const getAttendance = async () => {
  const response = await axiosInstance.get("/attendance");
  return response.data.data || response.data;
};

export const getStudentAttendance = async (studentId) => {
  const response = await axiosInstance.get(`/attendance/student/${studentId}`);
  return response.data;
};

export const getMyAttendance = async () => {
  const response = await axiosInstance.get("/attendance/my");
  return response.data.data || response.data;
};

export const createComplaint = async (complaintData) => {
  const response = await axiosInstance.post("/complaints", complaintData);
  return response.data;
};

export const getComplaints = async () => {
  const response = await axiosInstance.get("/complaints");
  return response.data;
};

export const getMyComplaints = async () => {
  const response = await axiosInstance.get("/complaints/my");
  return response.data;
};

export const updateComplaintStatus = async (id, status) => {
  const response = await axiosInstance.put(`/complaints/${id}/status`, {
    status,
  });
  return response.data;
};

export const applyLeave = async (leaveData) => {
  const response = await axiosInstance.post("/leaves", leaveData);
  return response.data;
};

export const getLeaveRequests = async () => {
  const response = await axiosInstance.get("/leaves");
  return response.data;
};

export const getMyLeaves = async () => {
  const response = await axiosInstance.get("/leaves/my");
  return response.data.data || response.data;
};

export const updateLeaveStatus = async (id, status) => {
  const response = await axiosInstance.put(`/leaves/${id}/status`, { status });
  return response.data;
};

export const bookLaundrySlot = async (laundryData) => {
  const response = await axiosInstance.post("/laundry", laundryData);
  return response.data;
};

export const getLaundryBookings = async () => {
  const response = await axiosInstance.get("/laundry");
  return response.data;
};

export const getMyLaundryBookings = async () => {
  const response = await axiosInstance.get("/laundry/my");
  return response.data;
};

export const getAvailableSlots = async (date) => {
  const response = await axiosInstance.get(`/laundry/available/${date}`);
  return response.data;
};

export const createNotice = async (noticeData) => {
  const response = await axiosInstance.post("/notices", noticeData);
  return response.data;
};

export const getNotices = async () => {
  const response = await axiosInstance.get("/notices");
  return response.data;
};

export const getRecentNotices = async () => {
  const response = await axiosInstance.get("/notices/recent");
  return response.data.data || response.data;
};

export const updateNotice = async (id, noticeData) => {
  const response = await axiosInstance.put(`/notices/${id}`, noticeData);
  return response.data;
};

export const deleteNotice = async (id) => {
  const response = await axiosInstance.delete(`/notices/${id}`);
  return response.data;
};
