import useAddCustomerBulk from "@/hooks/customer/useAddCustomerBulk";
import useApproveCustomer from "@/hooks/customer/useApproveCustomer";
import useDeleteCustomer from "@/hooks/customer/useDeleteCustomer";
import useGetListCustomer from "@/hooks/customer/useGetListCustomer";
import { customerBulkModalAtom } from "@/state/component_state/modal/customer/customerBulkModalAtom";
import { customerApproveModalAtom } from "@/state/component_state/modal/customerApproveModalAtom";
import { customerDetailAtom } from "@/state/data/customer/customerDetailAtom";
import { Anchor, Button, FileInput, Group, Loader, Modal, Text } from "@mantine/core"
import { useAtom } from "jotai";
import Link from "next/link";
import { useEffect, useState } from "react";

export const CustomerBulkModal = () => {
    const [isModalOpen, setIsModalOpen] = useAtom(customerBulkModalAtom);
    const [file, setFile] = useState<File | null>(null)

    const { customerData, isLoadingAddCustomerBulk, postNewCustomerBulk } = useAddCustomerBulk();
    const { isLoadingGetListCustomer,  getListCustomer } = useGetListCustomer();

    const onCloseModal = () => {
        setIsModalOpen(false)
        setFile(null)
    }

    const handleUploadBulk = async () => {
        if (file) {
            try {
                await postNewCustomerBulk(file)
            } catch (error) {
                console.log(error)
            } finally {
                getListCustomer(1,10)
                onCloseModal()
            }
        }
    }

    const handleDownload = () => {
        const fileUrl = '/file/customers.xlsx'; // Path to the file in the public directory
        const link = document.createElement('a');
        link.href = fileUrl;
        link.download = 'customers.xlsx'; // The name of the file to save as
        link.click();
    };


    return (
        <Modal opened={isModalOpen} withCloseButton onClose={onCloseModal} size="lg" title="Import Bulk Customer">
            <FileInput
                label="Customer csv file"
                description={<Text size="sm">
                    You can download the CSV template{' '}
                    <Anchor c={"primary-red"} href="/file/customers.xlsx" target="_blank" rel="noopener noreferrer">
                        here
                    </Anchor>
                    .
                </Text>}
                placeholder="Input customer csv file in here"
                onChange={setFile}
            />
            <Group justify="right" mt={40}>
                <Button onClick={handleUploadBulk} color="primary-red" variant="filled">
                    Import
                </Button>
            </Group>
        </Modal>
    )
}