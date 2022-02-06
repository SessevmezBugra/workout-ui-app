import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { TrainingState } from "./training.reducer";
import { trainingQuery } from "./training.selectors";
import * as TrainingActions from "./training.actions";

@Injectable()
export class TrainingFacade {

    trainings$ = this.store.select(trainingQuery.getTrainingsByUserId);
    userId$ = this.store.select(trainingQuery.getUserId);
    trainingId$ = this.store.select(trainingQuery.getTrainingId);
    sectionId$ = this.store.select(trainingQuery.getSectionId);
    sections$ = this.store.select(trainingQuery.getSections);
    moves$ = this.store.select(trainingQuery.getMoves);

    constructor(private store: Store<TrainingState>) { }
    
    loadTrainingsByUserId(userId: string | null | undefined) {
        this.store.dispatch(TrainingActions.loadTrainings());
    }

    createTraining() {
        this.store.dispatch(TrainingActions.createTraining());
    }

    updateTraining() {
        this.store.dispatch(TrainingActions.updateTraining());
    }

    setUserId(userId: string) {
        this.store.dispatch(TrainingActions.setUserId({userId}));
    }

    setTrainingId(trainingId: string) {
        this.store.dispatch(TrainingActions.setTrainingId({trainingId}));
    }

    setTrainingSectionId(sectionId: string) {
        this.store.dispatch(TrainingActions.setSectionId({sectionId}));
    }

    createTrainingSection() {
        this.store.dispatch(TrainingActions.createTrainingSection());
    }

    updateTrainingSection() {
        this.store.dispatch(TrainingActions.updateTrainingSection());
    }

    createTrainingMove() {
        this.store.dispatch(TrainingActions.createTrainingMove());
    }

    updateTrainingMove() {
        this.store.dispatch(TrainingActions.updateTrainingMove());
    }

    loadTrainingSections() {
        this.store.dispatch(TrainingActions.loadTrainingSections());
    }

    loadTrainingMoves() {
        this.store.dispatch(TrainingActions.loadTrainingMoves());
    }

    deleteTraining(id: string) {
        this.store.dispatch(TrainingActions.deleteTraining({id}));
    }

    deleteTrainingSeciton(id: string) {
        this.store.dispatch(TrainingActions.deleteTrainingSection({id}));
    }

    deleteTrainingMove(id: string) {
        this.store.dispatch(TrainingActions.deleteTrainingMove({id}));
    }
}