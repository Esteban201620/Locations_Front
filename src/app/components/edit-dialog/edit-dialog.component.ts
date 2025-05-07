import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { EditDialogData } from '../../models/dialog.models';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule
  ]
})
export class EditDialogComponent {
  nameControl = new FormControl('', [Validators.required]);
  title: string;
  placeholder: string;

  constructor(
    public dialogRef: MatDialogRef<EditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EditDialogData
  ) {
    this.nameControl.setValue(data.currentValue || '');
    
    switch (data.type) {
      case 'country':
        this.title = data.currentValue ? 'Editar País' : 'Agregar País';
        this.placeholder = 'Nombre del país';
        break;
      case 'department':
        this.title = data.currentValue ? 'Editar Departamento' : 'Agregar Departamento';
        this.placeholder = 'Nombre del departamento';
        break;
      case 'city':
        this.title = data.currentValue ? 'Editar Ciudad' : 'Agregar Ciudad';
        this.placeholder = 'Nombre de la ciudad';
        break;
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.nameControl.valid) {
      this.dialogRef.close(this.nameControl.value);
    }
  }
}