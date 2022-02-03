import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NgrxDialogFacade } from '../../+state/ngrx-dialog.facade';
import { MessageDialog } from '../../+state/ngrx-dialog.interfaces';

@Component({
  selector: 'app-message-dialog',
  templateUrl: './message-dialog.component.html',
  styleUrls: ['./message-dialog.component.scss']
})
export class MessageDialogComponent implements OnInit {

  data$!: Observable<MessageDialog>;

  constructor(private ngrxDialogFacade: NgrxDialogFacade) { }

  ngOnInit(): void {
    this.data$ = this.ngrxDialogFacade.messageDialogData$;
  }

}
