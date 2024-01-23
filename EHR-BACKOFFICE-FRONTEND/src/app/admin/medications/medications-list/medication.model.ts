import { formatDate } from '@angular/common';
import { ActiveIngredient } from 'app/admin/activeIngredients/active-ingredients-list/activeIngredient.model';
export interface Medication {
  medication_Key: number;
  code: string;
  name: string;
  dosageForm: string;
  type: string;
  force: number;
  activeIngredients: ActiveIngredient[];
}
