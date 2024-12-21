import customerData from "./customerData";

interface customerListResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: customerData[]
}

export default customerListResponse;