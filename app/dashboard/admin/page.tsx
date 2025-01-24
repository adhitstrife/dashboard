"use client"
import { ActionIcon, AppShell, Box, Button, Card, Dialog, Flex, Group, Image, Loader, Modal, NumberInput, Pagination, Select, Switch, Table, Text, TextInput, Title, useMantineTheme } from "@mantine/core";
import DashboardLayout from "../layout";
import { useEffect, useState } from "react";
import useGetProvinces from "@/hooks/region/useGetProvince";
import customerPayload from "@/app/interface/payload/customerPayload";
import useGetListSales from "@/hooks/sales/useGetListSales";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import useGetListVisit from "@/hooks/visit/useGetListVisit";
import { visitListAtom } from "@/state/data/visit/visitListAtom";
import { VisitTable } from "@/components/table/visitTable";
import { visitFilterAtom } from "@/state/data/visit/visitFilterAtom";
import { visitFilterModalAtom } from "@/state/component_state/modal/visit/visitFilterModalAtom";
import { IconFilterSearch, IconPlus } from "@tabler/icons-react";
import { VisitFilterModal } from "@/components/modal/visit/visitFilterModal";
import { Map } from "@/components/map/map";
import { showMapAtom } from "@/state/component_state/switch/map/showMapAtom";
import TimeDisplay from "@/components/clock/clock";
import useUserProfile from "@/hooks/auth/useUserProfile";
import { activeMenuAtom } from "@/state/component_state/menu/activeMenuAtom";
import useGetListLogs from "@/hooks/activity_logs/useGetListLogs";
import { logListAtom } from "@/state/data/activity_logs/logsListAtom";
import { LogTable } from "@/components/table/logTable";
import { LogModal } from "@/components/modal/activity_logs/LogModal";
import { DateInput, DateValue } from "@mantine/dates";
import { format } from "date-fns";
import useGetListAccounts from "@/hooks/account/useGetListAccounts";
import { accountListAtom } from "@/state/data/account/accountListAtom";
import { AccountTable } from "@/components/table/accountTable";
import { accountAddModalAtom } from "@/state/component_state/modal/account/accountAddModalAtom";
import { AccountAddModal } from "@/components/modal/account/accountAddModal";
import { AccountEditModal } from "@/components/modal/account/accountEditModal";
import { AccountDeleteModal } from "@/components/modal/account/accountDeleteModal";

export default function logs() {
    const theme = useMantineTheme();

    const { getListAccount, isLoadingGetListAccount } = useGetListAccounts()
    const [actionType, setActionType] = useState<string | undefined>(undefined);

    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10)
    const [selectedDate, setSelectedDate] = useState("");
    const [name, setName] = useState("");

    const setActiveMenu = useSetAtom(activeMenuAtom);
    const accountList = useAtomValue(accountListAtom)
    const setOpenAddAccountModal = useSetAtom(accountAddModalAtom);



    useEffect(() => {
        setActiveMenu("admin")
        getListAccount(page, pageSize)
    }, [])

    const handleChangePage = async (e: any) => {
        await getListAccount(e, pageSize, actionType);
        setPage(e);
    }

    const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        await getListAccount(page, pageSize, value);
        setName(value);
    }

    return (
        <DashboardLayout>
            <AppShell.Main bg={'#F6F6F6'}>
                <div className="header-page">
                    <Flex justify={'space-between'}>
                        <Box>
                            <Title order={2}>Admin</Title>
                            <Text size='sm' mt={10} style={{ color: theme.colors['secondary-gray'][9] }}>Here is the list of admin</Text>
                        </Box>
                        <Box>
                            <Text ta={'right'} size='sm' mt={10} >Current time</Text>
                            <TimeDisplay />
                        </Box>
                    </Flex>
                </div>
                <Card withBorder radius={"md"} px={20} py={30} mah={'screen'} mt={20}>
                    <Group justify="space-between" mt={10}>
                        <Group>
                        <TextInput placeholder="Search Sales" onChange={(e) => handleSearch(e)} />
                        </Group>
                        <Button color="primary-red" variant="filled">
                            <IconPlus size={20} stroke={1.5} onClick={() => setOpenAddAccountModal(true)}/>
                        </Button>
                    </Group>
                    {accountList && (
                        <Box>
                            <AccountTable />
                            {accountList.count > 10 && (
                                <Pagination color="primary-red" mt={10} value={page} onChange={(e) => handleChangePage(e)} total={Math.ceil(accountList.count / pageSize)} />
                            )}
                            <LogModal />
                            <AccountAddModal />
                            <AccountEditModal />
                            <AccountDeleteModal />   
                        </Box>
                    )}
                </Card>
            </AppShell.Main>
        </DashboardLayout>
    )
}