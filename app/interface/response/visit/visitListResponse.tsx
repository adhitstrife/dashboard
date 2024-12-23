import visitData from "./visitData";

interface visitListResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: visitData[]
}

export default visitListResponse;