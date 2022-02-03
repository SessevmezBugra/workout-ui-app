import { HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiService } from "src/app/shared/api.service";
import { WorkoutMove } from "src/app/model/workout-move.model";
import { WorkoutSection } from "src/app/model/workout-section.model";
import { Workout } from "src/app/model/workout.model";

@Injectable()
export class WorkoutService {

    constructor(private apiService: ApiService) { }

    getWorkoutsByUserId(userId: string | null | undefined): Observable<Array<Workout>> {
        var params = new HttpParams();
        if(userId) {
            params = new HttpParams().append("userId", userId);
        }
        return this.apiService.get('/workout', params);
    }

    createWorkout(workout: Workout): Observable<void> {
        return this.apiService.post('/workout', workout);
    }

    updateWorkout(workout: Workout): Observable<void> {
        return this.apiService.put('/workout', workout);
    }

    getWorkoutSectionsByWorkoutId(workoutId: string): Observable<Array<WorkoutSection>> {
        return this.apiService.get('/workout/' + workoutId + "/section");
    }

    createWorkoutSection(workoutId: string, section: WorkoutSection): Observable<void> {
        return this.apiService.post('/workout/' + workoutId + "/section", section);
    }

    updateWorkoutSection(workoutId: string, section: WorkoutSection): Observable<void> {
        return this.apiService.put('/workout/' + workoutId + "/section", section);
    }

    getWorkoutMovesByWorkoutIdAndSectionId(workoutId: string, sectionId: string): Observable<Array<WorkoutMove>> {
        return this.apiService.get('/workout/' + workoutId + "/section/" + sectionId + "/move");
    }

    createWorkoutMove(workoutId: string, sectionId: string, section: WorkoutMove): Observable<void> {
        return this.apiService.post('/workout/' + workoutId + "/section/" + sectionId + "/move", section);
    }

    updateWorkoutMove(workoutId: string, sectionId: string, section: WorkoutMove): Observable<void> {
        return this.apiService.put('/workout/' + workoutId + "/section/" + sectionId + "/move", section);
    }

    deleteWorkoutById(workoutId: string): Observable<void> {
        return this.apiService.delete('/workout/' + workoutId);
    }

    deleteWorkoutSectionById(workoutId: string, sectionId: string): Observable<void> {
        return this.apiService.delete('/workout/' + workoutId + '/section/' + sectionId);
    }

    deleteWorkoutMoveById(workoutId: string, sectionId: string, moveId: string): Observable<void> {
        return this.apiService.delete('/workout/' + workoutId + '/section/' + sectionId + '/move/' + moveId);
    }

}