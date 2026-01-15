import { Role } from "./role";

export class Account {
  id?: string;
  email?: string;
  role?: Role;
  jwtToken?: string;
}