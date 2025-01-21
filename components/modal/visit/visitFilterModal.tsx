import customerData from "@/app/interface/response/customer/customerData";
import { customerDetailAtom } from "@/state/data/customer/customerDetailAtom";
import { Box, Button, Center, ComboboxItem, Flex, Grid, Group, Modal, Select, Stack, Table, Tabs, Text } from "@mantine/core"
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { FC, useEffect, useState } from "react";
import { DataLabel } from "../../label/dataLabel";
import useGetListVisit from "@/hooks/visit/useGetListVisit";
import { VisitTable } from "../../table/visitTable";
import { visitListAtom } from "@/state/data/visit/visitListAtom";
import { visitFilterModalAtom } from "@/state/component_state/modal/visit/visitFilterModalAtom";
import { visitDetailAtom } from "@/state/data/visit/visitDetailAtom";
import { IconImageInPicture, IconListCheck, IconLocation } from "@tabler/icons-react";
import useGetListSales from "@/hooks/sales/useGetListSales";
import { DateInput, DateValue } from "@mantine/dates";
import { addDays, format } from "date-fns";
import { visitFilterAtom } from "@/state/data/visit/visitFilterAtom";
import { clear } from "console";


export const VisitFilterModal = () => {
    const [detailVisit, setDetailVisit] = useAtom(visitDetailAtom);
    const [isModalOpen, setIsModalOpen] = useAtom(visitFilterModalAtom);
    const [salesId, setSalesId] = useState<string | undefined>("")
    const [category, setCategory] = useState<string | undefined>("")
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")

    const [filter, setFilter] = useAtom(visitFilterAtom)

    const { isLoadingGetListVisit, getListVisit } = useGetListVisit();
    const { isLoadingGetListSales, getListSales, salesData, listForSelesSelect } = useGetListSales();

    const onCloseModal = () => {
        setDetailVisit(null)
        setIsModalOpen(false)
    }

    const searchSales = (e: string) => {
        getListSales(1, 10, e)
    }


    useEffect(() => {
        getListSales(1, 10)
    }, [])

    const handleChangeDate = (name: string, date: DateValue) => {
        if (date) {
            const formattedDate = format(date, 'yyyy-MM-dd');
            if (name == 'startDate') {
                setStartDate(formattedDate)
                setFilter({
                    ...filter,
                    startDate: formattedDate
                })
            } else {
                setFilter({
                    ...filter,
                    endDate: formattedDate
                })
            }
        }
    }

    const handleChangeSelect = (name: string, e: string | null, option?: ComboboxItem) => {
        if (e) {
            if (name == 'category') {
                if (e == 'All') {
                    setFilter({
                        ...filter,
                        category: ""
                    })
                } else {
                    setFilter({
                        ...filter,
                        category: e
                    })
                }
            } else {
                setFilter({
                    ...filter,
                    salesId: option
                })
            }
        }
    }

    const handleApplyFilter = async () => {
        await getListVisit(1, 10)
        setFilter({
            ...filter,
            is_filtered: true
        })
        onCloseModal()
    }

    const resetFilter = () => {
        setFilter({
            salesId: undefined,
            customerId: undefined,
            category: undefined,
            startDate: "",
            endDate: "",
            is_filtered: false
        })
        getListVisit(1, 10)
        onCloseModal()
    }

    const setValue = (option: any) => {
        console.log(option)
    }

    return (
        <Stack>
            <Grid>
                <Grid.Col span={{ base: 12, md: 3 }}>
                    <Select
                        placeholder={filter.salesId ? filter.salesId.label : "Search sales name"}
                        data={listForSelesSelect}
                        name="sales_id"
                        searchable
                        onSearchChange={(e) => searchSales(e)}
                        onChange={(_value, option) => handleChangeSelect('sales', _value, option)}
                        value={filter.salesId ? filter.salesId.value : null}
                        withAsterisk
                    />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 2}}>
                    <Select
                        data={['All', 'No Show', 'Canceled', 'Completed']}
                        placeholder={filter.category ? filter.category : "Select Category"}
                        onChange={(_value, option) => handleChangeSelect('category', _value, option)}
                        defaultValue={"All"}
                        value={filter.category}
                    />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 4}}>
                    <Group grow>
                        <DateInput
                            onChange={(e) => handleChangeDate('startDate', e)}
                            placeholder="Filter Start Date"
                            value={filter.startDate ? new Date(filter.startDate) : null}
                        />
                        <DateInput
                            onChange={(e) => handleChangeDate('endDate', e)}
                            placeholder="Filter End Date"
                            disabled={startDate == "" ? true : false}
                            maxDate={new Date()}
                            minDate={startDate == "" ? new Date : new Date(startDate)}
                            value={filter.endDate ? new Date(filter.endDate) : null}
                        />
                    </Group>
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 3}}>
                    <Grid>
                        <Grid.Col span={{ base: 12, md: 6}}>
                            <Button fullWidth onClick={handleApplyFilter} color="primary-red">Search</Button>
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, md: 6}}>
                            <Button fullWidth onClick={resetFilter} variant="outline" color="black">Reset</Button>
                        </Grid.Col>
                    </Grid>
                </Grid.Col>
            </Grid>
            
        </Stack>
    )
}