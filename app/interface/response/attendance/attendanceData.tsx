import salesData from "../sales/salesData";

interface attendanceData {
    id:number;
    sales: salesData;
    latitude: string;
    longitude: string;
    clock_in_date: string;
    clock_in_time: string;
    clock_in_image: string | null;
    clock_out_date: string;
    clock_out_time: string;
}

export default attendanceData