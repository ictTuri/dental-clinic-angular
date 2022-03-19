export interface Appointment {
  id: number;
  dentist: string;
  patient: string;
  date: Date;
  startTime: Date;
  endTime: Date;
  feedback: string;
  type: string;
  status: string;
}
