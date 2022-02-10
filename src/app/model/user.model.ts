import { UserRole } from "./user-role.type";
import { UserStatus } from "./user-status.enum";

export class User {
    id!: string;
    username!: string;
    firstName!: string;
    lastName!: string;
    role!: UserRole;
    status!: UserStatus;
}