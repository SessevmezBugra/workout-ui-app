import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserRole } from 'src/app/model/user-role.type';
import { GymFacade } from '../+state/gym.facade';

@Component({
  selector: 'app-gym-detail',
  templateUrl: './gym-detail.component.html',
  styleUrls: ['./gym-detail.component.scss']
})
export class GymDetailComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private gymFacade: GymFacade) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      if(paramMap.get("id")) {
        this.gymFacade.getGym(paramMap.get("id")!);
      }
    });
  }

}
