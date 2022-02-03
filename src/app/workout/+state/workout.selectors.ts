import { createFeatureSelector, createSelector } from "@ngrx/store";
import { workoutFeatureKey, WorkoutState } from "./workout.reducer";

const getWorkout = createFeatureSelector<WorkoutState>(workoutFeatureKey);
export const getWorkoutsByUserId = createSelector(getWorkout, (state: WorkoutState) => state.workouts);
export const getUserId = createSelector(getWorkout, (state: WorkoutState) => state.userId);
export const getWorkoutId = createSelector(getWorkout, (state: WorkoutState) => state.workoutId);
export const getSectionId = createSelector(getWorkout, (state: WorkoutState) => state.sectionId);
export const getSections = createSelector(getWorkout, (state: WorkoutState) => state.sections);
export const getMoves = createSelector(getWorkout, (state: WorkoutState) => state.moves);

export const workoutQuery = {
    getUserId,
    getWorkoutsByUserId,
    getWorkoutId,
    getSectionId,
    getSections,
    getMoves,
};
