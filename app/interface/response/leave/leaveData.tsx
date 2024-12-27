interface customerCity {
    id: number;
    name: string;
    province_id: number
}

interface leaveData {
    id:number;
    user_id: number;
    leave_reason: string;
    category: string;
    start_date: string;
    end_date: string;
    notes: string;
}

export default leaveData