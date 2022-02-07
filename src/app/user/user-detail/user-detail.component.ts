import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserFacade } from '../+state/user.facade';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {

  constructor(private userFacade: UserFacade, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      var userId = paramMap.get("userId");
      if (!userId) {
        
      }else {
        this.userFacade.getUser(userId);
      }
    });
    //test
  }

  goWorkoutList() {

  }

}
