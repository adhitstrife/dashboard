import attendanceData from "./leaveData";
import leaveData from "./leaveData";

interface attendanceListResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: attendanceData[]
}

export default attendanceListResponse;