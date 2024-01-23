import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StaffGroupChildComponent } from './staff-group/staff-group-child/staff-group-child.component';

const routes: Routes = [
  {
    path: 'file',
    loadChildren: () =>
      import('./file/file.module').then((m) => m.FileModule),
  },
  {
    path: 'doctemplate',
    loadChildren: () =>
      import('./doctemplate/document.module').then((m) => m.DocumentModule),
  },

  {
    path: 'diseaseCode',
    loadChildren: () =>
      import('./diseaseCode/disease-code.module').then((m) => m.DiseaseCodeModule),
  },
  {
    path: 'bio-analyses',
    loadChildren: () =>
      import('./bio-analyses/bio-analyses.module').then((m) => m.BioAnalysesModule),
  },
  {
    path: 'vaccination',
    loadChildren: () =>
      import('./vaccination/vaccination.module').then((m) => m.VaccinationModule),
  },
  {
    path: 'allergy',
    loadChildren: () =>
      import('./allergy/allergy.module').then((m) => m.AllergyModule),
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
  {
    path: 'appointment',
    loadChildren: () =>
      import('./appointment/appointment.module').then(
        (m) => m.AppointmentModule
      ),
  },
  {
    path: 'medications',
    loadChildren: () =>
    import('./medications/medications.module').then((m) => m.MedcationsModule
    )
  },
  {
    path: 'categories',
    loadChildren: () =>
    import('./categories/categories.module').then((m) => m.CategoriesModule)
  },



  //all-physicalTreatments
  {
    path: 'physicalTreatments',
    loadChildren: () =>
    import('./physicalTreatments/physicalTreatments.module').then((m) => m.physicalTreatmentsModule)
  },
  {
    path: 'doctors',
    loadChildren: () =>
      import('./doctors/doctors.module').then((m) => m.DoctorsModule),
  },
  {
    path: 'staff',
    loadChildren: () =>
      import('./staff/staff.module').then((m) => m.StaffModule),
  },
  {
    path: 'patients',
    loadChildren: () =>
      import('./patients/patients.module').then((m) => m.PatientsModule),
  },
  {
    path: 'billing',
    loadChildren: () =>
      import('./billing/billing.module').then((m) => m.BillingModule),
  },
  {
    path: 'room',
    loadChildren: () => import('./room/room.module').then((m) => m.RoomModule),
  },
  {
    path: 'departments',
    loadChildren: () =>
      import('./departments/departments.module').then(
        (m) => m.DepartmentsModule
      ),
  },
  {
    path: 'inventory',
    loadChildren: () =>
      import('./inventory/inventory.module').then((m) => m.InventoryModule),
  },
  {
    path: 'records',
    loadChildren: () =>
      import('./records/records.module').then((m) => m.RecordsModule),
  },
  {
    path: 'ambulance',
    loadChildren: () =>
      import('./ambulance/ambulance.module').then((m) => m.AmbulanceModule),
  },
  {
    path: 'pharmacy',
    loadChildren: () =>
      import('./pharmacy/pharmacy.module').then((m) => m.PharmacyModule),
  },
  {
    path: 'structure',
    loadChildren: () =>
      import('./structure/structure.module').then((m) => m.StructureModule),
  },
  {
    path: 'equipment',
    loadChildren: () =>
    import('./structure/material-resource/equipment/equipment.module').then((m) => m.EquipmentsModule),

  },
  {
    path: 'insurances',
    loadChildren: () =>
      import('./insurances/ins-list/insurances.module').then((m) => m.InsuranceModule),
  },
{
  path: 'staffs',
  loadChildren: () =>
  import('./staffs/staffs.module').then((m) => m.StaffsModule)
},
{
  path: 'staffGroup',
  loadChildren: () =>
  import('./staff-group/staff-group.module').then((m) => m.StaffGroupModule)
},
/*{
path: 'patient',
loadChildren: () =>
import('./patient/patient.module').then((m) => m.PatientsModule)
},*/
{
  path: 'child',
  component: StaffGroupChildComponent,

},
/*{
  path: 'calendar',
  loadChildren: () =>
  import('./calendar/calendar.module').then((m) => m.CalendarsModule)
  },
  {
    path: 'availability',
    loadChildren: () =>
    import('./availability/availability.module').then((m) => m.AvailabilityModule)
  },*/
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
