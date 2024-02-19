import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function formatDate(dateString: string){

    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    const formattedDate = `${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}-${year}`;

    return formattedDate
}


export function passwordValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const password: string = control.value;

        if(!password){
            return null;
        }
        
        const hasSpecialCharacters = /[!@#$%^&*()]/.test(password);
        const minLength = password.length >=8;
    
        if(!hasSpecialCharacters || !minLength){
          return {
            invalidPassword: true
          }
        }
        
        return null;
    }
}

