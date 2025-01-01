
import visitDetailResponse from "@/app/interface/response/visit/visitDetailResponse";
import { visitDetailAtom } from "@/state/data/visit/visitDetailAtom";
import { notifications } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons-react";
import axios from "axios";
import { useSetAtom } from "jotai";
import Cookies from "js-cookie";
import { useState } from "react"

const useGetVisitDetail = () => {
    const [isLoadingGetDetailVisit, setIsLoadingGetDetailVisit] = useState(false);

    const setVisitDetail = useSetAtom(visitDetailAtom)

    
    const getDetailVisit = async (id: number) => {
        try {
            setIsLoadingGetDetailVisit(true);
            const url = `/backend/api/visit/${id}`;
            const response = await axios.get(url, {
                headers: {
                    'Authorization': `Bearer ${Cookies.get('authToken')}`
                }
            }
            );
            const json: visitDetailResponse = response.data
            setVisitDetail(json.results)
        } catch (error) {
            notifications.show({
                title: 'Fetch Failed',
                message: `Error when fetch Visit detail ${error}`,
                color: 'red',
                icon: <IconX size={20} stroke={1.5} />,
                position: 'top-right'
            })
            return error;
        } finally {
            setIsLoadingGetDetailVisit(false)
        }
    }

    return { getDetailVisit, isLoadingGetDetailVisit }
}
export default useGetVisitDetail;
