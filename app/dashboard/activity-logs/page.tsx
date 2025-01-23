"use client"
import { ActionIcon, AppShell, Box, Card, Dialog, Flex, Group, Image, Loader, Modal, NumberInput, Pagination, Select, Switch, Table, Text, TextInput, Title, useMantineTheme } from "@mantine/core";
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
import { IconFilterSearch } from "@tabler/icons-react";
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

export default function logs() {
    const theme = useMantineTheme();

    const { getListLogs, isLoadingGetListLogs } = useGetListLogs();
    const [actionType, setActionType] = useState<string | undefined>(undefined);

    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10)
    const [selectedDate, setSelectedDate] = useState("");

    const setActiveMenu = useSetAtom(activeMenuAtom);
    const logList = useAtomValue(logListAtom)


    useEffect(() => {
        setActiveMenu("logs")
        getListLogs(page, pageSize)
    }, [])

    const handleChangePage = async (e: any) => {
        await getListLogs(e, pageSize, actionType);
        setPage(e);
    }

    const handleSelectChange = async (value: string | null) => {
        if (value) {
            await getListLogs(page, pageSize, value == 'all' ? 'undefined' : value);
            setActionType(value)
        }
    }

    const handleChangeDate = async(date: DateValue) => {
        let formattedDate = '';
        if (date) {
            formattedDate = format(date, 'yyyy-MM-dd');
        } else {
            formattedDate = format(new Date(), 'yyyy-MM-dd');
        }
        await getListLogs(page, pageSize, actionType, formattedDate);
        setSelectedDate(formattedDate);
    }

    return (
        <DashboardLayout>
            <AppShell.Main bg={'#F6F6F6'}>
                <div className="header-page">
                    <Flex justify={'space-between'}>
                        <Box>
                            <Title order={2}>Logs</Title>
                            <Text size='sm' mt={10} style={{ color: theme.colors['secondary-gray'][9] }}>Here is the list of logs</Text>
                        </Box>
                        <Box>
                            <Text ta={'right'} size='sm' mt={10} >Current time</Text>
                            <TimeDisplay />
                        </Box>
                    </Flex>
                </div>
                <Card withBorder radius={"md"} px={20} py={30} mah={'screen'} mt={20}>
                    <Group mt={10}>
                        <Select
                            placeholder="Pick action type"
                            data={['All', 'Create', 'Update', 'Delete', 'Login', 'Logout', 'Login Failed']}
                            name="gender"
                            onChange={(e) => handleSelectChange(e)}
                        />
                        <DateInput
                            onChange={(e) => handleChangeDate(e)}
                            placeholder="Filter By Date"
                            maxDate={new Date()}
                            defaultValue={new Date()}
                            clearable
                        />
                    </Group>
                    {logList && (
                        <Box>
                            <LogTable />
                            {logList.count > 10 && (
                                <Pagination color="primary-red" mt={10} value={page} onChange={(e) => handleChangePage(e)} total={Math.ceil(logList.count / pageSize)} />
                            )}
                            <LogModal />
                        </Box>
                    )}
                </Card>
            </AppShell.Main>
        </DashboardLayout>
    )
}