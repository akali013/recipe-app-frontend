import { Role } from "./role";

export class Account {
  id?: string;
  email?: string;
  role?: Role;
  created?: Date;
  updated?: Date;
  jwtToken?: string;
  isBanned?: boolean;
}