import { activityLogModalAtom } from "@/state/component_state/modal/activityLogs/activityLogModalAtom";
import { logDetailAtom } from "@/state/data/activity_logs/logDetailAtom";
import { logListAtom } from "@/state/data/activity_logs/logsListAtom";
import { ActionIcon, Box, Table, Text } from "@mantine/core";
import { IconEye } from "@tabler/icons-react";
import { useAtomValue, useSetAtom } from "jotai";

export const LogTable = () => {
    const logList = useAtomValue(logListAtom)

    const setLogDetail = useSetAtom(logDetailAtom);
    const setOpenModal = useSetAtom(activityLogModalAtom);

    const openDetailLogModal = (log: logData) => {
        setLogDetail(log)
        setOpenModal(true)
    }

    const formatDate = (isoDate: string) => {
        const date = new Date(isoDate);
        const dd = String(date.getDate()).padStart(2, '0');
        const mm = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const yyyy = date.getFullYear();
        const hh = String(date.getHours()).padStart(2, '0');
        const min = String(date.getMinutes()).padStart(2, '0');
        const ss = String(date.getSeconds()).padStart(2, '0');

        return `${dd}/${mm}/${yyyy} ${hh}:${min}:${ss}`;
    }
    return (
        <Box>
            {logList && (
                <Table.ScrollContainer minWidth={200} mt={20}>
                    <Table>
                        <Table.Thead>
                            <Table.Tr>
                                <Table.Th>User</Table.Th>
                                <Table.Th>Action Type</Table.Th>
                                <Table.Th>Action Time</Table.Th>
                                <Table.Th>Action</Table.Th>
                            </Table.Tr>
                        </Table.Thead>
                        {logList.results.length <= 0 ? (
                            <Table.Tbody>
                                <Table.Tr>
                                    <Table.Td colSpan={12} style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                        <Text>No log yet </Text>
                                    </Table.Td>
                                </Table.Tr>
                            </Table.Tbody>
                        ) : (
                            <Table.Tbody>
                                {logList.results.map((log, index) => (
                                    <Table.Tr key={index}>
                                        <Table.Td>{log.user}</Table.Td>
                                        <Table.Td>{log.action_type}</Table.Td>
                                        <Table.Td>{formatDate(log.action_time)}</Table.Td>
                                        <Table.Td>
                                            <ActionIcon onClick={() => openDetailLogModal(log)}  variant="transparent">
                                                <IconEye size={20} stroke={1.5} />
                                            </ActionIcon>
                                        </Table.Td>
                                    </Table.Tr>

                                ))}
                            </Table.Tbody>
                        )}
                    </Table>
                </Table.ScrollContainer>
            )}
        </Box>
    )
}