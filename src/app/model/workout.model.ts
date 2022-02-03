import { WorkoutSection } from "./workout-section.model";

export class Workout {
    id!: string;
    name!: string;
    desc!: string;
    username!: string;
    userId!: string;
    creatorFirstName!: string;
    creatorLastName!: string;
    createdDate!: Date;
    createdBy!: string;
    updatedOn!: Date;
    updatedBy!: string;
    sections!: Array<WorkoutSection>
}