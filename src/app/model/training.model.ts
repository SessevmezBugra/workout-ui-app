import { TrainingSection } from "./training-section.model";

export class Training {
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
    sections!: Array<TrainingSection>
}