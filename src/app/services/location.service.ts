import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Country, CountryCreate, Department, DepartmentCreate, City, CityCreate } from '../models/location.models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  constructor(private api: ApiService) { }


  getCountries(): Observable<Country[]> {
    return this.api.get<Country[]>('/api/paises');
  }

  createCountry(country: CountryCreate): Observable<Country> {
    return this.api.post<Country>('/api/paises', country);
  }

  updateCountry(id: number, country: CountryCreate): Observable<Country> {
    return this.api.put<Country>(`/api/paises/${id}`, country);
  }

  deleteCountry(id: number): Observable<boolean> {
    return this.api.delete<boolean>(`/api/paises/${id}`);
  }


  getDepartments(countryId: number): Observable<Department[]> {
    return this.api.get<Department[]>(`/api/departamentos/${countryId}`);
  }

  createDepartment(department: DepartmentCreate): Observable<Department> {
    return this.api.post<Department>('/api/departamentos', department);
  }

  updateDepartment(id: number, department: DepartmentCreate): Observable<Department> {
    return this.api.put<Department>(`/api/departamentos/${id}`, department);
  }

  deleteDepartment(id: number): Observable<boolean> {
    return this.api.delete<boolean>(`/api/departamentos/${id}`);
  }


  getCities(departmentId: number): Observable<City[]> {
    return this.api.get<City[]>(`/api/ciudades/${departmentId}`);
  }

  createCity(city: CityCreate): Observable<City> {
    return this.api.post<City>('/api/ciudades', city);
  }

  updateCity(id: number, city: CityCreate): Observable<City> {
    return this.api.put<City>(`/api/ciudades/${id}`, city);
  }

  deleteCity(id: number): Observable<boolean> {
    return this.api.delete<boolean>(`/api/ciudades/${id}`);
  }
}