interface UserProfile {
    id: number;
    username: string;
    user_type: string;
    email: string;
    birth_place: string | null;
    birth_date: string | null;
    gender: string | null;
    religion: string | null;
    blood_type: string | null;
    phone: string | null;
    address: string | null;
    postal_code: string | null;
    city: string | null;
    employee_status: string | null;
    job_level: string | null;
    joining_date: string | null;
    bank_name: string | null;
    account_name: string | null;
    acoount_number: string | null;
    is_superuser: boolean;
    is_staff: boolean;
    is_first_login: boolean
}

export default UserProfile