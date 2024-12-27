import attendanceListResponse from "@/app/interface/response/attendance/leaveListResponse"
import customerListResponse from "@/app/interface/response/customer/customerListResponse"
import leaveListResponse from "@/app/interface/response/leave/leaveListResponse"
import visitListResponse from "@/app/interface/response/visit/visitListResponse"
import { Table, Text } from "@mantine/core"
import { FC } from "react"

interface attendanceTable {
    attendanceList: attendanceListResponse
}
export const AttendanceTable: FC<attendanceTable> = ({ attendanceList }) => {
    return (
        <Table.ScrollContainer minWidth={200} mt={20}>
            <Table>
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th>Name</Table.Th>
                        <Table.Th>Location</Table.Th>
                        <Table.Th>Clock In Date</Table.Th>
                        <Table.Th>Clock In Time</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                    {attendanceList.results.length <= 0 && (
                        <Table.Tr>
                            <Table.Td colSpan={6} style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                <Text>No attendance record yet </Text>
                            </Table.Td>
                        </Table.Tr>
                    )}
                </Table.Tbody>
            </Table>
        </Table.ScrollContainer>
    )
}