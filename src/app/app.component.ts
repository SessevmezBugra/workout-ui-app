import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'workout-ui';
  links = [{label: "Antrenmanim", path: "training"}, {label: "Salonum", path: "gym"}];
  activeLink = this.links[0];
}
