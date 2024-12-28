import customerListResponse from "@/app/interface/response/customer/customerListResponse"
import leaveListResponse from "@/app/interface/response/leave/leaveListResponse"
import visitListResponse from "@/app/interface/response/visit/visitListResponse"
import { Table, Text } from "@mantine/core"
import { FC } from "react"

interface leaveTable {
    leaveList: leaveListResponse
}
export const LeaveTable: FC<leaveTable> = ({ leaveList }) => {
    return (
        <Table.ScrollContainer minWidth={200} mt={20}>
            <Table>
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th>Name</Table.Th>
                        <Table.Th>Reason</Table.Th>
                        <Table.Th>Category</Table.Th>
                        <Table.Th>Start Date</Table.Th>
                        <Table.Th>End Date</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                    {leaveList.results.length <= 0 && (
                        <Table.Tr>
                            <Table.Td colSpan={6} style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                <Text>No leave application yet </Text>
                            </Table.Td>
                        </Table.Tr>
                    )}
                </Table.Tbody>
            </Table>
        </Table.ScrollContainer>
    )
}