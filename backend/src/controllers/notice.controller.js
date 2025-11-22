import Notice from "../models/notice.js";

// Create new notice (admin only)
export const createNotice = async (req, res) => {
  try {
    const { title, content } = req.body;

    const notice = new Notice({
      title,
      content,
    });

    await notice.save();

    res.status(201).json({
      success: true,
      message: "Notice created successfully",
      data: notice,
    });
  } catch (error) {
    console.error("Error creating notice:", error);
    res.status(500).json({
      success: false,
      message: "Error creating notice",
    });
  }
};

// Get all notices
export const getAllNotices = async (req, res) => {
  try {
    const notices = await Notice.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: notices,
    });
  } catch (error) {
    console.error("Error fetching notices:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching notices",
    });
  }
};

// Get recent notices (last 10)
export const getRecentNotices = async (req, res) => {
  try {
    const notices = await Notice.find().sort({ createdAt: -1 }).limit(10);

    res.status(200).json({
      success: true,
      data: notices,
    });
  } catch (error) {
    console.error("Error fetching recent notices:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching recent notices",
    });
  }
};

// Update notice (admin only)
export const updateNotice = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;

    const notice = await Notice.findByIdAndUpdate(
      id,
      { title, content },
      { new: true, runValidators: true }
    );

    if (!notice) {
      return res.status(404).json({
        success: false,
        message: "Notice not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Notice updated successfully",
      data: notice,
    });
  } catch (error) {
    console.error("Error updating notice:", error);
    res.status(500).json({
      success: false,
      message: "Error updating notice",
    });
  }
};

// Delete notice (admin only)
export const deleteNotice = async (req, res) => {
  try {
    const { id } = req.params;
    const notice = await Notice.findByIdAndDelete(id);

    if (!notice) {
      return res.status(404).json({
        success: false,
        message: "Notice not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Notice deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting notice:", error);
    res.status(500).json({
      success: false,
      message: "Error deleting notice",
    });
  }
};
