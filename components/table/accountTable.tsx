import { accountAddModalAtom } from "@/state/component_state/modal/account/accountAddModalAtom";
import { accountDeleteModalAtom } from "@/state/component_state/modal/account/accountDeleteModalAtom";
import { accountEditModalAtom } from "@/state/component_state/modal/account/accountEditModalAtom";
import { activityLogModalAtom } from "@/state/component_state/modal/activityLogs/activityLogModalAtom";
import { accountDetailAtom } from "@/state/data/account/accountDetailAtom";
import { accountListAtom } from "@/state/data/account/accountListAtom";
import { logDetailAtom } from "@/state/data/activity_logs/logDetailAtom";
import { logListAtom } from "@/state/data/activity_logs/logsListAtom";
import { ActionIcon, Box, Group, Table, Text } from "@mantine/core";
import { IconEdit, IconEye, IconTrash } from "@tabler/icons-react";
import { useAtomValue, useSetAtom } from "jotai";

export const AccountTable = () => {
    const accountList = useAtomValue(accountListAtom)
    const setOpenEditModal = useSetAtom(accountEditModalAtom);
    const setOpenDeleteModal = useSetAtom(accountDeleteModalAtom);
    const setSelectedAccount = useSetAtom(accountDetailAtom);

    const handleEdit = (account: any) => {
        setSelectedAccount(account);
        setOpenEditModal(true);
    }

    const handleDelete = (account: any) => {
        setSelectedAccount(account);
        setOpenDeleteModal(true);
    }



    return (
        <Box>
            {accountList && (
                <Table.ScrollContainer minWidth={200} mt={20}>
                    <Table>
                        <Table.Thead>
                            <Table.Tr>
                                <Table.Th>Name</Table.Th>
                                <Table.Th>Email</Table.Th>
                                <Table.Th>User Type</Table.Th>
                                <Table.Th>Action</Table.Th>
                            </Table.Tr>
                        </Table.Thead>
                        {accountList.results.length <= 0 ? (
                            <Table.Tbody>
                                <Table.Tr>
                                    <Table.Td colSpan={12} style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                        <Text>No Account yet </Text>
                                    </Table.Td>
                                </Table.Tr>
                            </Table.Tbody>
                        ) : (
                            <Table.Tbody>
                                {accountList.results.map((account, index) => (
                                    <Table.Tr key={index}>
                                        <Table.Td>{account.name}</Table.Td>
                                        <Table.Td>{account.email}</Table.Td>
                                        <Table.Td>{account.user_type}</Table.Td>
                                        <Table.Td>
                                        <Group>
                                            <ActionIcon onClick={() => handleEdit(account)} variant="transparent">
                                                <IconEdit size={20} stroke={1.5} />
                                            </ActionIcon>
                                            <ActionIcon onClick={() => handleDelete(account)} color="primary-red" variant="transparent">
                                                <IconTrash size={20} stroke={1.5} />
                                            </ActionIcon>
                                        </Group>
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