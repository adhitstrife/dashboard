import customerPayload from "@/app/interface/payload/customerPayload";
import useEditCustomer from "@/hooks/customer/useEditCustomer";
import useGetListCustomer from "@/hooks/customer/useGetListCustomer";
import useGetCities from "@/hooks/region/useGetCities";
import useGetDistrict from "@/hooks/region/useGetDistrict";
import useGetProvinces from "@/hooks/region/useGetProvince";
import useGetSubDistricts from "@/hooks/region/useGetSubDistrict";
import { customerEditModalAtom } from "@/state/component_state/modal/customerEditModalAtom";
import { customerDetailAtom } from "@/state/data/customerDetailAtom";
import { Button, Loader, Modal, NumberInput, Select, TextInput } from "@mantine/core"
import { useAtom } from "jotai";
import { useEffect, useState } from "react";

export const CustomerEditModal = () => {
    const [isModalOpen, setIsModalOpen] = useAtom(customerEditModalAtom);
    const [detailCustomer, setDetailCustomer] = useAtom(customerDetailAtom);
    const [editCustomerPayload, setEditCustomerPayload] = useState<customerPayload>({
        address: "",
        city_id: null,
        contact_person: "",
        district_id: null,
        name: "",
        npwp: "",
        permission_letter: "",
        phone: "",
        province_id: null,
        sub_district_id: null,
    })
    const { getCountryList, cities, isLoadingGetCities } = useGetCities()
    const { getProvinceList, isLoadingGetProvinces, provinces } = useGetProvinces()
    const { districts, getDistrictList, isLoadingGetDistrict} = useGetDistrict();
    const { getSubDistrictList, isLoadingGetSubDistrict, subDistricts} = useGetSubDistricts();
    const { isLoadingEditCustomer, updateNewCustomer } = useEditCustomer();
    const { isLoadingGetListCustomer,  getListCustomer } = useGetListCustomer();

    
    useEffect(() => {
        console.log(isModalOpen)
    },[isModalOpen])
    const clearPayload = () => {
        setEditCustomerPayload({
            address: "",
            city_id: null,
            contact_person: "",
            district_id: null,
            name: "",
            npwp: "",
            permission_letter: "",
            phone: "",
            province_id: null,
            sub_district_id: null,
        })
    }

    const onCloseModal = () => {
        clearPayload()
        setDetailCustomer(null)
        setIsModalOpen(false)
    }

    const searchProvince = (e: string) => {
        getProvinceList(e)
    }
    const searchCity = (e: string) => {
        getCountryList(e, editCustomerPayload.province_id)
    }

    const searchDistrict = (e: string) => {
        getDistrictList(e, editCustomerPayload.city_id)
    }

    const searchSubDistrict = (e: string) => {
        getSubDistrictList(e, editCustomerPayload.district_id)
    }
    
    useEffect(() => {
        if (isModalOpen && detailCustomer) {
            setEditCustomerPayload({
                address: detailCustomer.address,
                city_id: detailCustomer.city.id,
                contact_person: detailCustomer.contact_person,
                district_id: detailCustomer.district.id,
                name: detailCustomer.name,
                npwp: detailCustomer.npwp,
                permission_letter: detailCustomer.permission_letter,
                phone: detailCustomer.phone,
                province_id: detailCustomer.province.id,
                sub_district_id: detailCustomer.sub_district.id,
            })
        }
    },[isModalOpen])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            if (detailCustomer) {
                await updateNewCustomer(detailCustomer.id, editCustomerPayload);
            }
        } catch (error) {
            console.log(error)
        } finally {
            clearPayload();
            getListCustomer(1, 10)
            setIsModalOpen(false)
            setDetailCustomer(null)
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setEditCustomerPayload({
            ...editCustomerPayload,
            [name]: value
        });
    }

    const handleNumberInput = (name: string, value: string | null | number) => {
        setEditCustomerPayload({
            ...editCustomerPayload,
            [name]: value
        })
    }

    const handleSelectChange = (name: string, e: string | null) => {
        if (e) {
            const value = parseInt(e)
            setEditCustomerPayload({
                ...editCustomerPayload,
                [name]: value
            })
        }
    }

    return (
        <Modal opened={isModalOpen} onClose={onCloseModal} title="Add new sales">
            <form onSubmit={handleSubmit}>
                <TextInput
                    label="Name"
                    placeholder="Input customer name"
                    name="name"
                    mt={10}
                    onChange={handleChange}
                    value={editCustomerPayload.name}
                    withAsterisk
                    required
                />
                <TextInput
                    label="Contact Person"
                    placeholder="Input who can be contacted"
                    name="contact_person"
                    mt={10}
                    onChange={handleChange}
                    value={editCustomerPayload.contact_person}
                    withAsterisk
                    required
                />
                <NumberInput
                    label="Phone"
                    placeholder="Input customer phone number"
                    mt={10}
                    hideControls
                    onChange={(e) => handleNumberInput('phone', e)}
                    value={editCustomerPayload.phone}
                    withAsterisk
                    required
                />
                <TextInput
                    label="Permission letter number"
                    placeholder="Input customer permission letter number"
                    name="permission_letter"
                    mt={10}
                    onChange={handleChange}
                    value={editCustomerPayload.permission_letter}
                    withAsterisk
                    required
                />
                <NumberInput
                    label="NPWP"
                    placeholder="Input customer NPWP"
                    mt={10}
                    hideControls
                    onChange={(e) => handleNumberInput('npwp', e)}
                    value={editCustomerPayload.npwp}
                    withAsterisk
                    required
                />
                <Select
                    label="Province"
                    placeholder={detailCustomer?.province.name || "Pick customer province"}
                    mt={10}
                    data={provinces}
                    name="province_id"
                    searchable
                    onSearchChange={(e) => searchProvince(e)}
                    onChange={(e) => handleSelectChange('province_id', e)}
                    withAsterisk
                />
                <Select
                    label="City"
                    placeholder={detailCustomer?.city.name || "Pick customer city"}
                    mt={10}
                    data={cities}
                    name="city_id"
                    searchable
                    onSearchChange={(e) => searchCity(e)}
                    onChange={(e) => handleSelectChange('city_id', e)}
                    disabled={!editCustomerPayload.province_id}
                    onFocus={(e) => searchCity(e.target.value)}
                    withAsterisk
                />
                <Select
                    label="District"
                    placeholder={detailCustomer?.district.name || "Pick customer district"}
                    mt={10}
                    data={districts}
                    name="district_id"
                    searchable
                    onSearchChange={(e) => searchDistrict(e)}
                    onChange={(e) => handleSelectChange('district_id', e)}
                    disabled={!editCustomerPayload.city_id}
                    onFocus={(e) => searchDistrict(e.target.value)}
                    withAsterisk
                />
                <Select
                    label="Sub District"
                    placeholder={detailCustomer?.sub_district.name || "Pick customer sub district"}
                    mt={10}
                    data={subDistricts}
                    name="sub_district_id"
                    searchable
                    onSearchChange={(e) => searchSubDistrict(e)}
                    onChange={(e) => handleSelectChange('sub_district_id', e)}
                    disabled={!editCustomerPayload.district_id}
                    onFocus={(e) => searchSubDistrict(e.target.value)}
                    withAsterisk
                />
                <TextInput
                    label="Address"
                    placeholder="Input Address"
                    value={editCustomerPayload.address}
                    mt={10}
                    onChange={handleChange}
                    name="address"
                    withAsterisk
                    required
                />
                <Button type="submit" variant="filled" color="primary-red" mt={20} fullWidth>
                    {isLoadingEditCustomer ? <Loader color='white' size={'sm'} /> : 'Update'}
                </Button>
            </form>
        </Modal>
    )
}