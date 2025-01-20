interface ErrorResponse {
    code: number;
    detail: string;
    message: {
        [key: string]: string[]; // Generic structure for dynamic keys with string array values
    };
}

export default ErrorResponse