import leaveData from "./leaveData";

interface leaveListResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: leaveData[]
}

export default leaveListResponse;