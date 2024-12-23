import customerListResponse from "@/app/interface/response/customer/customerListResponse"
import { Table, Text } from "@mantine/core"
import { FC } from "react"

interface customerTable {
    customerList: customerListResponse
}
export const CustomerTable: FC<customerTable> = ({ customerList }) => {
    return (
        <Table.ScrollContainer minWidth={200} mt={20}>
            <Table>
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th>Name</Table.Th>
                        <Table.Th>Phone</Table.Th>
                        <Table.Th>Permission Letter</Table.Th>
                        <Table.Th>NPWP</Table.Th>
                        <Table.Th>Address</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                    {customerList.results.length <= 0 && (
                        <Table.Tr>
                            <Table.Td colSpan={6} style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                <Text>No customers yet </Text>
                            </Table.Td>
                        </Table.Tr>
                    )}
                </Table.Tbody>
            </Table>
        </Table.ScrollContainer>
    )
}