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

export default function user() {
    const theme = useMantineTheme();

    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10)
    const [searchedCustomer, setSearchedCustomer] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("");
    const [filterBySales, setFilterBySales] = useState("");

    const visitList = useAtomValue(visitListAtom)
    const setVisitFilterModal = useSetAtom(visitFilterModalAtom)
    const [showMap, setShowMap] = useAtom(showMapAtom);

    const { getProvinceList, isLoadingGetProvinces, provinces } = useGetProvinces()

    const { getListVisit, isLoadingGetListVisit } = useGetListVisit();
    const { isLoadingGetListSales, getListSales, salesData, listForSelesSelect } = useGetListSales();

    const searchSales = (e: string) => {
        getListSales(1, 10, e)
    }

    useEffect(() => {
        getListVisit(page, 10)
        getProvinceList()
    }, [])

    const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        await getListVisit(page, pageSize)
        setSearchedCustomer(value);
    }

    const handleSelectedStatus = async (e: string | null) => {
        if (e) {
            const status = e == "All" ? "" : e
            await getListVisit(page, pageSize)
            setSelectedStatus(e);
        }
    }

    const handleFilterBySales = async (e: string | null) => {
        if (e) {
            console.log(e)
            const value = parseInt(e)
            await getListVisit(page, pageSize)
            // await await getListCustomer(1, 10, searchedCustomer, selectedStatus !== "" ? selectedStatus : undefined, value);
            setFilterBySales(e);
        } else {
            console.log("foo")
            await getListVisit(page, pageSize)
            setFilterBySales("");
        }
    }

    const handleChangePage = async (e: any) => {
        await getListVisit(e, pageSize);
        setPage(e);
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
                            <TimeDisplay />
                        </Box>
                    </Flex>
                </div>
                <Card withBorder radius={"md"} px={20} py={30} mah={'screen'} mt={20}>
                    <Group justify='space-between' mb={40}>
                        <Switch
                          color='primary-red'
                          checked={showMap}
                          onChange={(e) => setShowMap(e.currentTarget.checked)}
                          label="Show Map"
                        />
                        <ActionIcon onClick={() => setVisitFilterModal(true)} color='primary-red'>
                            <IconFilterSearch size={20} stroke={1.5} />
                        </ActionIcon>
                    </Group>
                    {visitList && (
                        <Box>
                            {showMap && (
                                <Map />
                            )}
                            <VisitTable />
                            <Pagination mt={10} value={page} onChange={(e) => handleChangePage(e)} total={Math.ceil(visitList.count / pageSize)} />
                            <VisitFilterModal />
                        </Box>
                    )}
                </Card>
            </AppShell.Main>
        </DashboardLayout>
    )
}