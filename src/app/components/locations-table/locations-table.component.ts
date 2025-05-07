import { Component, OnInit } from '@angular/core';
import { LocationService } from '../../services/location.service';
import { DialogService } from '../../services/dialog.service';
import { Country, Department, City, EntityType } from '../../models/location.models';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-locations-table',
  templateUrl: './locations-table.component.html',
  styleUrls: ['./locations-table.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatProgressBarModule,
    MatTableModule
  ]
})
export class LocationsTableComponent implements OnInit {
  countries: Country[] = [];
  loading = true;
  displayedColumns = ['name', 'actions'];

  constructor(
    private locationService: LocationService,
    private dialogService: DialogService
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.loading = true;
    this.locationService.getCountries().subscribe({
      next: (countries) => {
        this.countries = countries;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading countries:', err);
        this.loading = false;
      }
    });
  }

  // Country methods
  addCountry(): void {
    const dialogRef = this.dialogService.openEditDialog({
      type: 'country'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.locationService.createCountry({ nombre: result }).subscribe({
          next: () => this.loadData(),
          error: (err) => console.error('Error adding country:', err)
        });
      }
    });
  }

  editCountry(country: Country): void {
    const dialogRef = this.dialogService.openEditDialog({
      type: 'country',
      currentValue: country.nombre
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.locationService.updateCountry(country.paisId, { nombre: result })
          .subscribe({
            next: () => this.loadData(),
            error: (err) => console.error('Error updating country:', err)
          });
      }
    });
  }

  deleteCountry(id: number): void {
    const dialogRef = this.dialogService.openConfirmDialog({
      title: 'Eliminar país',
      message: '¿Estás seguro de que deseas eliminar este país y todos sus departamentos y ciudades?'
    });

    dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.locationService.deleteCountry(id).subscribe({
          next: () => this.loadData(),
          error: (err) => console.error('Error deleting country:', err)
        });
      }
    });
  }

  // Department methods
  // En locations-table.component.ts
  addDepartment(countryId: number): void {
    const dialogRef = this.dialogService.openEditDialog({
      type: 'department'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Intentando agregar departamento:', result); // ← Verifica esto
        this.locationService.createDepartment({ 
          nombre: result, 
          paisId: countryId 
        }).subscribe({
          next: (newDept) => {
            console.log('Departamento agregado:', newDept); // ← Verifica esto
            this.loadData(); // Recargar datos
          },
          error: (err) => {
            console.error('Error adding department:', err);
            // Muestra un mensaje al usuario
            this.dialogService.openConfirmDialog({
              title: 'Error',
              message: 'No se pudo agregar el departamento: ' + err.message
            });
          }
        });
      }
    });
  }

  editDepartment(department: Department): void {
    const dialogRef = this.dialogService.openEditDialog({
      type: 'department',
      currentValue: department.nombre
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.locationService.updateDepartment(
          department.departamentoId, 
          { nombre: result, paisId: department.paisId }
        ).subscribe({
          next: () => this.loadData(),
          error: (err) => console.error('Error updating department:', err)
        });
      }
    });
  }

  deleteDepartment(id: number): void {
    const dialogRef = this.dialogService.openConfirmDialog({
      title: 'Eliminar departamento',
      message: '¿Estás seguro de que deseas eliminar este departamento y todas sus ciudades?'
    });

    dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.locationService.deleteDepartment(id).subscribe({
          next: () => this.loadData(),
          error: (err) => console.error('Error deleting department:', err)
        });
      }
    });
  }

  // City methods
  addCity(departmentId: number): void {
    const dialogRef = this.dialogService.openEditDialog({
      type: 'city'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.locationService.createCity({ 
          nombre: result, 
          departamentoId: departmentId 
        }).subscribe({
          next: () => this.loadData(),
          error: (err) => console.error('Error adding city:', err)
        });
      }
    });
  }

  editCity(city: City): void {
    const dialogRef = this.dialogService.openEditDialog({
      type: 'city',
      currentValue: city.nombre
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.locationService.updateCity(
          city.ciudadId, 
          { nombre: result, departamentoId: city.departamentoId }
        ).subscribe({
          next: () => this.loadData(),
          error: (err) => console.error('Error updating city:', err)
        });
      }
    });
  }

  deleteCity(id: number): void {
    debugger
    const dialogRef = this.dialogService.openConfirmDialog({
      title: 'Eliminar ciudad',
      message: '¿Estás seguro de que deseas eliminar esta ciudad?'
    });
    debugger
    dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        debugger
        this.locationService.deleteCity(id).subscribe({
          next: () => this.loadData(),
          error: (err) => console.error('Error deleting city:', err)
        });
      }
    });
  }

  // getCountryRowSpan(pais: Country): number {
  //   let totalRows = 0;
  //   if (pais.departamentos && pais.departamentos.length) {
  //     pais.departamentos.forEach(dept => {
  //       if (dept.ciudades && dept.ciudades.length) {
  //         totalRows += dept.ciudades.length;
  //       } else {
  //         totalRows += 1; // Departamento sin ciudades
  //       }
  //     });
  //   } else {
  //     totalRows = 1; // País sin departamentos
  //   }
  //   return totalRows;
  // }
  
}