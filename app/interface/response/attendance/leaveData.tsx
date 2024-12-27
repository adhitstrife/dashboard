interface customerCity {
    id: number;
    name: string;
    province_id: number
}

interface attendanceData {
    id:number;
    sales_id: number;
    latitude: string;
    longitude: string;
    clock_in_date: string;
    clock_in_time: string;
}

export default attendanceData