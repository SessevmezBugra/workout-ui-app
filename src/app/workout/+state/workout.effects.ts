import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, concatMap, map, merge, mergeMap, of, withLatestFrom } from "rxjs";
import { NgrxDialogFacade } from "src/app/ngrx-dialog/+state/ngrx-dialog.facade";
import * as WorkoutActions from "./workout.actions";
import { WorkoutFacade } from "./workout.facade";
import { WorkoutService } from "./workout.service";

@Injectable()
export class WorkoutEffects {

    constructor(
        private actions$: Actions,
        private workoutService: WorkoutService,
        private ngrxDialogFacade: NgrxDialogFacade,
        private workoutFacade: WorkoutFacade
    ) { }

    loadWorkoutsByUserId = createEffect(() =>
        this.actions$.pipe(
            ofType(WorkoutActions.setUserId, WorkoutActions.loadWorkouts),
            withLatestFrom(this.workoutFacade.userId$),
            concatMap(([_, userId]) =>
                this.workoutService.getWorkoutsByUserId(userId).pipe(
                    map((response) => WorkoutActions.loadWorkoutsSucces({ workouts: response })),
                    catchError((error) => of(WorkoutActions.loadWorkoutsFail(error))),
                ),
            ),
        ),
    );

    loadWorkoutSections = createEffect(() =>
        this.actions$.pipe(
            ofType(WorkoutActions.setWorkoutId, WorkoutActions.loadWorkoutSections),
            withLatestFrom(this.workoutFacade.workoutId$),
            concatMap(([_, workoutId]) =>
                this.workoutService.getWorkoutSectionsByWorkoutId(workoutId).pipe(
                    map((response) => WorkoutActions.loadWorkoutSectionsSucces({ workoutSections: response })),
                    catchError((error) => of(WorkoutActions.loadWorkoutSectionsFail(error))),
                ),
            ),
        ),
    );

    loadWorkoutMoves = createEffect(() =>
        this.actions$.pipe(
            ofType(WorkoutActions.setSectionId, WorkoutActions.loadWorkoutMoves),
            withLatestFrom(this.workoutFacade.workoutId$, this.workoutFacade.sectionId$),
            concatMap(([_, workoutId, sectionId]) =>
                this.workoutService.getWorkoutMovesByWorkoutIdAndSectionId(workoutId, sectionId).pipe(
                    map((response) => WorkoutActions.loadWorkoutMovesSucces({ workoutMoves: response })),
                    catchError((error) => of(WorkoutActions.loadWorkoutMovesFail(error))),
                ),
            ),
        ),
    );

    createWorkout = createEffect(() =>
        this.actions$.pipe(
            ofType(WorkoutActions.createWorkout),
            withLatestFrom(this.ngrxDialogFacade.formDialogFormData$, this.workoutFacade.userId$),
            concatMap(([_, data, userId]) => 
                this.workoutService.createWorkout({...data, userId: userId}).pipe(
                    mergeMap((response) => [WorkoutActions.loadWorkouts(), WorkoutActions.createWorkoutSuccess()]),
                    catchError((error) => of(WorkoutActions.createWorkoutFail(error))),
                ),
            ),
        ),
    );

    updateWorkout = createEffect(() =>
        this.actions$.pipe(
            ofType(WorkoutActions.updateWorkout),
            withLatestFrom(this.ngrxDialogFacade.formDialogFormData$, this.workoutFacade.userId$),
            concatMap(([_, data, userId]) => 
                this.workoutService.updateWorkout({...data, userId: userId}).pipe(
                    mergeMap((response) => [WorkoutActions.loadWorkouts(), WorkoutActions.updateWorkoutSuccess()]),
                    catchError((error) => of(WorkoutActions.updateWorkoutFail(error))),
                ),
            ),
        ),
    );

    createWorkoutSection = createEffect(() =>
        this.actions$.pipe(
            ofType(WorkoutActions.createWorkoutSection),
            withLatestFrom(this.workoutFacade.workoutId$, this.ngrxDialogFacade.formDialogFormData$),
            concatMap(([_, workoutId, data]) => 
                this.workoutService.createWorkoutSection(workoutId, data).pipe(
                    mergeMap((response) => [WorkoutActions.loadWorkoutSections(), WorkoutActions.createWorkoutSectionSuccess()]),
                    catchError((error) => of(WorkoutActions.createWorkoutSectionFail(error))),
                ),
            ),
        ),
    );

