import { useState } from "react";
import axios from "axios";
import Cookies from 'js-cookie';
import { notifications } from "@mantine/notifications";
import { IconCheck } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import UserProfile from "@/app/interface/response/userProfile";
import { useSetAtom } from "jotai";
import { userProfileAtom } from "@/state/data/user/userProfileAtom";


const useUserProfile = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [userProfile, setUserProfile] = useState<UserProfile>();
    const router = useRouter();

    const setUserProfileAtom = useSetAtom(userProfileAtom);

    const getUserProfile = async () => {
        try {
            setIsLoading(true);
            const url = '/backend/auth/current-user';
            const response = await axios.get(url, {
                headers: {
                    'Authorization': `Bearer ${Cookies.get('authToken')}`
                }
            }
            );
            const json: UserProfile = response.data
            setUserProfile(json)
            setUserProfileAtom(json)
        } catch (error) {
            setIsLoading(false);
            if (axios.isAxiosError(error) && error.response?.status === 401) {
                notifications.show({
                    title: 'Unauthorized',
                    message: 'Authentication Failed',
                    color: 'red',
                    icon: <IconCheck size={20} stroke={1.5} />,
                    position: 'top-right'
                })


            }
            return router.push("/login");
        }
    }

    return { getUserProfile, userProfile, isLoading }
}

export default useUserProfile;