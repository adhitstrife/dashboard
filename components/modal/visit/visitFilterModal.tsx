import customerData from "@/app/interface/response/customer/customerData";
import { customerDetailAtom } from "@/state/data/customer/customerDetailAtom";
import { Box, Button, Center, ComboboxItem, Grid, Group, Modal, Select, Stack, Table, Tabs, Text } from "@mantine/core"
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
                    startDate: formattedDate
                })
            }
        }
    }

    const handleChangeSelect = (name: string, e: string | null, option?: ComboboxItem) => {
        console.log(name, e, option)
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
        onCloseModal()
    }

    const resetFilter = () => {
        setFilter({
            salesId: undefined,
            customerId: undefined,
            category: undefined,
            startDate: "",
            endDate: "",
        })
        getListVisit(1, 10)
        onCloseModal()
    }

    const setValue = (option: any) => {
        console.log(option)
    }

    return (
        <Stack>
            <Group>
                <Select
                    label="Sales"
                    placeholder={filter.salesId ? filter.salesId.label : "Search sales name"}
                    data={listForSelesSelect}
                    name="sales_id"
                    searchable
                    onSearchChange={(e) => searchSales(e)}
                    onChange={(_value, option) => handleChangeSelect('sales', _value, option)}
                    value={filter.salesId ? filter.salesId.value : null}
                    withAsterisk
                />
                <Select
                    label="Category"
                    data={['All', 'No Show', 'Canceled', 'Completed']}
                    name="religion"
                    onChange={(_value, option) => handleChangeSelect('category', _value, option)}
                    defaultValue={"All"}
                    value={filter.category}
                />
                <DateInput
                    onChange={(e) => handleChangeDate('startDate', e)}
                    label="Start Date"
                    placeholder="Filter Start Date"
                    value={filter.startDate ? new Date(filter.startDate) : null}
                />
                <DateInput
                    onChange={(e) => handleChangeDate('endDate', e)}
                    label="End Date"
                    placeholder="Filter End Date"
                    disabled={startDate == "" ? true : false}
                    maxDate={new Date()}
                    minDate={startDate == "" ? new Date : addDays(new Date(startDate), 1)}
                    value={filter.endDate ? new Date(filter.endDate) : null}
                />
            </Group>
            <Group justify="right">
                <Button onClick={handleApplyFilter} color="primary-red">Search</Button>
                <Button onClick={resetFilter} variant="outline" color="black">Reset</Button>
            </Group>
        </Stack>
    )
}