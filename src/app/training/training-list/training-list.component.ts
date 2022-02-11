import { Component, OnInit, QueryList, ViewChild } from '@angular/core';
import { Validators } from '@angular/forms';
import { MatMenuTrigger } from '@angular/material/menu';
import { ActivatedRoute, Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import * as Keycloak from 'keycloak-js';
import { combineLatest, concatMap, filter, Observable } from 'rxjs';
import { AuthFacade } from 'src/app/auth/+state/auth.facade';
import { GymFacade } from 'src/app/gym/+state/gym.facade';
import { Training } from 'src/app/model/training.model';
import { User } from 'src/app/model/user.model';
import { NgrxDialogFacade } from 'src/app/ngrx-dialog/+state/ngrx-dialog.facade';
import { UserFacade } from 'src/app/user/+state/user.facade';
import { TrainingFacade } from '../+state/training.facade';
@Component({
  selector: 'app-training-list',
  templateUrl: './training-list.component.html',
  styleUrls: ['./training-list.component.scss']
})
export class TrainingListComponent implements OnInit {

  @ViewChild(MatMenuTrigger) trigger!: QueryList<MatMenuTrigger>;

  displayedColumns: string[] = ['name', 'desc', 'createdBy', 'createdDate'];
  trainings$: Observable<Array<Training>> = this.trainingFacade.trainings$;
  user$!: Observable<User>;
  loggedUser$!: Observable<Keycloak.KeycloakProfile>;
  isLoggedIn$!: Observable<boolean>;
  canModify: boolean = false;
  loggedGymUser$!: Observable<User>;
  isLoggedIn: boolean = false;

  constructor(
    private keycloakService: KeycloakService,
    private trainingFacade: TrainingFacade,
    private router: Router,
    private ngrxDialogFacade: NgrxDialogFacade,
    private userFacade: UserFacade,
    private authFacade: AuthFacade,
    private gymFacade: GymFacade) { }

  ngOnInit(): void {


    // this.user$ = this.trainingFacade.user$;
    // this.authFacade.isLoggedIn$.subscribe((isLoggedIn) => {
    //   this.isLoggedIn = isLoggedIn;
    //   if (this.isLoggedIn) {
    //     this.userFacade.user$.subscribe((userProfile) => {
    //       this.userId = userProfile.id;
    //       if (!this.userId) {
    //         this.authFacade.userProfile$.subscribe((userProfile) => {
    //           this.userId = userProfile.id!;
    //           this.trainingFacade.setUserId(this.userId!);
    //         });
    //       } else {
    //         this.trainingFacade.setUserId(this.userId);
    //       }
    //     });
    //   }
    // });

    this.authFacade.isLoggedIn$
      .pipe(
        isLoggedIn$ => combineLatest([isLoggedIn$, this.authFacade.userProfile$, this.userFacade.user$, this.gymFacade.gymUser$]),
      ).subscribe(([isLoggedIn, loggedUser, user, loggedGymUser]) => {
        this.isLoggedIn = isLoggedIn;
        if(isLoggedIn) {
          if(user.id){
            if(loggedGymUser.role == 'TRAINER' || loggedGymUser.role == 'CO_FOUNDER'){
              this.canModify == true;
              this.displayedColumns.push('actions');
            }
            this.trainingFacade.setUserId(user.id);
          }else {
            this.displayedColumns.push('actions');
            this.canModify = true;
            this.trainingFacade.setUserId(loggedUser.id!);
          }
        } else {
          this.canModify = true;
        }
      });

  }

  goToDetail(training: Training) {
    this.router.navigate(['/training', training.id]);
  }

  openTrainingDialog(training?: Training) {
    if (!this.isLoggedIn) {
      this.ngrxDialogFacade.openLoginRequiredMessageDialog();
      return;
    }
    const dialogRef = this.ngrxDialogFacade.openFormDialog(
      {
        title: "Genel Bilgiler",
        actions: [
          { text: "Iptal", value: "CANCEL" },
          { text: "Kaydet", value: "OK", color: 'primary' },
        ],
        formData: {
          id: training ? training.id : '',
          name: training ? training.name : '',
          desc: training ? training.desc : ''
        },
        formStructure: [
          { name: "name", type: 'INPUT', label: "Antrenman Adi", placeholder: "Ornek: 1. Ay", validator: [Validators.required] },
          { name: "desc", type: 'TEXTAREA', label: "Antrenman Aciklamasi", placeholder: "Ornek: Haftada 3 gun", validator: [Validators.required] },
        ]
      }
    );
    dialogRef.afterClosed().subscribe(result => {
      if (result == "OK") {
        if (training && training.id) {
          this.trainingFacade.updateTraining();
        } else {
          this.trainingFacade.createTraining();
        }
      }
    });
  }

  openTrainingActionMenu(index: number, event: Event) {
    event.stopPropagation();
    event.preventDefault();
    this.trigger.toArray()[index].openMenu();
  }

  openDeleteTrainingWarningDialog(training: Training) {
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
      if (result == "OK") {
        if (training && training.id) {
          this.trainingFacade.deleteTraining(training.id);
        }
      }
    });
  }

}
