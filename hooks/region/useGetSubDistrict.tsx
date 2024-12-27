import selectData from "@/app/interface/component/selectData";
import countryResponse from "@/app/interface/response/country";
import districtsResponse from "@/app/interface/response/district";
import subDistrictsResponse from "@/app/interface/response/subDistrict";
import { notifications } from "@mantine/notifications";
import { IconX } from "@tabler/icons-react";
import axios from "axios";
import Cookies from "js-cookie";
import { useState } from "react"

const useGetSubDistricts = () => {
    const [isLoadingGetSubDistrict, setIsLoadingGetSubDistrict] = useState(false);
    const [subDistricts, setSubDistricts] = useState<selectData[]>([]);

    const getSubDistrictList = async (name?: string | null, ditrict_id?: number | null) => {
        try {
            setIsLoadingGetSubDistrict(true);
            const url = '/backend/api/subdistricts';
            const response = await axios.get(`${url}?district_id=${ditrict_id ? ditrict_id : ''}&keyword=${name ? name : ''}`, {
                headers: {
                    'Authorization': `Bearer ${Cookies.get('authToken')}`
                }
            }
            );
            const json: subDistrictsResponse = response.data
            toString
            setSubDistricts(json.results.map((district) => ({
                value: district.id.toString(),
                label: district.name
            })))

        } catch (error) {
            notifications.show({
                title: 'Fetch failed',
                message: `Error when fetching districts ${error}`,
                color: 'red',
                icon: <IconX size={20} stroke={1.5} />,
                position: 'top-right'
            })
            return error;
        }
    }

    return { getSubDistrictList, subDistricts, isLoadingGetSubDistrict }
}
export default useGetSubDistricts;
