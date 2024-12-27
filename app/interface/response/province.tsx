interface Province {
    id: number;
    name: string;
}

interface provincesResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: Province[]
}
export default provincesResponse