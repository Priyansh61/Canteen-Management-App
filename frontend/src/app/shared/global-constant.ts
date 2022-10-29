export class GlobalConstant {
    public static genericErrorMessage = 'Something went wrong. Please try again later.';
    public static genericSuccessMessage = 'Success';

    public static unauthorizedErrorMessage = 'You are not authorized to perform this action.';
    public static loginAgainMessage = 'Please login again to continue.';
    
    public static namePattern = '[a-zA-Z0-9 ]*';
    public static emailPattern = '[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}';
    public static passwordPattern = "[a-zA-Z0-9 ]*";

    
    public static contactNumberPattern = '^[e0-9]{10,10}$';

    public static error:string = 'error';
    
}