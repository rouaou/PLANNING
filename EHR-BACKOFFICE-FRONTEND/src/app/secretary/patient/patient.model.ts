import { User } from "app/admin/user.model";

export interface Patient extends User {
  email:String;
  phoneNumber:Number;
}
