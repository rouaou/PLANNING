import { Component, Inject, OnInit } from '@angular/core';
import { SymptomsService } from './symptoms.service';
import { SymptomsList } from './symptoms.model';



@Component({
  selector: 'app-symptoms-add-edit',
  templateUrl: './symptoms-add-edit.component.html',
  styleUrls: ['./symptoms-add-edit.component.scss']
})
export class SymptomsAddEditComponent{
  symptomList: SymptomsList[] = [];
  symptomsValues : string[] = [];
  constructor(private symptomsService: SymptomsService){

  }
  getSymptoms(): void {
    this.symptomsService.getAllSymptoms().subscribe((data) =>
    console.log(data));
  }
 ngOnInit(): void {
   this.getSymptoms();
 }

 loadSymptoms(){
  this.symptomsService.getAllSymptoms().subscribe((response) => {

  })
 }

}