    updateWorkoutSection = createEffect(() =>
        this.actions$.pipe(
            ofType(WorkoutActions.updateWorkoutSection),
            withLatestFrom(this.workoutFacade.workoutId$, this.ngrxDialogFacade.formDialogFormData$),
            concatMap(([_, workoutId, data]) => 
                this.workoutService.updateWorkoutSection(workoutId, data).pipe(
                    mergeMap((response) => [WorkoutActions.loadWorkoutSections(), WorkoutActions.updateWorkoutSectionSuccess()]),
                    catchError((error) => of(WorkoutActions.updateWorkoutSectionFail(error))),
                ),
            ),
        ),
    );

    createWorkoutMove = createEffect(() =>
        this.actions$.pipe(
            ofType(WorkoutActions.createWorkoutMove),
            withLatestFrom(this.workoutFacade.workoutId$, this.workoutFacade.sectionId$, this.ngrxDialogFacade.formDialogFormData$),
            concatMap(([_, workoutId, sectionId, data]) => 
                this.workoutService.createWorkoutMove(workoutId, sectionId, data).pipe(
                    mergeMap((response) => [WorkoutActions.loadWorkoutMoves(), WorkoutActions.createWorkoutMoveSuccess()]),
                    catchError((error) => of(WorkoutActions.createWorkoutMoveFail(error))),
                ),
            ),
        ),
    );

    updateWorkoutMove = createEffect(() =>
        this.actions$.pipe(
            ofType(WorkoutActions.updateWorkoutMove),
            withLatestFrom(this.workoutFacade.workoutId$, this.workoutFacade.sectionId$, this.ngrxDialogFacade.formDialogFormData$),
            concatMap(([_, workoutId, sectionId, data]) => 
                this.workoutService.updateWorkoutMove(workoutId, sectionId, data).pipe(
                    mergeMap((response) => [WorkoutActions.loadWorkoutMoves(), WorkoutActions.updateWorkoutMoveSuccess()]),
                    catchError((error) => of(WorkoutActions.updateWorkoutMoveFail(error))),
                ),
            ),
        ),
    );

    deleteWorkout = createEffect(() =>
        this.actions$.pipe(
            ofType(WorkoutActions.deleteWorkout),
            concatMap((action) => 
                this.workoutService.deleteWorkoutById(action.id).pipe(
                    mergeMap((response) => [WorkoutActions.loadWorkouts(), WorkoutActions.deleteWorkoutSucces()]),
                    catchError((error) => of(WorkoutActions.deleteWorkoutFail(error))),
                ),
            ),
        ),
    );

    deleteWorkoutSection = createEffect(() =>
        this.actions$.pipe(
            ofType(WorkoutActions.deleteWorkoutSection),
            withLatestFrom(this.workoutFacade.workoutId$, this.workoutFacade.sectionId$),
            concatMap(([_, workoutId, sectionId]) => 
                this.workoutService.deleteWorkoutSectionById(workoutId, sectionId).pipe(
                    mergeMap((response) => [WorkoutActions.loadWorkoutSections(), WorkoutActions.deleteWorkoutSectionSucces()]),
                    catchError((error) => of(WorkoutActions.deleteWorkoutSectionFail(error))),
                ),
            ),
        ),
    );

    deleteWorkoutMove = createEffect(() =>
        this.actions$.pipe(
            ofType(WorkoutActions.deleteWorkoutMove),
            withLatestFrom(this.workoutFacade.workoutId$, this.workoutFacade.sectionId$),
            concatMap(([{id}, workoutId, sectionId]) => 
                this.workoutService.deleteWorkoutMoveById(workoutId, sectionId, id).pipe(
                    mergeMap((response) => [WorkoutActions.loadWorkoutMoves(), WorkoutActions.deleteWorkoutMoveSucces()]),
                    catchError((error) => of(WorkoutActions.deleteWorkoutMoveFail(error))),
                ),
            ),
        ),
    );

}