import customerData from "@/app/interface/response/customer/customerData";
import { customerDetailModalAtom } from "@/state/component_state/modal/customerDetailModalAtom";
import { customerDetailAtom } from "@/state/data/customer/customerDetailAtom";
import { Box, Center, Grid, Modal, Table, Tabs, Text } from "@mantine/core"
import { useAtom, useAtomValue } from "jotai";
import { FC, useEffect } from "react";
import { DataLabel } from "../../label/dataLabel";
import useGetListVisit from "@/hooks/visit/useGetListVisit";
import { VisitTable } from "../../table/visitTable";
import { visitListAtom } from "@/state/data/visit/visitListAtom";
import { visitDetailModalAtom } from "@/state/component_state/modal/visit/visitDetailModalAtom";
import { visitDetailAtom } from "@/state/data/visit/visitDetailAtom";
import { IconImageInPicture, IconListCheck, IconLocation } from "@tabler/icons-react";


export const VisitDetailModal = () => {
    const [detailVisit, setDetailVisit] = useAtom(visitDetailAtom);
    const [isModalOpen, setIsModalOpen] = useAtom(visitDetailModalAtom);
    const { isLoadingGetListVisit, getListVisit } = useGetListVisit();
    const visitData = useAtomValue(visitListAtom)

    const onCloseModal = () => {
        setDetailVisit(null)
        setIsModalOpen(false)
    }

    return (
        <Modal size={'lg'} opened={isModalOpen} onClose={onCloseModal} title="Customer Detail">
            {detailVisit && (
                <Box>
                    <Grid mt={20}>
                        <Grid.Col span={6}>
                            <DataLabel label="Id" value={detailVisit.id.toString()} />
                        </Grid.Col>
                        <Grid.Col span={6}>
                            <DataLabel label="Customer Name" value={detailVisit.customer.name} />
                        </Grid.Col>
                        <Grid.Col span={6}>
                            <DataLabel label="Sales Name" value={detailVisit.sales.name} />
                        </Grid.Col>
                        <Grid.Col span={6}>
                            <DataLabel label="Category" value={detailVisit.category} />
                        </Grid.Col>
                        <Grid.Col span={6}>
                            <DataLabel label="Participant" value={detailVisit.participant} />
                        </Grid.Col>
                        <Grid.Col span={6}>
                            <DataLabel label="Visit Date" value={detailVisit.visit_date} />
                        </Grid.Col>
                    </Grid>
                    <Tabs defaultValue="products" mt={20}>
                        <Tabs.List>
                            <Tabs.Tab value="products" leftSection={<IconListCheck size={20} stroke={1.5} />}>
                                Products
                            </Tabs.Tab>
                            <Tabs.Tab value="location" leftSection={<IconLocation size={20} stroke={1.5} />}>
                                Location
                            </Tabs.Tab>
                            <Tabs.Tab value="image" leftSection={<IconImageInPicture size={20} stroke={1.5} />}>
                                Image
                            </Tabs.Tab>
                        </Tabs.List>

                        <Tabs.Panel value="products">
                            <Table.ScrollContainer minWidth={200} mt={20}>
                                <Table>
                                    <Table.Thead>
                                        <Table.Tr>
                                            <Table.Th>Name</Table.Th>
                                            <Table.Th>Quantity</Table.Th>
                                        </Table.Tr>
                                    </Table.Thead>
                                    {detailVisit.products && (
                                        <Table.Tbody>
                                            {detailVisit.products.map((product, index) => (
                                                <Table.Tr>
                                                    <Table.Td>{product.name}</Table.Td>
                                                    <Table.Td>{product.quantity}</Table.Td>
                                                </Table.Tr>
                                            ))}
                                        </Table.Tbody>
                                    )}
                                </Table>
                            </Table.ScrollContainer>
                        </Tabs.Panel>

                        <Tabs.Panel value="location">
                            {/* {(detailVisit.latitude && detailVisit.longitude) ? ( */}
                            <iframe
                                id="map"
                                width="600"
                                height="450"
                                loading="lazy"
                                src="https://www.google.com/maps?q=37.7749,-122.4194&hl=en&z=14&output=embed">
                            </iframe>
                            {/* ) : ( */}
                            {/* <Text mt={20}>Location Not Available</Text> */}
                            {/* )} */}
                        </Tabs.Panel>

                        <Tabs.Panel value="settings">
                            Settings tab content
                        </Tabs.Panel>
                    </Tabs>
                </Box>
            )}
        </Modal>
    )
}