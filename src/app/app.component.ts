import { Component } from '@angular/core';
import { LocationsTableComponent } from './components/locations-table/locations-table.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [
    MatToolbarModule,
    MatCardModule,
    LocationsTableComponent
  ]
})
export class AppComponent {
  title = 'Locations Manager';
}