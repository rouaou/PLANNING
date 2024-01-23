import { CategoryAppoint } from "./appointment.enum";
import { Staff } from "../staffs/staffs.model";
import { Patient } from "../patient/patient.model";
import { Service } from "../structure/service/service.model";
import { Equipment } from "../structure/material-resource/equipment/equipment.model";

export interface Appointment {
  message: any;
  id: number;
  staff:Staff;
  patient:Patient ;
  startDate: Date;
  endDate: Date;
  details: string;
  categoryAppoint:CategoryAppoint;
  title:String;
  equipment:Equipment;
  status: number;
  service: Service


}

