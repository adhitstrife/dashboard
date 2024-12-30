import leaveData from "@/app/interface/response/leave/leaveData";
import useApproveCustomer from "@/hooks/customer/useApproveCustomer";
import useDeleteCustomer from "@/hooks/customer/useDeleteCustomer";
import useGetListCustomer from "@/hooks/customer/useGetListCustomer";
import useApproveLeave from "@/hooks/leave/useApproveLeave";
import useGetListLeave from "@/hooks/leave/useGetListLeave";
import { customerApproveModalAtom } from "@/state/component_state/modal/customerApproveModalAtom";
import { leaveApproveModalAtom } from "@/state/component_state/modal/leave/leaveApproveModalAtom";
import { customerDetailAtom } from "@/state/data/customer/customerDetailAtom";
import { leaveDetailAtom } from "@/state/data/leave/leaveDetailAtom";
import { leaveStatusAtom } from "@/state/data/leave/leaveStatusAtom";
import { Button, Loader, Modal, Text } from "@mantine/core"
import { useAtom } from "jotai";
import { useEffect } from "react";

export const LeaveApproveModal = () => {
    const [detailLeave, setDetailLeave] = useAtom(leaveDetailAtom);
    const [isModalOpen, setIsModalOpen] = useAtom(leaveApproveModalAtom);
    const [statusLeave, setStatusLeave] = useAtom(leaveStatusAtom);
    const { isLoadingGetListLeave,  getListLeave } = useGetListLeave();
    const { approveLeave, isLoadingApproveLeave } = useApproveLeave();

    useEffect(() => {
        console.log(isModalOpen)
    },[isModalOpen])

    const onCloseModal = () => {
        setDetailLeave(null)
        setIsModalOpen(false)
        setStatusLeave("")
    }

    const handleApprove = async () => {
        if (detailLeave) {
            try {
                await approveLeave(detailLeave.id)
            } catch (error) {
                console.log(error)
            } finally {
                getListLeave(1, 10)
                setIsModalOpen(false)
                setDetailLeave(null)
                setStatusLeave("")
            }
        }
    }

    return (
        <Modal opened={isModalOpen} withCloseButton onClose={onCloseModal} size="lg" title={`set this leave request as ${statusLeave} ?`}>
            <Button onClick={handleApprove} type="submit" variant="filled" color="primary-red" mt={20} fullWidth>
                {isLoadingApproveLeave ? <Loader color='white' size={'sm'} /> : <Text>{statusLeave}</Text>}
            </Button>
        </Modal>
    )
}