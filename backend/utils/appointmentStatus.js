const Appointment = require('../model/appointmentModel');

const updateAppointmentStatus = async () => {
  try {
    const currentDate = new Date();
    const currentDateStr = currentDate.toISOString().split('T')[0];
    const currentTimeStr = currentDate.toTimeString().slice(0, 5);

    // Find and update appointments that have passed their scheduled time
    const result = await Appointment.updateMany(
      {
        status: 'pending',
        $or: [
          { date: { $lt: currentDateStr } },
          {
            date: currentDateStr,
            time: { $lt: currentTimeStr }
          }
        ]
      },
      { $set: { status: 'completed' } }
    );

    if (result.modifiedCount > 0) {
      console.log(`Updated ${result.modifiedCount} appointments to completed status`);
    }

    return result.modifiedCount;
  } catch (error) {
    console.error('Error updating appointment statuses:', error);
    throw error;
  }
};

module.exports = { updateAppointmentStatus }; 