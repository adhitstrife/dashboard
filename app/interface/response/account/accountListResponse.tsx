interface accountListResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: accountData[]
}

export default accountListResponse;