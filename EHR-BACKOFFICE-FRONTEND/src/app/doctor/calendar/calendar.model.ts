import { formatDate } from '@angular/common';
import { Patient } from '../patient/patient.model';
import { Service } from 'app/admin/structure/service/service.model';
import { Staff } from 'app/admin/staffs/staffs.model';
import { CategoryAppoint } from 'app/admin/appointmentAdmin/appointment.enum';
export class Calendar {
  id: string;
  title: string;
  category: string;
  startDate: Date;
  endDate: Date;
  details: string;
  staff:Staff;
  patient:Patient;
  categoryAppoint: CategoryAppoint;
  service: Service


  /*constructor(calendar: Calendar) {
    {
      this.id = calendar.id || '';
      this.title = calendar.title || '';
      this.category = calendar.category || '';
      this.startDate = formatDate(new Date(), 'yyyy-MM-dd', 'en') || '';
      this.endDate = formatDate(new Date(), 'yyyy-MM-dd', 'en') || '';
      this.details = calendar.details || '';
    }
  }*/
  public getRandomID(): number {
    const S4 = () => {
      return ((1 + Math.random()) * 0x10000) | 0;
    };
    return S4() + S4();
  }
}
