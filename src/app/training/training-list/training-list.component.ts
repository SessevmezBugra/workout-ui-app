import { Component, OnInit, QueryList, ViewChild } from '@angular/core';
import { Validators } from '@angular/forms';
import { MatMenuTrigger } from '@angular/material/menu';
import { ActivatedRoute, Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import * as Keycloak from 'keycloak-js';
import { Observable } from 'rxjs';
import { AuthFacade } from 'src/app/auth/+state/auth.facade';
import { Training } from 'src/app/model/training.model';
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

  displayedColumns: string[] = ['name', 'desc', 'createdBy', 'createdDate', 'actions'];
  userId!: string;
  trainings$!: Observable<Array<Training>>;
  isLoggedIn: boolean = false;
  userProfile!: Keycloak.KeycloakProfile;

  constructor(
    private keycloakService: KeycloakService,
    private trainingFacade: TrainingFacade,
    private router: Router,
    private ngrxDialogFacade: NgrxDialogFacade,
    private userFacade: UserFacade,
    private authFacade: AuthFacade) { }

  ngOnInit(): void {
    this.trainings$ = this.trainingFacade.trainings$;
    this.authFacade.isLoggedIn$.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
      this.userFacade.user$.subscribe((userProfile) => {
        this.userId = userProfile.id;
        if (!this.userId) {
            if (this.isLoggedIn) {
              this.authFacade.userProfile$.subscribe((userProfile) => {
                this.userId = userProfile.id!;
                this.trainingFacade.setUserId(this.userId!);
              });
            }
        } else {
          this.trainingFacade.setUserId(this.userId);
        }
      });
    });
  }

  goToDetail(training: Training) {
    this.router.navigate(['/training', training.id]);
  }

  openTrainingDialog(training?: Training) {
    if(!this.isLoggedIn) {
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
          { name: "name", type: 'INPUT', label: "Antrenman Adi", placeholder: "Ornek: 1. Ay", validator: [Validators.required]},
          { name: "desc", type: 'TEXTAREA', label: "Antrenman Aciklamasi", placeholder: "Ornek: Haftada 3 gun", validator: [Validators.required]},
        ]
      }
    );
    dialogRef.afterClosed().subscribe(result => {
      if(result == "OK") {
        if(training && training.id) {
          this.trainingFacade.updateTraining();
        }else {
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
      if(result == "OK") {
        if(training && training.id) {
          this.trainingFacade.deleteTraining(training.id);
        }
      }
    });
  }

}
