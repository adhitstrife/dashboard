interface District {
    id: number;
    name: string;
    city_id: number;
    province_id: number;
}

interface districtsResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: District[]
}
export default districtsResponse