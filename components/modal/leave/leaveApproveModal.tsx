import leaveData from "@/app/interface/response/leave/leaveData";
import useApproveCustomer from "@/hooks/customer/useApproveCustomer";
import useDeleteCustomer from "@/hooks/customer/useDeleteCustomer";
import useGetListCustomer from "@/hooks/customer/useGetListCustomer";
import { customerApproveModalAtom } from "@/state/component_state/modal/customerApproveModalAtom";
import { leaveApproveModalAtom } from "@/state/component_state/modal/leave/leaveApproveModalAtom";
import { customerDetailAtom } from "@/state/data/customer/customerDetailAtom";
import { Button, Loader, Modal } from "@mantine/core"
import { useAtom } from "jotai";
import { useEffect } from "react";

export const LeaveApproveModal = () => {
    const [detailCustomer, setDetailCustomer] = useAtom(customerDetailAtom);
    const [isModalOpen, setIsModalOpen] = useAtom(leaveApproveModalAtom);
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
        <Modal opened={isModalOpen} withCloseButton onClose={onCloseModal} size="lg" title={`Arpprove this leave request ?`}>
            <Button onClick={handleDelete} type="submit" variant="filled" color="primary-red" mt={20} fullWidth>
                {isLoadingApproveCustomer ? <Loader color='white' size={'sm'} /> : 'Approve'}
            </Button>
        </Modal>
    )
}