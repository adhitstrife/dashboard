import customerData from "@/app/interface/response/customer/customerData";
import { customerDetailAtom } from "@/state/data/customer/customerDetailAtom";
import { Box, Button, Center, Grid, Modal, Select, Table, Tabs, Text } from "@mantine/core"
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

    const handleChangeSelect = (name: string, e: string | null) => {
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
                    salesId: e
                })
            }
        }
    }

    const handleApplyFilter = () => {
        getListVisit(1, 10)
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
    }

    return (
        <Modal size={'lg'} opened={isModalOpen} onClose={onCloseModal} title="Filter Visit Data">
            <Select
                label="Sales"
                placeholder="Search sales name"
                mt={10}
                data={listForSelesSelect}
                name="sales_id"
                searchable
                onSearchChange={(e) => searchSales(e)}
                onChange={(e) => handleChangeSelect('sales', e)}
                withAsterisk
            />
            <Select
                label="Category"
                data={['All', 'No Show', 'Canceled', 'Completed']}
                name="religion"
                onChange={(e) => handleChangeSelect('category', e)}
                defaultValue={"All"}
                value={category}
                mt={10}
            />
            <DateInput
                onChange={(e) => handleChangeDate('startDate', e)}
                label="Start Date"
                placeholder="Filter Start Date"
                mt={10}
            />
            <DateInput
                onChange={(e) => handleChangeDate('endDate', e)}
                label="End Date"
                placeholder="Filter End Date"
                mt={10}
                disabled={startDate == "" ? true : false}
                maxDate={new Date()}
                minDate={startDate == "" ? new Date : addDays(new Date(startDate), 1)}
            />
            <Grid mt={40}>
                <Grid.Col span={{ base: 12, lg: 6 }}>
                    <Button onClick={handleApplyFilter} color="primary-red" fullWidth>Apply</Button>
                </Grid.Col>
                <Grid.Col span={{ base: 12, lg: 6 }}>
                    <Button onClick={resetFilter} variant="outline" color="black" fullWidth>Reset</Button>
                </Grid.Col>
            </Grid>
        </Modal>
    )
}