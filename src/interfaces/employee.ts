export enum MaritalStatus {
  Single = "Single",
  Married = "Married",
  Widowed = "Widowed",
  Divorced = "Divorced",
}

export enum Department {
  Admin = "Admin",
  Engineering = "Engineering",
  Finance = "Finance",
}

export enum EmploymentStatus {
  Casual = "Casual",
  Probationary = "Probationary",
  Regular = "Regular",
}

export interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  gender: string;
  birthDate: Date;
  maritalStatus: MaritalStatus;
  department: Department;
  position: string;
  dateHired: Date;
  employmentStatus: EmploymentStatus;
  contactNumber: string;
  email: string;
  address: string;
  city: string;
  province: string;
  nationality: string;
  createdAt: Date;
  updatedAt: Date;
}
