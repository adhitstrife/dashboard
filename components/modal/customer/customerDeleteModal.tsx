import useDeleteCustomer from "@/hooks/customer/useDeleteCustomer";
import useGetListCustomer from "@/hooks/customer/useGetListCustomer";
import { customerDeleteModalAtom } from "@/state/component_state/modal/customerDeleteModalAtom";
import { customerDetailAtom } from "@/state/data/customer/customerDetailAtom";
import { Button, Loader, Modal } from "@mantine/core"
import { useAtom } from "jotai";

export const CustomerDeleteModal = () => {
    const [detailCustomer, setDetailCustomer] = useAtom(customerDetailAtom);
    const [isModalOpen, setIsModalOpen] = useAtom(customerDeleteModalAtom);
    const { deleteCustomer, isLoadingDeleteCustomer } = useDeleteCustomer()
    const { isLoadingGetListCustomer,  getListCustomer } = useGetListCustomer();


    const onCloseModal = () => {
        setDetailCustomer(null)
        setIsModalOpen(false)
    }

    const handleDelete = async () => {
        if (detailCustomer) {
            try {
                await deleteCustomer(detailCustomer.id)
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
        <Modal opened={isModalOpen} withCloseButton onClose={onCloseModal} size="lg" title="Are you sure want to delete this item">
            <Button onClick={handleDelete} type="submit" variant="filled" color="primary-red" mt={20} fullWidth>
                {isLoadingDeleteCustomer ? <Loader color='white' size={'sm'} /> : 'Delete'}
            </Button>
        </Modal>
    )
}