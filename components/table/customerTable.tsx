import customerData from "@/app/interface/response/customer/customerData"
import customerListResponse from "@/app/interface/response/customer/customerListResponse"
import { customerApproveModalAtom } from "@/state/component_state/modal/customerApproveModalAtom"
import { customerDeleteModalAtom } from "@/state/component_state/modal/customerDeleteModalAtom"
import { customerDetailModalAtom } from "@/state/component_state/modal/customerDetailModalAtom"
import { customerEditModalAtom } from "@/state/component_state/modal/customerEditModalAtom"
import { customerDetailAtom } from "@/state/data/customer/customerDetailAtom"
import { customerListAtom } from "@/state/data/customer/customerListAtom"
import { ActionIcon, Badge, Box, Button, Group, Pagination, Table, Text } from "@mantine/core"
import { IconCheck, IconEdit, IconEye, IconPencil, IconTrash } from "@tabler/icons-react"
import { useAtom, useAtomValue, useSetAtom } from "jotai"
import Link from "next/link"
import { FC, useState } from "react"

interface customerTable {
    page: number
    handleChangePage: (page: number) => void;
    onAssignSales?: (customerId: number) => void;
}
export const CustomerTable: FC<customerTable> = ({ page, handleChangePage, onAssignSales }) => {
    const setDetailCustomer = useSetAtom(customerDetailAtom);
    const setIsModalOpen = useSetAtom(customerDetailModalAtom);
    const setIsModalEditOpen = useSetAtom(customerEditModalAtom);
    const setIsModalDeleteOpen = useSetAtom(customerDeleteModalAtom);
    const setIsModalApproveOpen = useSetAtom(customerApproveModalAtom);
    const customerList = useAtomValue(customerListAtom)

    const handleOpenDetailModal = (customer: customerData) => {
        console.log("foo")
        setDetailCustomer(customer);
        setIsModalOpen(true);
    }

    const handleOpenEditModal = (customer: customerData) => {
        setDetailCustomer(customer);
        setIsModalEditOpen(true);
    }

    const handleOpenApproveModal = (customer: customerData) => {
        setDetailCustomer(customer);
        setIsModalApproveOpen(true);
    }

    const handleOpenDeleteModal = (customer: customerData) => {
        setDetailCustomer(customer);
        setIsModalDeleteOpen(true);
    }

    return (
        <Box>
            {customerList && (
                <div className="">
                    <Table.ScrollContainer minWidth={200} mt={20}>
                        <Table>
                            <Table.Thead>
                                <Table.Tr>
                                    <Table.Th>Name</Table.Th>
                                    <Table.Th>Status</Table.Th>
                                    <Table.Th>Contact Person</Table.Th>
                                    <Table.Th>Joined Date</Table.Th>
                                    <Table.Th>Phone</Table.Th>
                                    {onAssignSales && (
                                        <Table.Th>Sales</Table.Th>
                                    )}
                                    <Table.Th>Action</Table.Th>
                                </Table.Tr>
                            </Table.Thead>
                            {customerList.results.length <= 0 ? (
                                <Table.Tbody>
                                    <Table.Tr>
                                        <Table.Td colSpan={6} style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                            <Text>No customers yet </Text>
                                        </Table.Td>
                                    </Table.Tr>
                                </Table.Tbody>
                            ) : (
                                <Table.Tbody>
                                    {customerList.results.map((customer, index) => (
                                        <Table.Tr key={index}>
                                            <Table.Td>
                                                {customer.name}
                                            </Table.Td>
                                            <Table.Td>
                                                <Badge color={customer.status == "Unassigned" ? "primary-red" : customer.status == "In Review" ? "yellow" : "green"}>{customer.status}</Badge>
                                            </Table.Td>
                                            <Table.Td>
                                                {customer.contact_person}
                                            </Table.Td>
                                            <Table.Td>
                                                {new Date(customer.created_at).toLocaleDateString()}
                                            </Table.Td>
                                            <Table.Td>
                                                {customer.phone}
                                            </Table.Td>
                                            {onAssignSales && (
                                                <Table.Td>
                                                    {!customer.sales && customer.status !== "In Review" ? (
                                                        <Button onClick={() => onAssignSales(customer.id)} color="primary-red" size="xs">
                                                            Assign Sales
                                                        </Button>
                                                    ) : (
                                                        <Group>
                                                            <Text>
                                                                {customer.sales?.name}
                                                            </Text>
                                                            <ActionIcon color="primary-red" size={"sm"} onClick={() => onAssignSales(customer.id)} variant="transparent">
                                                                <IconEdit size={20} stroke={1.5} />
                                                            </ActionIcon>
                                                        </Group>
                                                    )}
                                                </Table.Td>
                                            )}
                                            <Table.Td>
                                                <Group>
                                                    {customer.status == "In Review" && (
                                                        <ActionIcon onClick={() => handleOpenApproveModal(customer)} variant="transparent">
                                                            <IconCheck color="green" size={20} stroke={1.5} />
                                                        </ActionIcon>
                                                    )}
                                                    <ActionIcon onClick={() => handleOpenDetailModal(customer)} variant="transparent">
                                                        <IconEye size={20} stroke={1.5} />
                                                    </ActionIcon>
                                                    <ActionIcon onClick={() => handleOpenEditModal(customer)} variant="transparent">
                                                        <IconPencil size={20} stroke={1.5} />
                                                    </ActionIcon>
                                                    <ActionIcon onClick={() => handleOpenDeleteModal(customer)} variant="transparent">
                                                        <IconTrash color="red" size={20} stroke={1.5} />
                                                    </ActionIcon>
                                                </Group>
                                            </Table.Td>
                                        </Table.Tr>
                                    ))}
                                </Table.Tbody>
                            )}
                        </Table>
                    </Table.ScrollContainer>
                    {customerList.count > 10 && (
                        <Pagination color="primary-red" mt={10} value={page} onChange={(e) => handleChangePage(e)} total={Math.ceil(customerList.count / 10)} />
                    )}
                </div>
            )}
        </Box>
    )
}