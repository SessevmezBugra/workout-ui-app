import { Component, OnInit, Input, ChangeDetectionStrategy, OnChanges } from '@angular/core';
import { Field } from '../../+state/ngrx-forms.interfaces';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextareaComponent {
  @Input() field!: Field;
  @Input() group!: FormGroup;
  formControl!: FormControl;

  ngOnInit(): void {
    this.formControl = this.getFormControl(this.field);
  }

  public getFormControl = (field: Field): FormControl => {
    return this.group.get(field.name) as FormControl;
  };

  getErrorMessage() {
    if (this.formControl.hasError('required')) {
      return 'Lutfen bu alani bos birakmayiniz';
    }
    return '';
  }
}
