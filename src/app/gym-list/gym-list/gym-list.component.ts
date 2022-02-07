import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { KeycloakService } from 'keycloak-angular';
import { Observable } from 'rxjs';
import { AuthFacade } from 'src/app/auth/+state/auth.facade';
import { Gym } from 'src/app/model/gym.model';
import { NgrxDialogFacade } from 'src/app/ngrx-dialog/+state/ngrx-dialog.facade';
import { GymListFacade } from '../+state/gym-list.facade';

@Component({
  selector: 'app-gym-list',
  templateUrl: './gym-list.component.html',
  styleUrls: ['./gym-list.component.scss']
})
export class GymListComponent implements OnInit {

  gymList$!: Observable<Array<Gym>>;
  isLoggedIn: boolean = false;

  constructor(private gymListFacade: GymListFacade,
    private ngrxDialogFacade: NgrxDialogFacade,
    private authFacade: AuthFacade) { }

  ngOnInit(): void {
    this.gymList$ = this.gymListFacade.gyms$;
    this.authFacade.isLoggedIn$.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
      if (this.isLoggedIn) {
        this.gymListFacade.loadGymsByLoggedUser();
      }
    });
  }

  openGymDialog(gym?: Gym) {
    if(!this.isLoggedIn){
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
          id: gym ? gym.id : '',
          name: gym ? gym.name : '',
        },
        formStructure: [
          { name: "name", type: 'INPUT', label: "Salon Adi", placeholder: "", validator: [Validators.required] },
        ]
      }
    );
    dialogRef.afterClosed().subscribe(result => {
      if (result == "OK") {
        if (gym && gym.id) {
          this.gymListFacade.updateGym();
        } else {
          this.gymListFacade.createGym();
        }
      }
    });
  }

}
