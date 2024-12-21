interface customerCity {
    id: number;
    name: string;
    province_id: number
}

interface customerData {
    id:number;
    name: string;
    phone: string;
    permission_letter: string;
    address: string;
    province: string;
    city: string;
    district: string;
    sub_district: string;
    sales_id: number
}

export default customerData