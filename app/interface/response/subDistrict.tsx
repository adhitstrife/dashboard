interface SubDistrict {
    id: number;
    name: string;
    city_id: number;
    province_id: number;
    district_id: number
}

interface subDistrictsResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: SubDistrict[]
}
export default subDistrictsResponse