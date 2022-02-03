import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { KeycloakService } from 'keycloak-angular';
import { Observable } from 'rxjs';
import { Gym } from 'src/app/model/gym.model';
import { NgrxDialogFacade } from 'src/app/ngrx-dialog/+state/ngrx-dialog.facade';
import { GymFacade } from '../+state/gym.facade';

@Component({
  selector: 'app-gym-list',
  templateUrl: './gym-list.component.html',
  styleUrls: ['./gym-list.component.scss']
})
export class GymListComponent implements OnInit {

  gymList$!: Observable<Array<Gym>>;

  constructor(private gymFacade: GymFacade, private keycloakService: KeycloakService, private ngrxDialogFacade: NgrxDialogFacade) { }

  ngOnInit(): void {
    this.gymList$ = this.gymFacade.gyms$;

    this.keycloakService.isLoggedIn().then((isLoggedIn) => {
      this.gymFacade.loadGymsByLoggedUser();
    });

  }

  openGymDialog(gym?: Gym) {
    const dialogRef = this.ngrxDialogFacade.openFormDialog(
      {
        title: "Genel Bilgiler",
        actions: [
          { text: "Iptal", value: "CANCEL" },
          { text: "Kaydet", value: "OK", color: 'primary' },
        ],
        formData: {
          id: gym ? gym.id : '',
          name: gym ? gym.name : '',
        },
        formStructure: [
          { name: "name", type: 'INPUT', label: "Salon Adi", placeholder: "", validator: [Validators.required]},
        ]
      }
    );
    dialogRef.afterClosed().subscribe(result => {
      if(result == "OK") {
        if(gym && gym.id) {
          this.gymFacade.updateGym();
        }else {
          this.gymFacade.createGym();
        }
      }
    });
  }

}
