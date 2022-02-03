import { GymStatus } from "./gym-status.enum";

export interface Gym {
    id: string;
    name: string;
    status: GymStatus;
}