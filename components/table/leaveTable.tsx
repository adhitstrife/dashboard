import customerListResponse from "@/app/interface/response/customer/customerListResponse"
import leaveData from "@/app/interface/response/leave/leaveData"
import leaveListResponse from "@/app/interface/response/leave/leaveListResponse"
import visitListResponse from "@/app/interface/response/visit/visitListResponse"
import { leaveApproveModalAtom } from "@/state/component_state/modal/leave/leaveApproveModalAtom"
import { leaveDetailAtom } from "@/state/data/leave/leaveDetailAtom"
import { leaveListAtom } from "@/state/data/leave/leaveListAtom"
import { leaveStatusAtom } from "@/state/data/leave/leaveStatusAtom"
import { userProfileAtom } from "@/state/data/user/userProfileAtom"
import { ActionIcon, Badge, Box, Group, Pagination, Table, Text } from "@mantine/core"
import { IconCheck, IconX } from "@tabler/icons-react"
import { useAtomValue, useSetAtom } from "jotai"
import { FC } from "react"


interface leaveTable {
    page: number
    handleChangePage: (page: number) => void;
}
export const LeaveTable: FC<leaveTable> = ({ page, handleChangePage }) => {
    const leaveList = useAtomValue(leaveListAtom)
    const setIsModalOpen = useSetAtom(leaveApproveModalAtom);
    const setDetailLeave = useSetAtom(leaveDetailAtom);
    const setStatusLeave = useSetAtom(leaveStatusAtom);
    const userProfile = useAtomValue(userProfileAtom);

    const handleOpenApproveModal = (leave: leaveData) => {
        setIsModalOpen(true);
        setDetailLeave(leave);
        setStatusLeave("Approved")
    }

    const handleOpenRejectModal = (leave: leaveData) => {
        setIsModalOpen(true);
        setDetailLeave(leave);
        setStatusLeave("Rejected")
    }

    const handleOpenCancelModal = (leave: leaveData) => {
        setIsModalOpen(true);
        setDetailLeave(leave);
        setStatusLeave("Cancelled")
    }

    const isDatePassed = (leaveDate: string) => {
        const givenDate = new Date(leaveDate);
        const todayDate = new Date();

        // Normalize both dates to midnight
        givenDate.setHours(0, 0, 0, 0);
        todayDate.setHours(0, 0, 0, 0);

        return givenDate >= todayDate;
    };
    
    return (
        <Box>
            {leaveList && (
                <div className="">
                    <Table.ScrollContainer minWidth={200} mt={20}>
                        <Table>
                            <Table.Thead>
                                <Table.Tr>
                                    <Table.Th>Name</Table.Th>
                                    <Table.Th>Reason</Table.Th>
                                    <Table.Th>Category</Table.Th>
                                    <Table.Th>Start Date</Table.Th>
                                    <Table.Th>End Date</Table.Th>
                                    {userProfile?.user_type == 'Manager' && (
                                        <Table.Th>Action</Table.Th>
                                    )}
                                </Table.Tr>
                            </Table.Thead>
                            {leaveList.results.length <= 0 ? (
                                <Table.Tbody>
                                    <Table.Tr>
                                        <Table.Td colSpan={6} style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                            <Text>No leave application yet </Text>
                                        </Table.Td>
                                    </Table.Tr>
                                </Table.Tbody>
                            ) : (
                                <Table.Tbody>

                                    {leaveList.results.map((leave, index) => (
                                        <Table.Tr>
                                            <Table.Td>
                                                {leave.user.name}
                                            </Table.Td>
                                            <Table.Td>
                                                {leave.leave_reason}
                                            </Table.Td>
                                            <Table.Td>
                                                {leave.category}
                                            </Table.Td>
                                            <Table.Td>
                                                {leave.start_date}
                                            </Table.Td>
                                            <Table.Td>
                                                {leave.end_date}
                                            </Table.Td>
                                        {userProfile?.user_type == 'Manager' && (
                                            <Table.Td>
                                                {isDatePassed(leave.start_date) ? (
                                                    <Badge color="secondary-gray">Expired</Badge>
                                                ) : (
                                                    <Box>
                                                        {leave.status == 'Submitted' ? (
                                                            <Group>
                                                                <ActionIcon onClick={() => handleOpenApproveModal(leave)} variant="transparent">
                                                                    <IconCheck color="green" size={20} stroke={1.5} />
                                                                </ActionIcon>
                                                                <ActionIcon onClick={() => handleOpenRejectModal(leave)} variant="transparent">
                                                                    <IconX color="red" size={20} stroke={1.5} />
                                                                </ActionIcon>
                                                            </Group>
                                                        ) : leave.status == 'Approved' ? (
                                                            <Group>
                                                                <ActionIcon onClick={() => handleOpenCancelModal(leave)} variant="transparent">
                                                                    <IconX color="red" size={20} stroke={1.5} />
                                                                </ActionIcon>
                                                            </Group>
                                                        ) : (
                                                            <Badge color="secondary-gray">Canceled</Badge>
                                                        )}
                                                    </Box>
                                                )}
                                            </Table.Td>

                                        )}
                                        </Table.Tr>

                                    ))}
                                </Table.Tbody>
                            )}
                        </Table>
                    </Table.ScrollContainer>
                    {leaveList.count > 10 && (
                        <Pagination mt={10} value={page} onChange={(e) => handleChangePage(e)} total={Math.ceil(leaveList.count / 10)} />
                    )}
                </div>
            )}
        </Box>
    )
}