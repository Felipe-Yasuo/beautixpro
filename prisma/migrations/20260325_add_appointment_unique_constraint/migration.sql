-- AddUniqueConstraint
CREATE UNIQUE INDEX "Appointment_employeeId_time_appointmentDate_key" ON "Appointment"("employeeId", "time", "appointmentDate");
