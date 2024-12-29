import useApproveCustomer from "@/hooks/customer/useApproveCustomer";
import useDeleteCustomer from "@/hooks/customer/useDeleteCustomer";
import useGetListCustomer from "@/hooks/customer/useGetListCustomer";
import { customerApproveModalAtom } from "@/state/component_state/modal/customerApproveModalAtom";
import { customerDetailAtom } from "@/state/data/customerDetailAtom";
import { Button, Loader, Modal } from "@mantine/core"
import { useAtom } from "jotai";
import { useEffect } from "react";

export const CustomerApproveModal = () => {
    const [detailCustomer, setDetailCustomer] = useAtom(customerDetailAtom);
    const [isModalOpen, setIsModalOpen] = useAtom(customerApproveModalAtom);
    const { isLoadingGetListCustomer,  getListCustomer } = useGetListCustomer();
    const { approveCustomer, isLoadingApproveCustomer } = useApproveCustomer();

    useEffect(() => {
        console.log(isModalOpen)
    },[isModalOpen])

    const onCloseModal = () => {
        setDetailCustomer(null)
        setIsModalOpen(false)
    }

    const handleDelete = async () => {
        if (detailCustomer) {
            try {
                await approveCustomer(detailCustomer.id)
            } catch (error) {
                console.log(error)
            } finally {
                getListCustomer(1, 10)
                setIsModalOpen(false)
                setDetailCustomer(null)
            }
        }
    }

    return (
        <Modal opened={isModalOpen} withCloseButton onClose={onCloseModal} size="lg" title={`Arpprove ${detailCustomer?.name} as customer`}>
            <Button onClick={handleDelete} type="submit" variant="filled" color="primary-red" mt={20} fullWidth>
                {isLoadingApproveCustomer ? <Loader color='white' size={'sm'} /> : 'Approve'}
            </Button>
        </Modal>
    )
}