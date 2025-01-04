import attendanceData from "./attendanceData";
import leaveData from "./attendanceData";

interface attendanceListResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: attendanceData[]
}

export default attendanceListResponse;