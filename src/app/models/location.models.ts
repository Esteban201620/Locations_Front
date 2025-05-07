  export interface Country {
    paisId: number;
    nombre: string;
    departamentos?: Department[];
  }
  
  export interface CountryCreate {
    nombre: string;
  }
  
  export interface Department {
    departamentoId: number;
    nombre: string;
    paisId: number;
    ciudades?: City[];
  }
  
  export interface DepartmentCreate {
    nombre: string;
    paisId: number;
  }
  
  export interface City {
    ciudadId: number;
    nombre: string;
    departamentoId: number;
  }
  
  export interface CityCreate {
    nombre: string;
    departamentoId: number;
  }
  
  export type EntityType = 'country' | 'department' | 'city';