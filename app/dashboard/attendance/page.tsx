"use client"
import { ActionIcon, AppShell, Box, Button, Card, Dialog, Flex, Group, Image, Loader, Modal, NumberInput, Pagination, Select, Table, Text, TextInput, Title, useMantineTheme } from "@mantine/core";
import DashboardLayout from "../layout";
import { useEffect, useState } from "react";
import useGetProvinces from "@/hooks/region/useGetProvince";
import customerPayload from "@/app/interface/payload/customerPayload";
import useGetListSales from "@/hooks/sales/useGetListSales";
import { useAtomValue, useSetAtom } from "jotai";
import useGetListVisit from "@/hooks/visit/useGetListVisit";
import { visitListAtom } from "@/state/data/visit/visitListAtom";
import { VisitTable } from "@/components/table/visitTable";
import { AttendanceTable } from "@/components/table/attendanceTable";
import useGetListAttendance from "@/hooks/attendance/useGetListAttendance";
import { attendanceListAtom } from "@/state/data/attendance/attendanceListAtom";
import { AttendanceModal } from "@/components/modal/attendance/attendanceModal";
import TimeDisplay from "@/components/clock/clock";
import useUserProfile from "@/hooks/auth/useUserProfile";
import { activeMenuAtom } from "@/state/component_state/menu/activeMenuAtom";

export default function user() {
    const theme = useMantineTheme();
    const { getListAttendance, isLoadingGetListAttendance } = useGetListAttendance();
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10)
    const [searchedCustomer, setSearchedCustomer] = useState("");
    const [selectedStatus, setSelectedStatus] = useState<boolean | undefined>(undefined);
    const [filterBySales, setFilterBySales] = useState("");

    const attendanceList = useAtomValue(attendanceListAtom)
    const setActiveMenu = useSetAtom(activeMenuAtom);
    
    const { getListVisit, isLoadingGetListVisit } = useGetListVisit();
    const { isLoadingGetListSales, getListSales, salesData, listForSelesSelect } = useGetListSales();
    const { getUserProfile, userProfile, isLoading } = useUserProfile()

    const searchSales = (e: string) => {
        getListSales(1, 10, e)
        getUserProfile();
        setActiveMenu("attendance")
    }

    useEffect(() => {
        getListAttendance(page,10,selectedStatus)

    }, [])

    const handleSelectedStatus = async (e: string | null) => {
        if (e) {
            const status = e == "Active" ? true : e == "Non Active" ? false : undefined
            await getListAttendance(page, pageSize, status, parseInt(filterBySales))
            setSelectedStatus(status);
        }
    }

    const handleFilterBySales = async (e: string | null) => {
        if (e) {
            console.log(e)
            const value = parseInt(e)
            await getListAttendance(page, pageSize, selectedStatus, value)
            setFilterBySales(e);
        } else {
            await getListAttendance(page, pageSize, selectedStatus, undefined)
            setFilterBySales("");
        }
    }

    const handleChangePage = async (e: any) => {
        await getListAttendance(e, pageSize, selectedStatus, parseInt(filterBySales));
        setPage(e);
    }

    return (
        <DashboardLayout>
            <AppShell.Main bg={'#F6F6F6'}>
                <div className="header-page">
                    <Flex justify={'space-between'}>
                        <Box>
                            <Title order={2}>Attendance</Title>
                            <Text size='sm' mt={10} style={{ color: theme.colors['secondary-gray'][9] }}>Here is the list of attendance record</Text>
                        </Box>
                        <Box>
                            <Text ta={'right'} size='sm' mt={10} >Current time</Text>
                            <TimeDisplay />
                        </Box>
                    </Flex>
                </div>
                <Card withBorder radius={"md"} px={20} py={30} mah={'screen'} mt={20}>
                    <Group justify='space-between'>
                        <Group align="center">
                        <Select
                                placeholder="Filter Customer By Status"
                                data={['All', 'Active', 'Non Active']}
                                name="religion"
                                onChange={(e) => handleSelectedStatus(e)}
                                defaultValue={"All"}
                            />
                            <Select
                                placeholder="Filter by sales name"
                                data={listForSelesSelect}
                                name="search_by_sales"
                                searchable
                                onSearchChange={(e) => searchSales(e)}
                                onChange={(e) => handleFilterBySales(e)}
                                clearable
                            />
                        </Group>
                    </Group>
                    {attendanceList && (
                        <Box>
                            <AttendanceTable />
                            <Pagination mt={10} value={page} onChange={(e) => handleChangePage(e)} total={Math.ceil(attendanceList.count / pageSize)} />
                        </Box>
                    )}
                </Card>
                <AttendanceModal />
            </AppShell.Main>
        </DashboardLayout>
    )
}