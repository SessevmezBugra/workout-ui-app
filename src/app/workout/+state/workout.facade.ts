import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { WorkoutState } from "./workout.reducer";
import { workoutQuery } from "./workout.selectors";
import * as WorkoutActions from "./workout.actions";

@Injectable()
export class WorkoutFacade {

    workouts$ = this.store.select(workoutQuery.getWorkoutsByUserId);
    userId$ = this.store.select(workoutQuery.getUserId);
    workoutId$ = this.store.select(workoutQuery.getWorkoutId);
    sectionId$ = this.store.select(workoutQuery.getSectionId);
    sections$ = this.store.select(workoutQuery.getSections);
    moves$ = this.store.select(workoutQuery.getMoves);

    constructor(private store: Store<WorkoutState>) { }
    
    loadWorkoutsByUserId(userId: string | null | undefined) {
        this.store.dispatch(WorkoutActions.loadWorkouts());
    }

    createWorkout() {
        this.store.dispatch(WorkoutActions.createWorkout());
    }

    updateWorkout() {
        this.store.dispatch(WorkoutActions.updateWorkout());
    }

    setUserId(userId: string) {
        this.store.dispatch(WorkoutActions.setUserId({userId}));
    }

    setWorkoutId(workoutId: string) {
        this.store.dispatch(WorkoutActions.setWorkoutId({workoutId}));
    }

    setWorkoutSectionId(sectionId: string) {
        this.store.dispatch(WorkoutActions.setSectionId({sectionId}));
    }

    createWorkoutSection() {
        this.store.dispatch(WorkoutActions.createWorkoutSection());
    }

    updateWorkoutSection() {
        this.store.dispatch(WorkoutActions.updateWorkoutSection());
    }

    createWorkoutMove() {
        this.store.dispatch(WorkoutActions.createWorkoutMove());
    }

    updateWorkoutMove() {
        this.store.dispatch(WorkoutActions.updateWorkoutMove());
    }

    loadWorkoutSections() {
        this.store.dispatch(WorkoutActions.loadWorkoutSections());
    }

    loadWorkoutMoves() {
        this.store.dispatch(WorkoutActions.loadWorkoutMoves());
    }

    deleteWorkout(id: string) {
        this.store.dispatch(WorkoutActions.deleteWorkout({id}));
    }

    deleteWorkoutSeciton(id: string) {
        this.store.dispatch(WorkoutActions.deleteWorkoutSection({id}));
    }

    deleteWorkoutMove(id: string) {
        this.store.dispatch(WorkoutActions.deleteWorkoutMove({id}));
    }
}