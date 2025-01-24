import customerPayload from "@/app/interface/payload/customerPayload";
import useEditAccount from "@/hooks/account/usEditAccount";
import useAddAccount from "@/hooks/account/useAddAccount";
import useGetListAccounts from "@/hooks/account/useGetListAccounts";
import useEditCustomer from "@/hooks/customer/useEditCustomer";
import useGetListCustomer from "@/hooks/customer/useGetListCustomer";
import useGetCities from "@/hooks/region/useGetCities";
import useGetDistrict from "@/hooks/region/useGetDistrict";
import useGetProvinces from "@/hooks/region/useGetProvince";
import useGetSubDistricts from "@/hooks/region/useGetSubDistrict";
import { accountAddModalAtom } from "@/state/component_state/modal/account/accountAddModalAtom";
import { accountEditModalAtom } from "@/state/component_state/modal/account/accountEditModalAtom";
import { customerEditModalAtom } from "@/state/component_state/modal/customerEditModalAtom";
import { accountDetailAtom } from "@/state/data/account/accountDetailAtom";
import { customerDetailAtom } from "@/state/data/customer/customerDetailAtom";
import { Button, Loader, Modal, NumberInput, PasswordInput, Select, TextInput } from "@mantine/core"
import { useAtom, useAtomValue } from "jotai";
import { useEffect, useState } from "react";

export const AccountEditModal = () => {
    const [isModalOpen, setIsModalOpen] = useAtom(accountEditModalAtom);
    const [accountDetail, setDetailAccount] = useAtom(accountDetailAtom);

    const [editAccountPayload, setEditAccountPayload] = useState<accountPayload>({
        name: "",
        email: "",
        password: "",
        password2: "",
        username: "",
        user_type: ""
    })

    const { getListAccount, isLoadingGetListAccount } = useGetListAccounts();
    const { isLoadingEditAccount, editAccount } = useEditAccount()

    useEffect(() => {
        if (isModalOpen && accountDetail) {
            console.log(accountDetail)
            setEditAccountPayload({
                name: accountDetail.name,
                email: accountDetail.email,
                password: accountDetail.password,
                password2: accountDetail.password2,
                username: accountDetail.username,
                user_type: accountDetail.user_type
            })
        }
    },[isModalOpen])

    const clearPayload = () => {
        setEditAccountPayload({
            name: "",
            email: "",
            password: "",
            password2: "",
            username: "",
            user_type: ""
        })
    }

    const onCloseModal = () => {
        clearPayload()
        setIsModalOpen(false)
        setDetailAccount(null)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            if (accountDetail) {
                await editAccount(accountDetail.id, editAccountPayload)
            }
        } catch (error) {
            console.log(error)
        } finally {
            onCloseModal()
            getListAccount()
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setEditAccountPayload({
            ...editAccountPayload,
            [name]: value
        });
    }

    const handleSelectChange = (name: string, e: string | null) => {
        if (e) {
            setEditAccountPayload({
                ...editAccountPayload,
                [name]: e
            })
        }
    }

    return (
        <Modal opened={isModalOpen} onClose={onCloseModal} title="Update Admin Data">
            <form onSubmit={handleSubmit}>
                <TextInput
                    label="Username"
                    placeholder="Input Username"
                    name="username"
                    mt={10}
                    onChange={handleChange}
                    value={editAccountPayload.username}
                    withAsterisk
                    required
                />
                <TextInput
                    label="Name"
                    placeholder="Input Name"
                    name="name"
                    mt={10}
                    onChange={handleChange}
                    value={editAccountPayload.name}
                    withAsterisk
                    required
                />
                <TextInput
                    label="Email"
                    placeholder="Input Email"
                    name="email"
                    mt={10}
                    onChange={handleChange}
                    value={editAccountPayload.email}
                    type="email"
                    withAsterisk
                    required
                />
                <Select
                    label="Account Type"
                    placeholder="Pick account type"
                    data={['Staff', 'Manager' ]}
                    name="user_type"
                    mt={10}
                    onChange={(e) => handleSelectChange('user_type', e)}
                    value={editAccountPayload.user_type}
                />
                <PasswordInput label="Password" mt={10} name='password' onChange={(e) => handleChange(e)} placeholder='Password' />
                <PasswordInput label="Confirm Password" mt={10} name='password2' onChange={(e) => handleChange(e)} placeholder='Password' />
                <Button type="submit" variant="filled" color="primary-red" mt={20} fullWidth>
                    {isLoadingEditAccount ? <Loader color='white' size={'sm'} /> : 'Update'}
                </Button>
            </form>
        </Modal>
    )
}