import customerData from "@/app/interface/response/customer/customerData";
import { customerDetailModalAtom } from "@/state/component_state/modal/customerDetailModalAtom";
import { customerDetailAtom } from "@/state/data/customer/customerDetailAtom";
import { Box, Center, Grid, Modal } from "@mantine/core"
import { useAtom } from "jotai";
import { FC, useEffect } from "react";
import { DataLabel } from "../../label/dataLabel";
import useGetListVisit from "@/hooks/visit/useGetListVisit";
import { VisitTable } from "../../table/visitTable";


export const CustomerDetailModal = () => {
    const [detailCustomer, setDetailCustomer] = useAtom(customerDetailAtom);
    const [isModalOpen, setIsModalOpen] = useAtom(customerDetailModalAtom);
    const { isLoadingGetListVisit, getListVisit, visitData } = useGetListVisit();

    const onCloseModal = () => {
        setDetailCustomer(null)
        setIsModalOpen(false)
    }

    useEffect(() => {
        if (isModalOpen && detailCustomer) {
            getListVisit(1,10,undefined,undefined,undefined,detailCustomer.id)
        }
        console.log(isModalOpen)
    },[isModalOpen])

    return (
        <Modal size={'lg'} opened={isModalOpen} onClose={onCloseModal} title="Customer Detail">
            {detailCustomer && (
                <Box>
                    <div className="customer-name">
                        <Center>
                            <DataLabel label="Customer Name" value={detailCustomer.name} />
                        </Center>
                    </div>
                    <Grid mt={20}>
                    <Grid.Col span={6}>
                            <DataLabel label="Id" value={detailCustomer.id.toString()} />
                        </Grid.Col>
                        <Grid.Col span={6}>
                            <DataLabel label="Contact Person" value={detailCustomer.contact_person} />
                        </Grid.Col>
                        <Grid.Col span={6}>
                            <DataLabel label="Phonenumber" value={detailCustomer.phone} />
                        </Grid.Col>
                        <Grid.Col span={6}>
                            <DataLabel label="NPWP" value={detailCustomer.npwp} />
                        </Grid.Col>
                        <Grid.Col span={6}>
                            <DataLabel label="Permission Letter" value={detailCustomer.permission_letter} />
                        </Grid.Col>
                        <Grid.Col span={6}>
                            <DataLabel label="Status" value={detailCustomer.status} />
                        </Grid.Col>
                        <Grid.Col span={6}>
                            <DataLabel label="Sales Name" value={detailCustomer.sales ? detailCustomer.sales.name : "-"} />
                        </Grid.Col>
                        <Grid.Col span={6}>
                            <DataLabel label="Address" value={detailCustomer.address} />
                        </Grid.Col>
                        <Grid.Col span={6}>
                            <DataLabel label="Province" value={detailCustomer.province.name} />
                        </Grid.Col>
                        <Grid.Col span={6}>
                            <DataLabel label="City" value={detailCustomer.city.name} />
                        </Grid.Col>
                        <Grid.Col span={6}>
                            <DataLabel label="District" value={detailCustomer.district.name} />
                        </Grid.Col>
                        <Grid.Col span={6}>
                            <DataLabel label="Sub District" value={detailCustomer.sub_district.name} />
                        </Grid.Col>
                    </Grid>
                    <Box mt={40}>
                        <DataLabel label="Visit History" value="" withValue={false} />
                        {visitData && (
                            <VisitTable visitList={visitData} />
                        )}
                    </Box>
                </Box>
            )}
        </Modal>
    )
}