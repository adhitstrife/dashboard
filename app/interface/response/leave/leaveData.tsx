import salesData from "../sales/salesData";


interface leaveData {
    id:number;
    user: salesData;
    leave_reason: string;
    category: string;
    start_date: string;
    end_date: string;
    notes: string;
    status: string;
}

export default leaveData