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
import useGetListVisit from "@/hooks/visit/useGetListVisit";
import { visitListAtom } from "@/state/data/visit/visitListAtom";
import { VisitTable } from "@/components/table/visitTable";
import { visitDetailModalAtom } from "@/state/component_state/modal/visit/visitDetailModalAtom";
import { visitDetailAtom } from "@/state/data/visit/visitDetailAtom";
import visitData from "@/app/interface/response/visit/visitData";
import { VisitDetailModal } from "@/components/modal/visit/visitDetailModal";

export default function user() {
    const theme = useMantineTheme();
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
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10)
    const [searchedCustomer, setSearchedCustomer] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("");
    const [filterBySales, setFilterBySales] = useState("");

    const visitList = useAtomValue(visitListAtom)

    const { getProvinceList, isLoadingGetProvinces, provinces } = useGetProvinces()
    
    const { getListVisit, isLoadingGetListVisit } = useGetListVisit();
    const { isLoadingGetListSales, getListSales, salesData, listForSelesSelect } = useGetListSales();

    const searchSales = (e: string) => {
        getListSales(1, 10, e)
    }

    useEffect(() => {
        getListVisit(page, 10, searchedCustomer)
        getProvinceList()
    }, [])

    const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        // await await getListCustomer(1, 10, value, selectedStatus !== "" ? selectedStatus : undefined, filterBySales !== "" ? parseInt(filterBySales) : undefined);
        setSearchedCustomer(value);
    }

    const handleSelectedStatus = async (e: string | null) => {
        if (e) {
            const status = e == "All" ? "" : e
            // await await getListCustomer(1, 10, searchedCustomer, selectedStatus !== "" ? selectedStatus : undefined, filterBySales !== "" ? parseInt(filterBySales) : undefined);
            setSelectedStatus(e);
        }
    }

    const handleFilterBySales = async (e: string | null) => {
        if (e) {
            console.log(e)
            const value = parseInt(e)
            // await await getListCustomer(1, 10, searchedCustomer, selectedStatus !== "" ? selectedStatus : undefined, value);
            setFilterBySales(e);
        } else {
            console.log("foo")
            // await await getListCustomer(1, 10, searchedCustomer, selectedStatus !== "" ? selectedStatus : undefined, undefined);
            setFilterBySales("");
        }
    }

    return (
        <DashboardLayout>
            <AppShell.Main bg={'#F6F6F6'}>
                <div className="header-page">
                    <Flex justify={'space-between'}>
                        <Box>
                            <Title order={2}>Visits</Title>
                            <Text size='sm' mt={10} style={{ color: theme.colors['secondary-gray'][9] }}>Here is the list of visit record</Text>
                        </Box>
                        <Box>
                            <Text ta={'right'} size='sm' mt={10} >Current time</Text>
                            <Title order={2}>12:10 PM</Title>
                        </Box>
                    </Flex>
                </div>
                <Card withBorder radius={"md"} px={20} py={30} mah={'screen'} mt={20}>
                    <Group justify='space-between'>
                        <Group align="center">
                            <TextInput onChange={(e) => handleSearch(e)} placeholder="Search Customers" />
                            <Select
                                placeholder="Filter Customer By Status"
                                data={['All', 'Assigned', 'In Review', 'Unassigned']}
                                name="religion"
                                onChange={(e) => handleSelectedStatus(e)}
                                defaultValue={"All"}
                            />
                            <Select
                                placeholder="Filter customer by sales name"
                                data={listForSelesSelect}
                                name="search_by_sales"
                                searchable
                                onSearchChange={(e) => searchSales(e)}
                                onChange={(e) => handleFilterBySales(e)}
                                clearable
                            />
                        </Group>
                    </Group>
                    {visitList && (
                        <VisitTable />
                    )}
                </Card>
                <VisitDetailModal />
            </AppShell.Main>
        </DashboardLayout>
    )
}