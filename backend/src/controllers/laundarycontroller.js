import Laundary from "../models/laundary.js";

// Book Laundary slot
export const bookLaundarySlot = async (req, res) => {
  try {
    const { slot, date } = req.body;
    const studentId = req.user.id;

    // Check if slot is already booked for that date
    const existingBooking = await Laundary.findOne({
      slot,
      date: new Date(date),
      status: "booked",
    });

    if (existingBooking) {
      return res.status(400).json({
        success: false,
        message: "Slot already booked for this date",
      });
    }

    const Laundary = new Laundary({
      studentId,
      slot,
      date: new Date(date),
    });

    await Laundary.save();

    res.status(201).json({
      success: true,
      message: "Laundary slot booked successfully",
      data: Laundary,
    });
  } catch (error) {
    console.error("Error booking Laundary slot:", error);
    res.status(500).json({
      success: false,
      message: "Error booking Laundary slot",
    });
  }
};

// Get all Laundary bookings (admin)
export const getAllLaundaryBookings = async (req, res) => {
  try {
    const bookings = await Laundary.find()
      .populate("studentId", "name rollNo roomNo")
      .sort({ date: -1 });

    res.status(200).json({
      success: true,
      data: bookings,
    });
  } catch (error) {
    console.error("Error fetching Laundary bookings:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching Laundary bookings",
    });
  }
};

// Get Laundary bookings by student
export const getLaundaryByStudent = async (req, res) => {
  try {
    const studentId = req.user.id;
    const bookings = await Laundary.find({ studentId }).sort({ date: -1 });

    res.status(200).json({
      success: true,
      data: bookings,
    });
  } catch (error) {
    console.error("Error fetching Laundary bookings:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching Laundary bookings",
    });
  }
};

// Update Laundary status
export const updateLaundaryStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const Laundary = await Laundary.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    ).populate("studentId", "name rollNo");

    if (!Laundary) {
      return res.status(404).json({
        success: false,
        message: "Laundary booking not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Laundary status updated",
      data: Laundary,
    });
  } catch (error) {
    console.error("Error updating Laundary status:", error);
    res.status(500).json({
      success: false,
      message: "Error updating Laundary status",
    });
  }
};

// Get available slots for a date
export const getAvailableSlots = async (req, res) => {
  try {
    const { date } = req.params;
    const targetDate = new Date(date);

    const bookedSlots = await Laundary.find({
      date: targetDate,
      status: "booked",
    }).select("slot");

    const allSlots = ["morning", "evening"];
    const availableSlots = allSlots.filter(
      (slot) => !bookedSlots.some((booking) => booking.slot === slot)
    );

    res.status(200).json({
      success: true,
      data: {
        date: targetDate,
        availableSlots,
        bookedSlots: bookedSlots.map((b) => b.slot),
      },
    });
  } catch (error) {
    console.error("Error fetching available slots:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching available slots",
    });
  }
};
