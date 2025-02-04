interface salesPayload {
    username: string;
    name: string;
    password: string;
    password2: string;
    birth_place_id: number | null;
    gender: string;
    religion: string;
    email: string;
    phone: string;
    address: string;
    postal_code: string;
    nip: string;
    employee_status: string;
    job_level: string;
    joining_date: string;
    city_id: number | null;
    supervisor_id: number | null;
    division: string | null;
    area: string | null;
    user_type: string | null
}

export default salesPayload;