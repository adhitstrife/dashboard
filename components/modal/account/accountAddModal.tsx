import customerPayload from "@/app/interface/payload/customerPayload";
import useAddAccount from "@/hooks/account/useAddAccount";
import useGetListAccounts from "@/hooks/account/useGetListAccounts";
import useEditCustomer from "@/hooks/customer/useEditCustomer";
import useGetListCustomer from "@/hooks/customer/useGetListCustomer";
import useGetCities from "@/hooks/region/useGetCities";
import useGetDistrict from "@/hooks/region/useGetDistrict";
import useGetProvinces from "@/hooks/region/useGetProvince";
import useGetSubDistricts from "@/hooks/region/useGetSubDistrict";
import { accountAddModalAtom } from "@/state/component_state/modal/account/accountAddModalAtom";
import { customerEditModalAtom } from "@/state/component_state/modal/customerEditModalAtom";
import { customerDetailAtom } from "@/state/data/customer/customerDetailAtom";
import { Button, Loader, Modal, NumberInput, PasswordInput, Select, TextInput } from "@mantine/core"
import { useAtom } from "jotai";
import { useEffect, useState } from "react";

export const AccountAddModal = () => {
    const [isModalOpen, setIsModalOpen] = useAtom(accountAddModalAtom);
    const [addAccountPayload, setAddAccountPayload] = useState<accountPayload>({
        name: "",
        email: "",
        password: "",
        password2: "",
        username: "",
        user_type: ""
    })

    const { getListAccount, isLoadingGetListAccount } = useGetListAccounts();
    const { isLoadingAddAccount, postNewAccount } = useAddAccount()

    const clearPayload = () => {
        setAddAccountPayload({
            name: "",
            email: "",
            password: "",
            password2: "",
            username: "",
            user_type: "",
        })
    }

    const onCloseModal = () => {
        clearPayload()
        setIsModalOpen(false)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            await postNewAccount(addAccountPayload)
        } catch (error) {
            console.log(error)
        } finally {
            onCloseModal()
            getListAccount()
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setAddAccountPayload({
            ...addAccountPayload,
            [name]: value
        });
    }

    const handleSelectChange = (name: string, e: string | null) => {
        if (e) {
            setAddAccountPayload({
                ...addAccountPayload,
                [name]: e
            })
        }
    }

    return (
        <Modal opened={isModalOpen} onClose={onCloseModal} title="Add new admin">
            <form onSubmit={handleSubmit}>
                <TextInput
                    label="Username"
                    placeholder="Input Username"
                    name="username"
                    mt={10}
                    onChange={handleChange}
                    withAsterisk
                    required
                />
                <TextInput
                    label="Name"
                    placeholder="Input Name"
                    name="name"
                    mt={10}
                    onChange={handleChange}
                    withAsterisk
                    required
                />
                <TextInput
                    label="Email"
                    placeholder="Input Email"
                    name="email"
                    mt={10}
                    onChange={handleChange}
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
                    value={addAccountPayload.user_type}
                />
                <PasswordInput label="Password" mt={10} name='password' onChange={(e) => handleChange(e)} placeholder='Password' />
                <PasswordInput label="Confirm Password" mt={10} name='password2' onChange={(e) => handleChange(e)} placeholder='Password' />
                <Button type="submit" variant="filled" color="primary-red" mt={20} fullWidth>
                    {isLoadingAddAccount ? <Loader color='white' size={'sm'} /> : 'Save'}
                </Button>
            </form>
        </Modal>
    )
}