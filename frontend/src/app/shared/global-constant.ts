export class GlobalConstant {
    public static genericErrorMessage = 'Something went wrong. Please try again later.';
    public static genericSuccessMessage = 'Success';
    
    public static namePattern = '^[a-zA-Z ]*$';
    public static emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
    public static passwordPattern = '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})';
    
    public static contactNumberPattern = '^[0-9]*$';

    public static error:string = 'error';
    
}