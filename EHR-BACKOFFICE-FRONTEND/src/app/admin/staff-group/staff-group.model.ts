import { StaffGroupLink } from "../staff-group-link/staff-group-link.model";
import { Service } from "../structure/service/service.model";
import { StaffGroupType } from "./staff-group.enum";


export interface StaffGroup {
  stgrpKey: number;
  groupName: string;
  type: StaffGroupType;
  privilege: number;
  staffGrpLinks: StaffGroupLink[];
  service:Service
}

