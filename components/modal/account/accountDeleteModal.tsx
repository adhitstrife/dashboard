import customerPayload from "@/app/interface/payload/customerPayload";
import useEditAccount from "@/hooks/account/usEditAccount";
import useAddAccount from "@/hooks/account/useAddAccount";
import useDeleteAccount from "@/hooks/account/useDeleteAccount";
import useGetListAccounts from "@/hooks/account/useGetListAccounts";
import useEditCustomer from "@/hooks/customer/useEditCustomer";
import useGetListCustomer from "@/hooks/customer/useGetListCustomer";
import useGetCities from "@/hooks/region/useGetCities";
import useGetDistrict from "@/hooks/region/useGetDistrict";
import useGetProvinces from "@/hooks/region/useGetProvince";
import useGetSubDistricts from "@/hooks/region/useGetSubDistrict";
import { accountAddModalAtom } from "@/state/component_state/modal/account/accountAddModalAtom";
import { accountDeleteModalAtom } from "@/state/component_state/modal/account/accountDeleteModalAtom";
import { accountEditModalAtom } from "@/state/component_state/modal/account/accountEditModalAtom";
import { customerEditModalAtom } from "@/state/component_state/modal/customerEditModalAtom";
import { accountDetailAtom } from "@/state/data/account/accountDetailAtom";
import { customerDetailAtom } from "@/state/data/customer/customerDetailAtom";
import { Button, Loader, Modal, NumberInput, PasswordInput, Select, TextInput } from "@mantine/core"
import { useAtom, useAtomValue } from "jotai";
import { useEffect, useState } from "react";

export const AccountDeleteModal = () => {
    const [isModalOpen, setIsModalOpen] = useAtom(accountDeleteModalAtom);
    const [accountDetail, setDetailAccount] = useAtom(accountDetailAtom);


    const { getListAccount, isLoadingGetListAccount } = useGetListAccounts();
    const { deleteAccount, isLoadingDeleteAccount } = useDeleteAccount()


    const onCloseModal = () => {
        setIsModalOpen(false)
        setDetailAccount(null)
    }

    const handleDelete = async () => {
        try {
            if (accountDetail) {
                await deleteAccount(accountDetail.id)
            }
        } catch (error) {
            console.log(error)
        } finally {
            onCloseModal()
            getListAccount()
        }
    }


    return (
        <Modal opened={isModalOpen} onClose={onCloseModal} title="Are you sure want to delete this item ?">
            <Button onClick={handleDelete} type="submit" variant="filled" color="primary-red" mt={20} fullWidth>
                {isLoadingDeleteAccount ? <Loader color='white' size={'sm'} /> : 'Delete'}
            </Button>
        </Modal>
    )
}