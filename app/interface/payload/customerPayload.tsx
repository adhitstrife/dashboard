interface customerPayload {
    name: string;
    contact_person: string;
    permission_letter: string;
    phone: string;
    npwp: string;
    address: string;
    province_id: number | null;
    city_id: number | null;
    district_id: number | null;
    sub_district_id: number | null;
}

export default customerPayload;