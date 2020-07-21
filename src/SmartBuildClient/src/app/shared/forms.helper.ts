import { FormGroup, FormControl, FormArray } from '@angular/forms';

export abstract class FormsHelper {
  public static validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      } else if (control instanceof FormArray) {
        this.validateAllFormArrayFields(control);
      }
    });
  }

  private static validateAllFormArrayFields(formGroup: FormArray) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  public static clearFormValidations(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.updateValueAndValidity();
      } else if (control instanceof FormGroup) {
        this.clearFormValidations(control);
      } else if (control instanceof FormArray) {
        this.clearFormArrayValidations(control);
      }
    });
  }

  private static clearFormArrayValidations(formGroup: FormArray) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.updateValueAndValidity();
      } else if (control instanceof FormGroup) {
        this.clearFormValidations(control);
      }
    });
  }

  public static disableAllFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.disable();
      } else if (control instanceof FormGroup) {
        this.disableAllFields(control);
      } else if (control instanceof FormArray) {
        this.disableAllFormArrayFields(control);
      }
    });
  }

  private static disableAllFormArrayFields(formGroup: FormArray) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.disable();
      } else if (control instanceof FormGroup) {
        this.disableAllFields(control);
      }
    });
  }

  public static enableAllFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.enable();
      } else if (control instanceof FormGroup) {
        this.enableAllFields(control);
      } else if (control instanceof FormArray) {
        this.enableAllFormArrayFields(control);
      }
    });
  }

  private static enableAllFormArrayFields(formGroup: FormArray) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.enable();
      } else if (control instanceof FormGroup) {
        this.enableAllFields(control);
      }
    });
  }
}
