import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Field } from '../../+state/ngrx-forms.interfaces';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputComponent implements OnInit{
  
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
