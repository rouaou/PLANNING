import { SymptomsList } from "./symptoms-add-edit/symptoms.model";

export interface AllergyList {
  isSelected: any;
  allergy_Key: number;
  algTyp: String;
  algSym: SymptomsList[];
  algNm: string;
  algGrv: string;
  algDesc: string;
  allergyRcrdSts: number;

}
