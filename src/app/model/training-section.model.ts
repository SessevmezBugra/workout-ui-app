import { TrainingMove } from "./training-move.model";

export interface TrainingSection {
    id: string;
    name: string;
    desc: string;
    createdDate: Date;
    createdBy: string;
    updatedOn: Date;
    updatedBy: string;
    moves: Array<TrainingMove>;
}