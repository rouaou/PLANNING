import { AvailabilityType } from "./work-availability.enum";


export interface WorkAvailability {
  id: number;
  endDate:  Date;
  startDate:  Date;
  startTime: string; // Heure de début au format HH:mm
  endTime: string; // Heure de fin au format HH:mm
  type: AvailabilityType; // Type de disponibilité
  description?: string; //
}

// export enum DayOfWeek {
//   Sunday = 0,
//   Monday = 1,
//   Tuesday = 2,
//   Wednesday = 3,
//   Thursday = 4,
//   Friday = 5,
//   Saturday = 6,
// }
