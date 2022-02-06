import { createFeatureSelector, createSelector } from "@ngrx/store";
import { trainingFeatureKey, TrainingState } from "./training.reducer";

const getTraining = createFeatureSelector<TrainingState>(trainingFeatureKey);
export const getTrainingsByUserId = createSelector(getTraining, (state: TrainingState) => state.trainings);
export const getUserId = createSelector(getTraining, (state: TrainingState) => state.userId);
export const getTrainingId = createSelector(getTraining, (state: TrainingState) => state.trainingId);
export const getSectionId = createSelector(getTraining, (state: TrainingState) => state.sectionId);
export const getSections = createSelector(getTraining, (state: TrainingState) => state.sections);
export const getMoves = createSelector(getTraining, (state: TrainingState) => state.moves);

export const trainingQuery = {
    getUserId,
    getTrainingsByUserId,
    getTrainingId,
    getSectionId,
    getSections,
    getMoves,
};
