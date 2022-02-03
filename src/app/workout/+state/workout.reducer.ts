import { Action, createReducer, on } from "@ngrx/store";
import { WorkoutMove } from "src/app/model/workout-move.model";
import { WorkoutSection } from "src/app/model/workout-section.model";
import { Workout } from "src/app/model/workout.model";
import * as WorkoutActions from "./workout.actions";

export const workoutFeatureKey = "workout";

export interface WorkoutState {
    workouts: Array<Workout>;
    sections: Array<WorkoutSection>;
    moves: Array<WorkoutMove>;
    userId: string;
    workoutId: string;
    sectionId: string;
}

export interface WorkoutRootState {
    readonly [workoutFeatureKey]: WorkoutState;
  }

  export const workoutInitialState : WorkoutState = {
    workouts: [],
    moves: [],
    sections: [],
    userId: '',
    workoutId: '',
    sectionId: '',
  }

  const reducer = createReducer(
    workoutInitialState,
    on(WorkoutActions.loadWorkoutsSucces, (state, action) => ({
      ...state,
      workouts: action.workouts
    })),
    on(WorkoutActions.setUserId, (state, action) => ({
      ...state,
      userId: action.userId
    })),
    on(WorkoutActions.setWorkoutId, (state, action) => ({
      ...state,
      workoutId: action.workoutId
    })),
    on(WorkoutActions.loadWorkoutSectionsSucces, (state, action) => ({
      ...state,
      sections: action.workoutSections
    })),
    on(WorkoutActions.loadWorkoutMovesSucces, (state, action) => ({
      ...state,
      moves: action.workoutMoves
    })),
    on(WorkoutActions.setSectionId, (state, action) => ({
      ...state,
      sectionId: action.sectionId
    })),
  );
  
  export function workoutReducer(state: WorkoutState | undefined, action: Action): WorkoutState {
    return reducer(state, action);
  }
  