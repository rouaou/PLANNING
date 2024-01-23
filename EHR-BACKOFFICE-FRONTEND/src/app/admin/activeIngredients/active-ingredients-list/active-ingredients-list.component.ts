import { Component, OnInit } from '@angular/core';
import { ActiveIngredientService } from './activeIngredientsService';
@Component({
  selector: 'app-active-ingredients-list',
  templateUrl: './active-ingredients-list.component.html',
  styleUrls: ['./active-ingredients-list.component.scss']
})
export class ActiveIngredientsListComponent implements OnInit {

  constructor(private activeIngredientService: ActiveIngredientService){

  }
  getActiveIngredients(): void {
    this.activeIngredientService.getAllActiveIngredients().subscribe((data) =>
    console.log(data));
  }
 ngOnInit(): void {
   this.getActiveIngredients();
 }

}
