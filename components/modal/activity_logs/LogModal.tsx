import { DataLabel } from "@/components/label/dataLabel";
import useApproveCustomer from "@/hooks/customer/useApproveCustomer";
import useDeleteCustomer from "@/hooks/customer/useDeleteCustomer";
import useGetListCustomer from "@/hooks/customer/useGetListCustomer";
import { activityLogModalAtom } from "@/state/component_state/modal/activityLogs/activityLogModalAtom";
import { attendanceLocalModalAtom } from "@/state/component_state/modal/attendance/attendanceLocalModalAtom";
import { customerApproveModalAtom } from "@/state/component_state/modal/customerApproveModalAtom";
import { logDetailAtom } from "@/state/data/activity_logs/logDetailAtom";
import { attendanceDetailAtom } from "@/state/data/attendance/attendanceDetailAtom";
import { customerDetailAtom } from "@/state/data/customer/customerDetailAtom";
import { Box, Button, Grid, Loader, Modal, Table, Text } from "@mantine/core"
import { useAtom } from "jotai";
import { useEffect } from "react";

export const LogModal = () => {
    const [detailLog, setDetailLog] = useAtom(logDetailAtom);
    const [isModalOpen, setIsModalOpen] = useAtom(activityLogModalAtom);

    const onCloseModal = () => {
        setDetailLog(null)
        setIsModalOpen(false)
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
        <Modal opened={isModalOpen} withCloseButton onClose={onCloseModal} size="lg" title={detailLog ? detailLog.log_message : "Detail"}>
            {detailLog && (
                <Box>
                    <Grid mt={20}>
                        <Grid.Col span={6}>
                            <DataLabel label="User Name" value={detailLog.user} />
                        </Grid.Col>
                        <Grid.Col span={6}>
                            <DataLabel label="Action Type" value={detailLog.action_type} />
                        </Grid.Col>
                        <Grid.Col span={6}>
                            <DataLabel label="Action Time" value={formatDate(detailLog.action_time)} />
                        </Grid.Col>
                        {detailLog.action_type == 'Login' && (
                            <Box>
                                <Grid.Col span={6}>
                                    <DataLabel label="Username" value={detailLog.meta_data.username ? detailLog.meta_data.username : "-"} />
                                </Grid.Col>
                                <Grid.Col span={6}>
                                    <DataLabel label="User Type" value={detailLog.meta_data.user_type ? detailLog.meta_data.user_type : "-"} />
                                </Grid.Col>
                                <Grid.Col span={6}>
                                    <DataLabel label="Browser Info" value="" withValue={false} />
                                    <Text>{detailLog.meta_data.browser_info}</Text>
                                </Grid.Col>
                            </Box>
                        )}
                    </Grid>
                    {detailLog.action_type == 'Update' && (
                        <Box mt={40}>
                            <DataLabel label="Field Changes" value="" withValue={false} />
                            <Table>
                                <Table.Thead>
                                    <Table.Tr>
                                        <Table.Th>Field Name</Table.Th>
                                        <Table.Th>Old Data</Table.Th>
                                        <Table.Th>New Data</Table.Th>
                                    </Table.Tr>
                                </Table.Thead>
                                {detailLog.meta_data && detailLog.meta_data.fields.length > 0 ? (
                                    <Table.Tbody>
                                        {detailLog.meta_data.fields.map((field, index) => (
                                            <Table.Tr key={index}>
                                                <Table.Td>{field.field_name}</Table.Td>
                                                <Table.Td>{field.old_data ? field.old_data : "-"}</Table.Td>
                                                <Table.Td>{field.new_data ? field.new_data : "-"}</Table.Td>
                                            </Table.Tr>
                                        ))}
                                    </Table.Tbody>
                                ) : (
                                    <Table.Tbody>
                                        <Table.Tr>
                                            <Table.Td colSpan={12} style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                                <Text>No Data </Text>
                                            </Table.Td>
                                        </Table.Tr>
                                    </Table.Tbody>
                                )}
                            </Table>
                        </Box>
                    )}
                </Box>
            )
            }
        </Modal >
    )
}