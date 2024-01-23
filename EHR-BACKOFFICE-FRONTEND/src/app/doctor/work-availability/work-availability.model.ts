import { Time } from "@angular/common";
import { Staff } from "app/admin/staffs/staffs.model";



export interface WorkAvailability {
  id: number;
  startDate: Date;
  endDate: Date;
  startTime: String;
  endTime: String;
}
