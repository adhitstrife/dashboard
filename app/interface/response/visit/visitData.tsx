import customerData from "../customer/customerData";
import salesData from "../sales/salesData";

interface product {
    name: string;
    quantity: number;
}
interface visitData {
    id:number;
    sales: salesData;
    customer: customerData;
    category: string;
    visit_date: string;
    participant: string;
    products: product[];
    notes: string;
    latitude: string;
    longitude: string;
    image_path: string;
    image_paths: string[];
}

export default visitData