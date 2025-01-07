"use client"
import { ActionIcon, AppShell, Box, Button, Card, Dialog, Flex, Group, Image, Loader, Modal, NumberInput, Select, Table, Text, TextInput, Title, useMantineTheme } from "@mantine/core";
import DashboardLayout from "../layout";
import { IconPencil, IconPlus, IconTrash } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useDisclosure, useViewportSize } from "@mantine/hooks";
import useGetCities from "@/hooks/region/useGetCities";
import useGetProvinces from "@/hooks/region/useGetProvince";
import customerPayload from "@/app/interface/payload/customerPayload";
import useGetDistrict from "@/hooks/region/useGetDistrict";
import useGetSubDistrict from "@/hooks/region/useGetSubDistrict";
import useGetSubDistricts from "@/hooks/region/useGetSubDistrict";
import useAddCustomer from "@/hooks/customer/useAddCustomer";
import useGetListCustomer from "@/hooks/customer/useGetListCustomer";
import { CustomerTable } from "@/components/table/customerTable";
import useGetListSales from "@/hooks/sales/useGetListSales";
import useAssignSalesToCustomer from "@/hooks/customer/useAssignSalesToCustomer";
import { useAtomValue, useSetAtom } from "jotai";
import { customerDetailAtom } from "@/state/data/customer/customerDetailAtom";
import customerData from "@/app/interface/response/customer/customerData";
import { CustomerDetailModal } from "@/components/modal/customer/customerDetailModal";
import { CustomerEditModal } from "@/components/modal/customer/customerEditModal";
import { customerListAtom } from "@/state/data/customer/customerListAtom";
import { CustomerDeleteModal } from "@/components/modal/customer/customerDeleteModal";
import { CustomerApproveModal } from "@/components/modal/customer/customerApproveModal";
import useGetListLeave from "@/hooks/leave/useGetListLeave";
import { leaveListAtom } from "@/state/data/leave/leaveListAtom";
import { LeaveTable } from "@/components/table/leaveTable";
import { LeaveApproveModal } from "@/components/modal/leave/leaveApproveModal";
import TimeDisplay from "@/components/clock/clock";
import useUserProfile from "@/hooks/auth/useUserProfile";
import { activeMenuAtom } from "@/state/component_state/menu/activeMenuAtom";

export default function user() {
    const theme = useMantineTheme();
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [opened, { toggle, close }] = useDisclosure(false);
    const [customerPayload, setCustomerPayload] = useState<customerPayload>({
        address: '',
        city_id: null,
        contact_person: '',
        district_id: null,
        permission_letter: '',
        province_id: null,
        sub_district_id: null,
        name: '',
        npwp: '',
        phone: ''
    })
    const [showAssignSalesModal, setShowAssignSalesModal] = useState(false);
    const [showDetailCustomerModal, setShowDetailCustomerModal] = useState(false);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10)
    const [searchedLeave, setSearchedLeave] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("");
    const [filterBySales, setFilterBySales] = useState("");
    const [assignSalesPayload, setAssignSalesPayload] = useState<assignSales>({
        customer_id: null,
        sales_id: null
    })

    const leaveList = useAtomValue(leaveListAtom)
    const setActiveMenu = useSetAtom(activeMenuAtom)

    const { height, width } = useViewportSize();
    const { getCountryList, cities, isLoadingGetCities } = useGetCities()
    const { getProvinceList, isLoadingGetProvinces, provinces } = useGetProvinces()
    const { districts, getDistrictList, isLoadingGetDistrict } = useGetDistrict();
    const { getSubDistrictList, isLoadingGetSubDistrict, subDistricts } = useGetSubDistricts();
    const { isLoadingAddCustomer, postNewCustomer } = useAddCustomer();
    const { isLoadingGetListCustomer, getListCustomer } = useGetListCustomer();
    const { getListLeave, isLoadingGetListLeave } = useGetListLeave();
    const { assignSalesToCustomer, isLoadingAssignSales } = useAssignSalesToCustomer();
    const { isLoadingGetListSales, getListSales, salesData, listForSelesSelect } = useGetListSales();
    const { getUserProfile, userProfile, isLoading } = useUserProfile()


    const searchSales = (e: string) => {
        getListSales(1, 10, e)
    }

    const searchSubDistrict = (e: string) => {
        getSubDistrictList(e, customerPayload.district_id)
    }

    const handleSelectChange = (name: string, e: string | null) => {
        if (e) {
            const value = parseInt(e)
            setCustomerPayload({
                ...customerPayload,
                [name]: value
            })
        }
    }

    useEffect(() => {
        getListLeave(page, 10, searchedLeave)
        getProvinceList()
        getUserProfile()
        setActiveMenu("leave")
    }, [])

    const handleChangePage = async (e: any) => {
        await getListLeave(e, 10, selectedStatus, parseInt(searchedLeave));
        setPage(e);
    }

    const handleSelectedStatus = async (e: string | null) => {
        if (e) {
            const status = e == "All" ? "" : e
            await await getListLeave(1, 10, status, parseInt(searchedLeave));
            setSelectedStatus(e);
        }
    }

    const handleFilterBySales = async (e: string | null) => {
        if (e) {
            const value = parseInt(e)
            await await getListLeave(page, 10, selectedStatus, value);
            setSearchedLeave(e);
        }
    }

    return (
        <DashboardLayout>
            <AppShell.Main bg={'#F6F6F6'}>
                <div className="header-page">
                    <Flex justify={'space-between'}>
                        <Box>
                            <Title order={2}>Leave</Title>
                            <Text size='sm' mt={10} style={{ color: theme.colors['secondary-gray'][9] }}>Here is the list of leave</Text>
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
                                placeholder="Search sales name"
                                data={listForSelesSelect}
                                name="sales_id"
                                searchable
                                onSearchChange={(e) => searchSales(e)}
                                onChange={(e) => handleFilterBySales(e)}
                                withAsterisk
                            />
                            <Select
                                placeholder="Filter Leave By Status"
                                data={['All','Submitted', 'Approved', 'Rejected', 'Cancelled']}
                                name="religion"
                                onChange={(e) => handleSelectedStatus(e)}
                                defaultValue={"All"}
                            />
                        </Group>
                    </Group>
                    {leaveList ? (
                        <LeaveTable page={page} handleChangePage={handleChangePage} />
                    ) : (
                        <Loader color='white' size={'lg'} />
                    )}
                </Card>

                <LeaveApproveModal />
            </AppShell.Main>
        </DashboardLayout>
    )
}