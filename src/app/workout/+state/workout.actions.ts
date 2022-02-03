import { createAction, props } from "@ngrx/store";
import { WorkoutMove } from "src/app/model/workout-move.model";
import { WorkoutSection } from "src/app/model/workout-section.model";
import { Workout } from "src/app/model/workout.model";

export const loadWorkouts = createAction('[workout-list] LOAD_WORKOUTS');

export const loadWorkoutsSucces = createAction('[workout-list] LOAD_WORKOUTS_SUCCESS', props<{ workouts: Array<Workout> }>());

export const loadWorkoutsFail = createAction('[workout-list] LOAD_WORKOUTS_FAIL', props<{ error: Error }>());

export const createWorkout = createAction('[workout-list] CREATE_WORKOUT');

export const createWorkoutSuccess = createAction('[workout-list] CREATE_WORKOUT_SUCCESS');

export const createWorkoutFail = createAction('[workout-list] CREATE_WORKOUT_FAIL', props<{ error: Error }>());

export const updateWorkout = createAction('[workout-list] UPDATE_WORKOUT');

export const updateWorkoutSuccess = createAction('[workout-list] UPDATE_WORKOUT_SUCCESS');

export const updateWorkoutFail = createAction('[workout-list] UPDATE_WORKOUT_FAIL', props<{ error: Error }>());

export const setUserId = createAction('[workout-list] SET_USER_ID', props<{ userId: string }>());

export const createWorkoutSection = createAction('[workout-list] CREATE_WORKOUT_SECTION');

export const createWorkoutSectionSuccess = createAction('[workout-list] CREATE_WORKOUT_SECTION_SUCCESS');

export const createWorkoutSectionFail = createAction('[workout-list] CREATE_WORKOUT_SECTION_FAIL', props<{ error: Error }>());

export const updateWorkoutSection = createAction('[workout-list] UPDATE_WORKOUT_SECTION');

export const updateWorkoutSectionSuccess = createAction('[workout-list] UPDATE_WORKOUT_SECTION_SUCCESS');

export const updateWorkoutSectionFail = createAction('[workout-list] UPDATE_WORKOUT_SECTION_FAIL', props<{ error: Error }>());

export const loadWorkoutSections = createAction('[workout-list] LOAD_WORKOUT_SECTIONS');

export const loadWorkoutSectionsSucces = createAction('[workout-list] LOAD_WORKOUT_SECTIONS_SUCCESS', props<{ workoutSections: Array<WorkoutSection> }>());

export const loadWorkoutSectionsFail = createAction('[workout-list] LOAD_WORKOUT_SECTIONS_FAIL', props<{ error: Error }>());

export const setWorkoutId = createAction('[workout-list] SET_WORKOUT_ID', props<{ workoutId: string }>());

export const createWorkoutMove = createAction('[workout-list] CREATE_WORKOUT_MOVE');

export const createWorkoutMoveSuccess = createAction('[workout-list] CREATE_WORKOUT_MOVE_SUCCESS');

export const createWorkoutMoveFail = createAction('[workout-list] CREATE_WORKOUT_MOVE_FAIL', props<{ error: Error }>());

export const updateWorkoutMove = createAction('[workout-list] UPDATE_WORKOUT_MOVE');

export const updateWorkoutMoveSuccess = createAction('[workout-list] UPDATE_WORKOUT_MOVE_SUCCESS');

export const updateWorkoutMoveFail = createAction('[workout-list] UPDATE_WORKOUT_MOVE_FAIL', props<{ error: Error }>());

export const loadWorkoutMoves = createAction('[workout-list] LOAD_WORKOUT_MOVES');

export const loadWorkoutMovesSucces = createAction('[workout-list] LOAD_WORKOUT_MOVES_SUCCESS', props<{ workoutMoves: Array<WorkoutMove> }>());

export const loadWorkoutMovesFail = createAction('[workout-list] LOAD_WORKOUT_MOVES_FAIL', props<{ error: Error }>());

export const setSectionId = createAction('[workout-list] SET_SECTION_ID', props<{ sectionId: string }>());

export const deleteWorkout = createAction('[workout-list] DELETE_WORKOUT', props<{id: string}>());

export const deleteWorkoutSucces = createAction('[workout-list] DELETE_WORKOUT_SUCCESS');

export const deleteWorkoutFail = createAction('[workout-list] DELETE_WORKOUT_FAIL', props<{ error: Error }>());

export const deleteWorkoutSection = createAction('[workout-list] DELETE_WORKOUT_SECTION', props<{id: string}>());

export const deleteWorkoutSectionSucces = createAction('[workout-list] DELETE_WORKOUT_SECTION_SUCCESS');

export const deleteWorkoutSectionFail = createAction('[workout-list] DELETE_WORKOUT_SECTION_FAIL', props<{ error: Error }>());

export const deleteWorkoutMove = createAction('[workout-list] DELETE_WORKOUT_MOVE', props<{id: string}>());

export const deleteWorkoutMoveSucces = createAction('[workout-list] DELETE_WORKOUT_MOVE_SUCCESS');

export const deleteWorkoutMoveFail = createAction('[workout-list] DELETE_WORKOUT_MOVE_FAIL', props<{ error: Error }>());