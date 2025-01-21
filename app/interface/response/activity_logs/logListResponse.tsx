interface logListResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: logData[]
}

export default logListResponse;