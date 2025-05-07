import { EntityType } from "./location.models";

export interface DialogData {
    title: string;
    message?: string;
    confirmText?: string;
    cancelText?: string;
  }
  
  export interface EditDialogData {
    type: EntityType;
    currentValue?: string;
  }