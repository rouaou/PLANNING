import { StaffGroup } from "../staff-group/staff-group.model";
import { Staff } from "../staffs/staffs.model";

export interface StaffGroupLink {
  staffGrpLinkKy: number;
  staffGroup: StaffGroup;
  staff: Staff;
}
