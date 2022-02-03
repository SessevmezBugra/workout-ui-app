import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NgrxFormsFacade } from 'src/app/ngrx-form/+state/ngrx-forms.facade';
import { Field } from 'src/app/ngrx-form/+state/ngrx-forms.interfaces';
import { NgrxDialogFacade } from '../../+state/ngrx-dialog.facade';
import { FormDialog } from '../../+state/ngrx-dialog.interfaces';

@Component({
  selector: 'app-form-dialog',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.scss']
})
export class FormDialogComponent implements OnInit {
  
  data$!: Observable<FormDialog>;
  formStructure$!: Observable<Field[]>;
  formData$!: Observable<any>;

  constructor(private ngrxDialogFacade: NgrxDialogFacade) { }

  ngOnInit(): void {
    this.data$ = this.ngrxDialogFacade.formDialogData$;
    this.formStructure$ = this.ngrxDialogFacade.formDialogFormStructure$;
    this.formData$ = this.ngrxDialogFacade.formDialogFormData$;
  }

  updateForm(changes: any) {
    this.ngrxDialogFacade.updateFormDialogFormData(changes);
  }

}
