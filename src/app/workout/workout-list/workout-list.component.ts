import { Component, OnInit, QueryList, ViewChild } from '@angular/core';
import { Validators } from '@angular/forms';
import { MatMenuTrigger } from '@angular/material/menu';
import { ActivatedRoute, Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { Observable } from 'rxjs';
import { Workout } from 'src/app/model/workout.model';
import { NgrxDialogFacade } from 'src/app/ngrx-dialog/+state/ngrx-dialog.facade';
import { UserFacade } from 'src/app/user/+state/user.facade';
import { WorkoutFacade } from '../+state/workout.facade';
@Component({
  selector: 'app-workout-list',
  templateUrl: './workout-list.component.html',
  styleUrls: ['./workout-list.component.scss']
})
export class WorkoutListComponent implements OnInit {

  @ViewChild(MatMenuTrigger) trigger!: QueryList<MatMenuTrigger>;

  displayedColumns: string[] = ['name', 'desc', 'createdBy', 'createdDate', 'actions'];
  userId!: string | null | undefined;
  workouts$!: Observable<Array<Workout>>;

  constructor(
    private keycloakService: KeycloakService,
    private workoutFacade: WorkoutFacade,
    private router: Router,
    private ngrxDialogFacade: NgrxDialogFacade,
    private userFacade: UserFacade) { }

  ngOnInit(): void {
    this.workouts$ = this.workoutFacade.workouts$;

    this.userFacade.userId$.subscribe((userId) => {
      this.userId = userId;
      if (!this.userId) {
        this.keycloakService.isLoggedIn().then((isLoggedIn) => {
          if (isLoggedIn) {
            this.keycloakService.loadUserProfile().then((userProfile) => {
              this.userId = userProfile.id;
              // this.workoutFacade.loadWorkoutsByUserId(this.userId);
              this.workoutFacade.setUserId(this.userId!);
            });
          }
        });
      } else {
        // this.workoutFacade.loadWorkoutsByUserId(this.userId);
        this.workoutFacade.setUserId(this.userId);
      }
    });
  }

  goToDetail(workout: Workout) {
    this.router.navigate(['/workout', workout.id]);
  }

  openWorkoutDialog(workout?: Workout) {
    const dialogRef = this.ngrxDialogFacade.openFormDialog(
      {
        title: "Genel Bilgiler",
        actions: [
          { text: "Iptal", value: "CANCEL" },
          { text: "Kaydet", value: "OK", color: 'primary' },
        ],
        formData: {
          id: workout ? workout.id : '',
          name: workout ? workout.name : '',
          desc: workout ? workout.desc : ''
        },
        formStructure: [
          { name: "name", type: 'INPUT', label: "Antrenman Adi", placeholder: "Ornek: 1. Ay", validator: [Validators.required]},
          { name: "desc", type: 'TEXTAREA', label: "Antrenman Aciklamasi", placeholder: "Ornek: Haftada 3 gun", validator: [Validators.required]},
        ]
      }
    );
    dialogRef.afterClosed().subscribe(result => {
      if(result == "OK") {
        if(workout && workout.id) {
          this.workoutFacade.updateWorkout();
        }else {
          this.workoutFacade.createWorkout();
        }
      }
    });
  }

  openWorkoutActionMenu(index: number, event: Event) {
    event.stopPropagation();
    event.preventDefault();
    this.trigger.toArray()[index].openMenu();
  }

  openDeleteWorkoutWarningDialog(workout: Workout) {
    const dialogRef = this.ngrxDialogFacade.openMessageDialog({
      title: "Uyari",
      message: "Bu antrenmani silmek istediginizden emin misiniz?",
      actions: [
        { text: "Iptal", value: "CANCEL" },
        { text: "Devam", value: "OK", color: 'primary' },
      ],
    }
    );
    dialogRef.afterClosed().subscribe(result => {
      if(result == "OK") {
        if(workout && workout.id) {
          this.workoutFacade.deleteWorkout(workout.id);
        }
      }
    });
  }

}
