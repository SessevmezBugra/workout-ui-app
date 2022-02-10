import { GymStatus } from "./gym-status.enum";
import { UserRole } from "./user-role.type";
import { UserStatus } from "./user-status.enum";

export interface Gym {
    id: string;
    name: string;
    status: GymStatus;
    userRole: UserRole;
    userStatus: UserStatus;
}