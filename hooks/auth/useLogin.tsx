import { useState } from "react";
import Credentials from "../../app/interface/payload/login";
import axios from "axios";
import Cookies from 'js-cookie';
import loginResponse from "../../app/interface/response/login";
import { notifications } from "@mantine/notifications";
import { IconCheck } from "@tabler/icons-react";
import { useRouter } from "next/navigation";


const useLogin = () => {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const login = async (credentials: Credentials) => {
        try {
            setIsLoading(true);
            const url = '/backend/auth/login';
            const auth = await axios.post(url, credentials)
            const json: loginResponse = auth.data;
            Cookies.set('authToken', json.token.access);
            setIsLoading(false);
            notifications.show({
                title: 'Login Success',
                message: 'Authentication Success Welcome',
                color: 'primary-red',
                icon: <IconCheck size={20} stroke={1.5} />,
                position: 'top-right'
            })
            return router.push("/dashboard")
        } catch (error) {
            setIsLoading(false);
            if (axios.isAxiosError(error) && error.response?.status === 400) {
                notifications.show({
                    title: 'Login Failed',
                    message: 'Authentication Failed',
                    color: 'red',
                    icon: <IconCheck size={20} stroke={1.5} />,
                    position: 'top-right'
                })
            }
            return error;
        }
    }

    return { login, isLoading }
}

export default useLogin;