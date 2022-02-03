import { WorkoutMove } from "./workout-move.model";

export interface WorkoutSection {
    id: string;
    name: string;
    desc: string;
    createdDate: Date;
    createdBy: string;
    updatedOn: Date;
    updatedBy: string;
    moves: Array<WorkoutMove>;
}