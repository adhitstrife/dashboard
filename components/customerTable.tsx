import customerListResponse from "@/app/interface/response/customer/customerListResponse"
import { ActionIcon, Badge, Box, Button, Group, Pagination, Table, Text } from "@mantine/core"
import { IconCheck, IconEye, IconPencil, IconTrash } from "@tabler/icons-react"
import Link from "next/link"
import { FC, useState } from "react"

interface customerTable {
    customerList: customerListResponse
    page: number
    handleChangePage: (page: number) => void;
    onAssignSales?: (customerId: number) => void;
}
export const CustomerTable: FC<customerTable> = ({ customerList, page,handleChangePage, onAssignSales }) => {
    return (
        <Box>
            <Table.ScrollContainer minWidth={200} mt={20}>
                <Table>
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th>Name</Table.Th>
                            <Table.Th>Status</Table.Th>
                            <Table.Th>Contact Person</Table.Th>
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
                                <Table.Tr>
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
                                        {customer.phone}
                                    </Table.Td>
                                    {onAssignSales && (
                                        <Table.Td>
                                            {customer.sales ? customer.sales.name : (<Button onClick={() => onAssignSales(customer.id)} color="primary-red" size="xs">Assign Sales</Button>)}
                                        </Table.Td>
                                    )}
                                    <Table.Td>
                                        <Group>
                                            {customer.status == "In Review" && (
                                                <ActionIcon variant="transparent">
                                                    <IconCheck color="green" size={20} stroke={1.5} />
                                                </ActionIcon>
                                            )}
                                            <ActionIcon variant="transparent">
                                                <IconEye size={20} stroke={1.5} />
                                            </ActionIcon>
                                            <ActionIcon variant="transparent">
                                                <IconPencil size={20} stroke={1.5} />
                                            </ActionIcon>
                                            <ActionIcon variant="transparent">
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
            <Pagination mt={10} value={page} onChange={(e) => handleChangePage(e)} total={Math.ceil(customerList.count / 10)} />
        </Box>
    )
}