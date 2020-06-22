import { AbstractControl, ValidatorFn } from '@angular/forms';

export function specialCharacterValidator(minCharacters: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
        const value = control.value || '';
        const specialCharacterCount = (value.match(/[!@#$%^&*(),.?":{}|<>]/g) || []).length;

        return (specialCharacterCount < minCharacters) && value ? { specialcharacter: true } : null;
    };
}
