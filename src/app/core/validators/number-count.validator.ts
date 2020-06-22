import { AbstractControl, ValidatorFn } from '@angular/forms';

export function numberCountValidator(minNumberQuantity: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
        const value = control.value || '';
        const numberQuantity = (value.match(/[\d]/g) || []).length;

        return (numberQuantity < minNumberQuantity) && value ? { minnumberquantity: true } : null;
    };
}