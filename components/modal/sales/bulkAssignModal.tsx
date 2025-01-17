import customerBulkAssign from "@/app/interface/payload/customerBulkAssign";
import salesData from "@/app/interface/response/sales/salesData";
import useGetListCustomer from "@/hooks/customer/useGetListCustomer";
import useBulkAssignCustomer from "@/hooks/sales/useBulkAssignCustomer";
import useGetListSales from "@/hooks/sales/useGetListSales";
import { salesBulkAssignAtom } from "@/state/component_state/modal/sales/salesBulkAssignAtom";
import { Button, Modal, MultiSelect, Select } from "@mantine/core"
import { useAtom } from "jotai";
import { useEffect, useState } from "react";

interface selectedSalesProps {
    salesData?: salesData | null
}

export const BulkAssignModal: React.FC<selectedSalesProps> = ({ salesData }) => {
    const [isModalOpen, setIsModalOpen] = useAtom(salesBulkAssignAtom);
    const [bulkAssignPayload, setBulkAssignPayload] = useState<customerBulkAssign>({
        sales_id: null,
        customer_ids: []
    })

    const { isLoadingGetListSales, getListSales, listForSelesSelect } = useGetListSales();
    const { isLoadingGetListCustomer, getListCustomer, listForCustomerSelect } = useGetListCustomer();
    const { isLoadingBulkAssignCustomer, assignCustomers } = useBulkAssignCustomer()

    const onCloseModal = () => {
        setIsModalOpen(false)
        setBulkAssignPayload({
            sales_id: null,
            customer_ids: []
        })
    }

    const searchSales = (e: string) => {
        getListSales(1, 10, e)
    }

    const searchCustomers = (e: string) => {
        getListCustomer(1, 10, e)
    }

    const selectSalesToAssign = (e: string | null) => {
        if (e) {
            setBulkAssignPayload({
                ...bulkAssignPayload,
                sales_id: parseInt(e)
            })
        }
    }

    useEffect(() => {
        console.log(salesData)
        // If salesData is passed, set the sales_id in the payload
        if (salesData?.id) {
          setBulkAssignPayload((prevPayload) => ({
            ...prevPayload,
            sales_id: salesData.id,
          }));
        }
      }, [salesData]);

    const updateCustomerPayload = (e: string[]) => {
        setBulkAssignPayload((prevPayload) => {
            const newIds = e.map((id) => parseInt(id, 10)); // Convert strings to integers

            // Update the customer_ids to match the currently selected values
            return {
                ...prevPayload,
                customer_ids: newIds,
            };
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
                await assignCustomers(bulkAssignPayload);
        } catch (error) {
            console.log(error)
        } finally {
            getListCustomer(1, 10)
            getListSales(1,10)
            onCloseModal()
        }
    }

    return (
        <Modal opened={isModalOpen} withCloseButton onClose={onCloseModal} size="lg" title={salesData ? `Bulk assign customer to ${salesData.username}` : "Bulk assign customer to sales"}>
            <form onSubmit={handleSubmit}>
                {!salesData && (
                    <Select
                        label="Sales"
                        placeholder="Search sales name"
                        mt={10}
                        data={listForSelesSelect}
                        name="sales_id"
                        searchable
                        onSearchChange={(e) => searchSales(e)}
                        onChange={(e) => selectSalesToAssign(e)}
                        withAsterisk
                        nothingFoundMessage="No sales found..."
                    />
                )}
                <MultiSelect
                    label="Customers"
                    placeholder="Select customers that will be assign to above sales"
                    mt={10}
                    data={listForCustomerSelect}
                    name="customer_ids"
                    searchable
                    onSearchChange={(e) => searchCustomers(e)}
                    onChange={(e) => updateCustomerPayload(e)}
                    withAsterisk
                    nothingFoundMessage="No customers found..."

                />
                <Button type="submit" variant="filled" color="primary-red" mt={20} fullWidth>
                    Save
                </Button>
            </form>
        </Modal>
    )
}