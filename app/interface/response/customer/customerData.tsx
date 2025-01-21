import salesData from "../sales/salesData";

interface customerProvince {
    id: number;
    name: string;
}

interface customerCity {
    id: number;
    name: string;
    province_id: number
}

interface customerDistrict {
    id: number;
    name: string;
    city_id: number;
    province_id: number;
}

interface customerSubDistrict {
    id: number;
    name: string;
    city_id: number;
    province_id: number;
    district_id: number
}

interface customerData {
    id:number;
    name: string;
    status: string;
    phone: string;
    permission_letter: string;
    contact_person: string;
    address: string;
    province: customerProvince;
    city: customerCity;
    district: customerDistrict;
    sub_district: customerSubDistrict;
    npwp: string;
    created_at: string;
    sales: salesData | null
}

export default customerData