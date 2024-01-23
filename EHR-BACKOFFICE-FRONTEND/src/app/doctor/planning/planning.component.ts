// Import the necessary modules and components
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { StaffsService } from 'app/admin/staffs/staffs.service';
import { WorkAvailabilityService } from '../work-availability/work-availability.service';

// Define the component
@Component({
  selector: 'app-planning',
  templateUrl: './planning.component.html',
  styleUrls: ['./planning.component.scss']
})
export class PlanningComponent {

  days: string [] = ['Monday','Tuesday','Wednesday','Thuesday','Friday','Saturday','Sunday'];
  staffId: number;
  availabilityData: any[];
  constructor(
    private formBuilder: FormBuilder,
    private staffsService: StaffsService,
    private router: Router,
    private snackBar: MatSnackBar,
    private availService:WorkAvailabilityService,
    private route: ActivatedRoute



    ) {}
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      // Access the ID from the URL
      this.staffId = +params.get('userKy');
      console.log('Current URL ID:', this.staffId);
    });

    this.availService.getAvailabilityForStaff(this.staffId).subscribe(
      (availability) => {
        this.availabilityData = availability;
        console.log('Availabilities:', this.availabilityData);
      },
      (error) => {
        console.error('Error fetching availability', error);
      }
    );
  }
}
