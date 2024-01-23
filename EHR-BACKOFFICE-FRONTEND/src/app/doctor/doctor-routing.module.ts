import { Page404Component } from './../authentication/page404/page404.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppointmentsComponent } from './appointments/appointments.component';
import { DoctorsComponent } from './doctors/doctors.component';
import { PatientsComponent } from './patients/patients.component';
import { SettingsComponent } from './settings/settings.component';
import { Dashboard2Component } from 'app/admin/dashboard/dashboard2/dashboard2.component';
import { RequestComponent } from './request/request.component';


const routes: Routes = [
   {
    path: 'dashboard',
     component: DashboardComponent,
   },
  // {
  //   path: 'dashboard',
  //   loadChildren: () =>
  //     import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
  // },
  {
    path: 'appointments',
    component: AppointmentsComponent,
  },


  {
    path: 'doctors',
    component: DoctorsComponent,
  },
  {
    path: 'requests',
    component: RequestComponent,
  },
  {
    path: 'patients',
    component: PatientsComponent,
  },
  {
    path: 'work-availability',
    loadChildren: () =>
      import('./work-availability/work-availability.module').then((m) => m.AvailModule)
  },
  {
    path: 'planning',
    loadChildren: () =>
      import('./planning/planning.module').then((m) => m.PlanningModule)
  },
  {
    path: 'patient',
    loadChildren: () =>
    import('./patient/patient.module').then((m) => m.PatientsModule)
    },
    {
      path: 'calendar',
      loadChildren: () =>
      import('./calendar/calendar.module').then((m) => m.CalendarsModule)
      },

      {
        path: 'workPlanCalendar',
        loadChildren: () =>
        import('./planning/calendar/calendar.module').then((m) => m.CalendarsModule)
        },


      {
        path: 'settings',
        component: SettingsComponent,
      },

  { path: '**', component: Page404Component },



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DoctorRoutingModule {}
