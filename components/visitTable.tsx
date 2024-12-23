import customerListResponse from "@/app/interface/response/customer/customerListResponse"
import visitListResponse from "@/app/interface/response/visit/visitListResponse"
import { Table, Text } from "@mantine/core"
import { FC } from "react"

interface visitTable {
    visitList: visitListResponse
}
export const VisitTable: FC<visitTable> = ({ visitList }) => {
    return (
        <Table.ScrollContainer minWidth={200} mt={20}>
            <Table>
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th>Name</Table.Th>
                        <Table.Th>Sales</Table.Th>
                        <Table.Th>Category</Table.Th>
                        <Table.Th>Visit Date</Table.Th>
                        <Table.Th>Participant</Table.Th>
                        <Table.Th>Products</Table.Th>
                        <Table.Th>Quantity</Table.Th>
                        <Table.Th>Notes</Table.Th>
                        <Table.Th>Location</Table.Th>
                        <Table.Th>Image</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                    {visitList.results.length <= 0 && (
                        <Table.Tr>
                            <Table.Td colSpan={6} style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                <Text>No visit yet </Text>
                            </Table.Td>
                        </Table.Tr>
                    )}
                </Table.Tbody>
            </Table>
        </Table.ScrollContainer>
    )
}