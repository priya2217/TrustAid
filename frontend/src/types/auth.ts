export interface AppUser {
  id: string;
  email: string;
  fullName: string;
  role: "beneficiary" | "donor" | "ngo";
  createdAt?: string;
}
