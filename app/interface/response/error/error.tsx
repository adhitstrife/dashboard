interface errorMessage {
    [key: string]: string[];
}

interface errorData {
    field: string;
    messages: errorMessage[]
}

interface ErrorResponse {
    code: number;
    error: errorData[]
}

export default ErrorResponse