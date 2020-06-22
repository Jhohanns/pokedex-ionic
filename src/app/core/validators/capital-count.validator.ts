import { AbstractControl, ValidatorFn } from '@angular/forms';

export function capitalCountValidator(minNumberQuantity: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
        const value = control.value || '';
        const numberQuantity = (value.match(/[A-Z]/g) || []).length;

        return (numberQuantity < minNumberQuantity) && value ? { capitalquantity: true } : null;
    };
}
