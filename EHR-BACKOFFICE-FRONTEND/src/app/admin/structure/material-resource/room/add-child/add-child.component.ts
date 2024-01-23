import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Equipment } from '../../equipment/equipment.model';
import { EquipmentService } from '../../equipment/equipment.service';
import { RoomService } from '../room.service';

@Component({
  selector: 'app-add-child',
  templateUrl: './add-child.component.html',
  styleUrls: ['./add-child.component.scss']
})
export class AddChildComponent {
  childForm!: FormGroup;
  dialogTitle: string;
  equipments: Equipment[];
  Equipments: Equipment[]=[];
  roomKy: number;

  fixedEquipments: Equipment[] = [];
  mobileEquipments: Equipment[] = [];

  constructor(
    public dialogRef: MatDialogRef<AddChildComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
  private equipmentService: EquipmentService,
  private roomService: RoomService
  ) {
    this.equipments = data.equipments;
    this.roomKy = data.room.roomKy;
    console.log(this.data);
  }

  ngOnInit(): void {
    this.buildForm();
    this.loadEquip();

    this.getFixedEquipments();
    this.getMobileEquipments();
  }

  buildForm(): void {
    this.childForm = this.formBuilder.group({
      equipment: []
    });
  }
  loadEquip() {



  }

  confirmAddChild(): void{
    if (this.childForm && this.childForm.valid) {
      const selectedEquipments = this.childForm.get('equipment')?.value;;

      console.log('Selected Equipments:', selectedEquipments);

      this.roomService.assignEquipmentsToRoom(this.roomKy,selectedEquipments).subscribe(
        (response) => {
          this.dialogRef.close(1);
        },
        (error) => {
          console.error('Error adding service area :', error);
        }
      );
  }
  }

  onNoClick(): void {
    this.dialogRef.close(); // Close the dialog without adding equipment
  }

  getFixedEquipments(): void {
    this.equipmentService.getAllEquipments().subscribe(
      (data: Equipment[]) => {
        // Filter equipment with a specific type (replace 'desiredType' with your actual type)
        this.fixedEquipments = data.filter(equipment => equipment.typeFM === 'fixed' && equipment.room == null);
      },
      error => {
        console.error('Error fetching services', error);
      }
    );
  }


  getMobileEquipments(): void {
    this.equipmentService.getAllEquipments().subscribe(
      (data: Equipment[]) => {
        // Filter equipment with a specific type ('mobile') and a room with a different roomKy
        this.mobileEquipments = data.filter(equipment => {
          return equipment.typeFM === 'mobile' && (!equipment.room || equipment.room.roomKy !== this.roomKy);
        });
      },
      error => {
        console.error('Error fetching services', error);
      }
    );
  }
}

