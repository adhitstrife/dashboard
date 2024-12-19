interface salesCity {
    id: number;
    name: string;
    province_id: number
}
interface salesData {
    id:number;
    username: string;
    name: string;
    password: string;
    password2: string;
    birth_place: salesCity;
    gender: string;
    religion: string;
    blood_type: string;
    email: string;
    phone: string;
    address: string;
    postal_code: string;
    nip: string;
    employee_status: string;
    job_level: string;
    joining_date: string;
    bank_name: string;
    account_name: string;
    account_number: string;
    city: salesCity;
}

export default salesData