import { StaffGroupLink } from "../staff-group-link/staff-group-link.model";
import { User } from "../user.model";


export interface Staff extends User {
  professionalEmail :String;
  identifier :String;
  initials :String;
  signature :String;
  color:String;
  staffGrpLinks: StaffGroupLink[];
  ischeked?: boolean;
  phoneNumber:Number;
  speciality:String;
  typeStaff: String;
  adresse: String;
  password:String;

}
