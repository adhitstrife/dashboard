interface Country {
    id: number;
    name: string;
    province_id: number
}

interface countryResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: Country[]
}
export default countryResponse