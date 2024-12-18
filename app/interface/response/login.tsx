interface token {
    refresh: string;
    access: string;
}

interface loginResponse {
    id: number;
    username: string;
    user_type: string;
    token: token;
    is_first_login: boolean
}

export default loginResponse