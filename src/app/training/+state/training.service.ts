import { HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiService } from "src/app/shared/api.service";
import { TrainingMove } from "src/app/model/training-move.model";
import { TrainingSection } from "src/app/model/training-section.model";
import { Training } from "src/app/model/training.model";

@Injectable()
export class TrainingService {

    constructor(private apiService: ApiService) { }

    getTrainingsByUserId(userId: string | null | undefined): Observable<Array<Training>> {
        var params = new HttpParams();
        if(userId) {
            params = new HttpParams().append("userId", userId);
        }
        return this.apiService.get('/training', params);
    }

    createTraining(training: Training): Observable<void> {
        return this.apiService.post('/training', training);
    }

    updateTraining(training: Training): Observable<void> {
        return this.apiService.put('/training', training);
    }

    getTrainingSectionsByTrainingId(trainingId: string): Observable<Array<TrainingSection>> {
        return this.apiService.get('/training/' + trainingId + "/section");
    }

    createTrainingSection(trainingId: string, section: TrainingSection): Observable<void> {
        return this.apiService.post('/training/' + trainingId + "/section", section);
    }

    updateTrainingSection(trainingId: string, section: TrainingSection): Observable<void> {
        return this.apiService.put('/training/' + trainingId + "/section", section);
    }

    getTrainingMovesByTrainingIdAndSectionId(trainingId: string, sectionId: string): Observable<Array<TrainingMove>> {
        return this.apiService.get('/training/' + trainingId + "/section/" + sectionId + "/move");
    }

    createTrainingMove(trainingId: string, sectionId: string, section: TrainingMove): Observable<void> {
        return this.apiService.post('/training/' + trainingId + "/section/" + sectionId + "/move", section);
    }

    updateTrainingMove(trainingId: string, sectionId: string, section: TrainingMove): Observable<void> {
        return this.apiService.put('/training/' + trainingId + "/section/" + sectionId + "/move", section);
    }

    deleteTrainingById(trainingId: string): Observable<void> {
        return this.apiService.delete('/training/' + trainingId);
    }

    deleteTrainingSectionById(trainingId: string, sectionId: string): Observable<void> {
        return this.apiService.delete('/training/' + trainingId + '/section/' + sectionId);
    }

    deleteTrainingMoveById(trainingId: string, sectionId: string, moveId: string): Observable<void> {
        return this.apiService.delete('/training/' + trainingId + '/section/' + sectionId + '/move/' + moveId);
    }

}