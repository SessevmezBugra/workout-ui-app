import { createAction, props } from "@ngrx/store";
import { TrainingMove } from "src/app/model/training-move.model";
import { TrainingSection } from "src/app/model/training-section.model";
import { Training } from "src/app/model/training.model";

export const loadTrainings = createAction('[training-list] LOAD_TRAININGS');

export const loadTrainingsSucces = createAction('[training-list] LOAD_TRAININGS_SUCCESS', props<{ trainings: Array<Training> }>());

export const loadTrainingsFail = createAction('[training-list] LOAD_TRAININGS_FAIL', props<{ error: Error }>());

export const createTraining = createAction('[training-list] CREATE_TRAINING');

export const createTrainingSuccess = createAction('[training-list] CREATE_TRAINING_SUCCESS');

export const createTrainingFail = createAction('[training-list] CREATE_TRAINING_FAIL', props<{ error: Error }>());

export const updateTraining = createAction('[training-list] UPDATE_TRAINING');

export const updateTrainingSuccess = createAction('[training-list] UPDATE_TRAINING_SUCCESS');

export const updateTrainingFail = createAction('[training-list] UPDATE_TRAINING_FAIL', props<{ error: Error }>());

export const setUserId = createAction('[training-list] SET_USER_ID', props<{ userId: string }>());

export const createTrainingSection = createAction('[training-list] CREATE_TRAINING_SECTION');

export const createTrainingSectionSuccess = createAction('[training-list] CREATE_TRAINING_SECTION_SUCCESS');

export const createTrainingSectionFail = createAction('[training-list] CREATE_TRAINING_SECTION_FAIL', props<{ error: Error }>());

export const updateTrainingSection = createAction('[training-list] UPDATE_TRAINING_SECTION');

export const updateTrainingSectionSuccess = createAction('[training-list] UPDATE_TRAINING_SECTION_SUCCESS');

export const updateTrainingSectionFail = createAction('[training-list] UPDATE_TRAINING_SECTION_FAIL', props<{ error: Error }>());

export const loadTrainingSections = createAction('[training-list] LOAD_TRAINING_SECTIONS');

export const loadTrainingSectionsSucces = createAction('[training-list] LOAD_TRAINING_SECTIONS_SUCCESS', props<{ trainingSections: Array<TrainingSection> }>());

export const loadTrainingSectionsFail = createAction('[training-list] LOAD_TRAINING_SECTIONS_FAIL', props<{ error: Error }>());

export const setTrainingId = createAction('[training-list] SET_TRAINING_ID', props<{ trainingId: string }>());

export const createTrainingMove = createAction('[training-list] CREATE_TRAINING_MOVE');

export const createTrainingMoveSuccess = createAction('[training-list] CREATE_TRAINING_MOVE_SUCCESS');

export const createTrainingMoveFail = createAction('[training-list] CREATE_TRAINING_MOVE_FAIL', props<{ error: Error }>());

export const updateTrainingMove = createAction('[training-list] UPDATE_TRAINING_MOVE');

export const updateTrainingMoveSuccess = createAction('[training-list] UPDATE_TRAINING_MOVE_SUCCESS');

export const updateTrainingMoveFail = createAction('[training-list] UPDATE_TRAINING_MOVE_FAIL', props<{ error: Error }>());

export const loadTrainingMoves = createAction('[training-list] LOAD_TRAINING_MOVES');

export const loadTrainingMovesSucces = createAction('[training-list] LOAD_TRAINING_MOVES_SUCCESS', props<{ trainingMoves: Array<TrainingMove> }>());

export const loadTrainingMovesFail = createAction('[training-list] LOAD_TRAINING_MOVES_FAIL', props<{ error: Error }>());

export const setSectionId = createAction('[training-list] SET_SECTION_ID', props<{ sectionId: string }>());

export const deleteTraining = createAction('[training-list] DELETE_TRAINING', props<{id: string}>());

export const deleteTrainingSucces = createAction('[training-list] DELETE_TRAINING_SUCCESS');

export const deleteTrainingFail = createAction('[training-list] DELETE_TRAINING_FAIL', props<{ error: Error }>());

export const deleteTrainingSection = createAction('[training-list] DELETE_TRAINING_SECTION', props<{id: string}>());

export const deleteTrainingSectionSucces = createAction('[training-list] DELETE_TRAINING_SECTION_SUCCESS');

export const deleteTrainingSectionFail = createAction('[training-list] DELETE_TRAINING_SECTION_FAIL', props<{ error: Error }>());

export const deleteTrainingMove = createAction('[training-list] DELETE_TRAINING_MOVE', props<{id: string}>());

export const deleteTrainingMoveSucces = createAction('[training-list] DELETE_TRAINING_MOVE_SUCCESS');

export const deleteTrainingMoveFail = createAction('[training-list] DELETE_TRAINING_MOVE_FAIL', props<{ error: Error }>());