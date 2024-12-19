import salesData from "./salesData";

interface salesListResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: salesData[]
}

export default salesListResponse;