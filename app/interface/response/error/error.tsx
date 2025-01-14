interface ErrorResponse {
    code: number;
    message: {
        [key: string]: string[]; // Generic structure for dynamic keys with string array values
    };
}

export default ErrorResponse