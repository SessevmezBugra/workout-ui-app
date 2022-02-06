import { Action, createReducer, on } from "@ngrx/store";
import { TrainingMove } from "src/app/model/training-move.model";
import { TrainingSection } from "src/app/model/training-section.model";
import { Training } from "src/app/model/training.model";
import * as TrainingActions from "./training.actions";

export const trainingFeatureKey = "training";

export interface TrainingState {
    trainings: Array<Training>;
    sections: Array<TrainingSection>;
    moves: Array<TrainingMove>;
    userId: string;
    trainingId: string;
    sectionId: string;
}

export interface TrainingRootState {
    readonly [trainingFeatureKey]: TrainingState;
  }

  export const trainingInitialState : TrainingState = {
    trainings: [],
    moves: [],
    sections: [],
    userId: '',
    trainingId: '',
    sectionId: '',
  }

  const reducer = createReducer(
    trainingInitialState,
    on(TrainingActions.loadTrainingsSucces, (state, action) => ({
      ...state,
      trainings: action.trainings
    })),
    on(TrainingActions.setUserId, (state, action) => ({
      ...state,
      userId: action.userId
    })),
    on(TrainingActions.setTrainingId, (state, action) => ({
      ...state,
      trainingId: action.trainingId
    })),
    on(TrainingActions.loadTrainingSectionsSucces, (state, action) => ({
      ...state,
      sections: action.trainingSections
    })),
    on(TrainingActions.loadTrainingMovesSucces, (state, action) => ({
      ...state,
      moves: action.trainingMoves
    })),
    on(TrainingActions.setSectionId, (state, action) => ({
      ...state,
      sectionId: action.sectionId
    })),
  );
  
  export function trainingReducer(state: TrainingState | undefined, action: Action): TrainingState {
    return reducer(state, action);
  }
  