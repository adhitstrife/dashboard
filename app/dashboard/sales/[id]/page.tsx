"use client"
import { ActionIcon, AppShell, Box, Button, Card, Center, Flex, Grid, Group, Image, Modal, NumberInput, Progress, Tabs, Text, Title, useMantineTheme } from "@mantine/core";
import DashboardLayout from "../../layout";
import useUserProfile from "@/hooks/auth/useUserProfile";
import { use, useEffect, useState } from "react";
import useGetSalesDetail from "@/hooks/sales/useGetSalesDetail";
import { IconCalendarCheck, IconClockCheck, IconEdit, IconFileDollar, IconMap, IconTable, IconUser, IconUserDollar } from "@tabler/icons-react";
import { DataLabel } from "../../../../components/label/dataLabel";
import { YearPickerInput } from "@mantine/dates";
import targetAddPayload from "@/app/interface/payload/targetAddPayload";
import useAddTarget from "@/hooks/target/useAddTarget";
import useUpdateTarget from "@/hooks/target/useUpdateTarget";
import { CustomerTable } from "../../../../components/table/customerTable";
import useGetListCustomer from "@/hooks/customer/useGetListCustomer";
import useGetListVisit from "@/hooks/visit/useGetListVisit";
import { VisitTable } from "@/components/table/visitTable";
import useGetListLeave from "@/hooks/leave/useGetListLeave";
import { LeaveTable } from "@/components/table/leaveTable";
import { AttendanceTable } from "@/components/table/attendanceTable";
import useGetListAttendance from "@/hooks/attendance/useGetListAttendance";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { customerListAtom } from "@/state/data/customer/customerListAtom";
import { leaveListAtom } from "@/state/data/leave/leaveListAtom";
import { visitListAtom } from "@/state/data/visit/visitListAtom";
import { attendanceListAtom } from "@/state/data/attendance/attendanceListAtom";
import { useViewportSize } from "@mantine/hooks";
import { visitFilterModalAtom } from "@/state/component_state/modal/visit/visitFilterModalAtom";
import { visitFilterAtom } from "@/state/data/visit/visitFilterAtom";

interface SalesDetailProps {
    params: { id: string }; // id is usually passed as a string in params
}

export default function salesDetail({ params }: { params: Promise<{ id: number }> }) {
    const { id } = use(params);
    const theme = useMantineTheme();
    const { height, width } = useViewportSize();
    const { getUserProfile, userProfile, isLoading } = useUserProfile()
    const { getDetailSales, isLoadingGetDetailSales, salesDetail, setSalesDetail } = useGetSalesDetail()
    const { isLoadingGetListCustomer, getListCustomer } = useGetListCustomer();
    const { getListLeave, isLoadingGetListLeave } = useGetListLeave();
    const { isLoadingGetListVisit, getListVisit } = useGetListVisit();
    const { getListAttendance, isLoadingGetListAttendance } = useGetListAttendance();
    const { isLoadingAddTarget, postNewTarget } = useAddTarget()
    const { isLoadingUpdateTarget, updateTarget } = useUpdateTarget()

    const leaveData = useAtomValue(leaveListAtom)
    const visitList = useAtomValue(visitListAtom)
    const attendanceList = useAtomValue(attendanceListAtom)


    const [showEditTargetModal, setShowEditTargetModal] = useState(false);
    const [showAddTargetModal, setShowAddTargetModal] = useState(false);
    const [pageCustomer, setPageCustomer] = useState(1);
    const [pageLeave, setPageLeave] = useState(1);
    const [addPayload, setAddPayload] = useState<targetAddPayload>({
        sales_id: null,
        period: null,
        target_amount: null,
        current_progress: null
    })
    const [editPayload, setEditPayload] = useState<targetAddPayload>({
        sales_id: null,
        period: null,
        target_amount: null,
        current_progress: null
    })
    const [searchedCustomer, setSearchedCustomer] = useState("");
    const currentYear = new Date().getFullYear();
    const maxYearDate = new Date(currentYear + 1, 11, 31);

    const customerList = useAtomValue(customerListAtom)
    const [filterVisit, setFilterVisit] = useAtom(visitFilterAtom)

    useEffect(() => {
        getUserProfile()
        getDetailSales(id)
        setAddPayload((prevPayload) => {
            const payload = {
                ...prevPayload,
                sales_id: id
            }
            return payload
        })

        setFilterVisit({
            ...filterVisit,
            salesId: id.toString()
        });

        getListCustomer(1, 10, undefined, undefined, id);
        getListLeave(1, 10, undefined, id)
        getListAttendance(1, 10, true, id)
    }, [id])

    useEffect(() => {
        getListVisit(1, 10);
    },[filterVisit])

    useEffect(() => {
        if (salesDetail && salesDetail.results.target) {
            setEditPayload({
                ...editPayload,
                period: salesDetail.results.target.period,
                target_amount: salesDetail.results.target.target_amount,
                current_progress: salesDetail.results.target.current_progress
            })
        }
    }, [salesDetail])

    const formatNumber = (number: number) => {
        return new Intl.NumberFormat("de-DE").format(number); // 'de-DE' for period as thousand separator
    };

    const countCurrentTarget = () => {
        if (salesDetail && salesDetail.results.target) {
            return (salesDetail.results.target.current_progress / salesDetail.results.target.target_amount) * 100
        } else {
            return 0
        }
    }

    const handlePeriodSelect = (e: Date | null) => {
        if (e) {
            const year = e.getFullYear()
            if (salesDetail && salesDetail.results.target) {
                setEditPayload((prevPayload) => {
                    const payload = {
                        ...prevPayload,
                        period: year
                    }
                    return payload
                })
            } else {
                setAddPayload((prevPayload) => {
                    const payload = {
                        ...prevPayload,
                        period: year
                    }
                    return payload
                })
            }
        }
    }

    const handleNumberInput = (name: string, value: string | null | number) => {
        if (salesDetail && salesDetail.results.target) {
            setEditPayload((prevPayload) => ({
                ...prevPayload, // Spread the previous state
                [name]: value  // Update the specific field
            }));
        } else {
            setAddPayload((prevPayload) => ({
                ...prevPayload, // Spread the previous state
                [name]: value  // Update the specific field
            }));
        }
        console.log(editPayload)
    }

    const handleShowEditTargetModal = () => {
        if (salesDetail && salesDetail.results.target) {
            console.log(editPayload)
            return setShowEditTargetModal(true)
        }
        return setShowEditTargetModal(false)
    }


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            if (salesDetail && salesDetail.results.target) {
                await updateTarget(salesDetail.results.target.id, editPayload)
            } else {
                await postNewTarget(addPayload);
            }
        } catch (error) {
            console.log(error)
        } finally {
            setShowAddTargetModal(false);
            setShowEditTargetModal(false);
            getDetailSales(id)
            setAddPayload({
                sales_id: id,
                period: null,
                target_amount: null,
                current_progress: null
            })
            setEditPayload({
                sales_id: id,
                period: null,
                target_amount: null,
                current_progress: null
            })
        }
    }

    const handleChangePageCustomer = async (e: any) => {
        await getListCustomer(e, 10, searchedCustomer, undefined, id);
        setPageCustomer(e);
    }

    const handleChangePageLeave = async (e: any) => {
        await getListLeave(e, 10, undefined, id);
        setPageCustomer(e);
    }

    return (
        <DashboardLayout>
            <AppShell.Main bg={'#F6F6F6'}>
                <div className="header-page">
                    <Flex justify={'space-between'}>
                        <Box>
                            <Title order={2}>Sales Detail</Title>
                            <Text size='sm' mt={10} style={{ color: theme.colors['secondary-gray'][9] }}>Here is the detail information of sales</Text>
                        </Box>
                        <Box>
                            <Text ta={'right'} size='sm' mt={10} >Current time</Text>
                            <Title order={2}>12:10 PM</Title>
                        </Box>
                    </Flex>
                </div>
                <Card withBorder radius={"md"} px={20} py={30} mah={'screen'} mt={20}>
                    {salesDetail && (
                        <Box>
                            <Center>
                                <Image
                                    radius="md"
                                    h={200}
                                    w={180}
                                    src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-7.png"
                                />
                            </Center>
                            <Title mt={30} order={3} ta={"center"}>{salesDetail.results.name}</Title>
                            <Text size='md' mt={10} ta={"center"} style={{ color: theme.colors['secondary-gray'][9] }}>Sales Area {salesDetail.results.city.name}</Text>
                            <Box>
                                {salesDetail.results.target ? (
                                    <Box>
                                        <Text size='md' mt={10} style={{ color: theme.colors['secondary-gray'][9] }}>Target period {salesDetail.results.target.period}</Text>
                                        <Group>
                                            <Text size="lg" fw={700}>Rp. {formatNumber(salesDetail.results.target.current_progress)} / Rp. {formatNumber(salesDetail.results.target.target_amount)}</Text>
                                            <ActionIcon variant="transparent" onClick={handleShowEditTargetModal}>
                                                <IconEdit color="#8E261C" size={20} stroke={1.5} />
                                            </ActionIcon>
                                        </Group>
                                        <Progress value={countCurrentTarget()} color="primary-red" />
                                    </Box>
                                ) : (
                                    <Box>
                                        <Text size='md' mt={10} style={{ color: theme.colors['secondary-gray'][9] }}>No target yet</Text>
                                        <Button color="primary-red" mt={10} onClick={() => setShowAddTargetModal(true)}>Add Target</Button>
                                    </Box>
                                )}
                            </Box>
                            <Box mt={40}>
                                <Tabs color="primary-red" variant="outline" defaultValue="detail">
                                    <Tabs.List>
                                        <Tabs.Tab value="detail" leftSection={<IconUser size={20} stroke={1.5} />}>
                                            Detail
                                        </Tabs.Tab>
                                        <Tabs.Tab value="attendance" leftSection={<IconClockCheck size={20} stroke={1.5} />}>
                                            Attendance
                                        </Tabs.Tab>
                                        <Tabs.Tab value="customers" leftSection={<IconUserDollar size={20} stroke={1.5} />}>
                                            Customers
                                        </Tabs.Tab>
                                        <Tabs.Tab value="visit" leftSection={<IconFileDollar size={20} stroke={1.5} />}>
                                            Visits
                                        </Tabs.Tab>
                                        <Tabs.Tab value="leave" leftSection={<IconCalendarCheck size={20} stroke={1.5} />}>
                                            Leave
                                        </Tabs.Tab>
                                    </Tabs.List>

                                    <Tabs.Panel value="detail">
                                        <Grid mt={40}>
                                            <Grid.Col span={6}>
                                                <DataLabel label="Username" value={salesDetail.results.username} />
                                            </Grid.Col>
                                            <Grid.Col span={6}>
                                                <DataLabel label="Fullname" value={salesDetail.results.name} />
                                            </Grid.Col>
                                            <Grid.Col span={6}>
                                                <DataLabel label="NIP" value={salesDetail.results.nip} />
                                            </Grid.Col>
                                            <Grid.Col span={6}>
                                                <DataLabel label="Status Pekerja" value={salesDetail.results.employee_status} />
                                            </Grid.Col>
                                            <Grid.Col span={6}>
                                                <DataLabel label="Level" value={salesDetail.results.job_level} />
                                            </Grid.Col>
                                            <Grid.Col span={6}>
                                                <DataLabel label="Joining Date" value={salesDetail.results.joining_date} />
                                            </Grid.Col>
                                            <Grid.Col span={6}>
                                                <DataLabel label="Birthplace" value={salesDetail.results.birth_place.name} />
                                            </Grid.Col>
                                            <Grid.Col span={6}>
                                                <DataLabel label="Gender" value={salesDetail.results.gender} />
                                            </Grid.Col>
                                            <Grid.Col span={6}>
                                                <DataLabel label="Religion" value={salesDetail.results.religion} />
                                            </Grid.Col>
                                            <Grid.Col span={6}>
                                                <DataLabel label="Blood Type" value={salesDetail.results.blood_type} />
                                            </Grid.Col>
                                            <Grid.Col span={6}>
                                                <DataLabel label="Email" value={salesDetail.results.email} />
                                            </Grid.Col>
                                            <Grid.Col span={6}>
                                                <DataLabel label="Phone Number" value={salesDetail.results.phone} />
                                            </Grid.Col>
                                            <Grid.Col span={6}>
                                                <DataLabel label="Address" value={salesDetail.results.address} />
                                            </Grid.Col>
                                            <Grid.Col span={6}>
                                                <DataLabel label="Bank Name" value={salesDetail.results.bank_name} />
                                            </Grid.Col>
                                            <Grid.Col span={6}>
                                                <DataLabel label="Account Name" value={salesDetail.results.account_name} />
                                            </Grid.Col>
                                            <Grid.Col span={6}>
                                                <DataLabel label="Account Number" value={salesDetail.results.account_number} />
                                            </Grid.Col>
                                        </Grid>
                                    </Tabs.Panel>
                                    <Tabs.Panel value="attendance">
                                        {attendanceList && (
                                            <AttendanceTable />
                                        )}
                                    </Tabs.Panel>
                                    <Tabs.Panel value="customers">
                                        {customerList && (
                                            <CustomerTable page={pageCustomer} handleChangePage={handleChangePageCustomer} />
                                        )}
                                    </Tabs.Panel>
                                    <Tabs.Panel value="visit">
                                        <Tabs mt={20} variant="pills" defaultValue="list">
                                            <Tabs.List>
                                                <Tabs.Tab value="list" leftSection={<IconTable size={20} stroke={1.5} />}>
                                                    List
                                                </Tabs.Tab>
                                                <Tabs.Tab value="maps" leftSection={<IconMap size={20} stroke={1.5} />}>
                                                    Maps
                                                </Tabs.Tab>
                                            </Tabs.List>
                                            <Tabs.Panel value="list">
                                                {visitList && (
                                                    <VisitTable />
                                                )}
                                            </Tabs.Panel>
                                            <Tabs.Panel value="maps">
                                                <iframe
                                                    id="map"
                                                    width={width}
                                                    height="600"
                                                    loading="lazy"
                                                    src="https://www.google.com/maps?q=37.7749,-122.4194&hl=en&z=14&output=embed">
                                                </iframe>
                                            </Tabs.Panel>
                                        </Tabs>

                                    </Tabs.Panel>
                                    <Tabs.Panel value="leave">
                                        {leaveData && (
                                            <LeaveTable page={pageLeave} handleChangePage={handleChangePageLeave} />
                                        )}
                                    </Tabs.Panel>
                                </Tabs>
                            </Box>
                        </Box>
                    )}
                </Card>
                <Modal opened={showEditTargetModal} onClose={() => setShowEditTargetModal(false)} title="Edit Sales Target">
                    <form onSubmit={handleSubmit}>
                        <YearPickerInput
                            label="Target priod"
                            placeholder="Pick target priod"
                            name="period"
                            minDate={new Date()}
                            maxDate={maxYearDate}
                            withAsterisk
                            value={editPayload.period ? new Date(editPayload.period, 0, 1) : new Date()}
                            onChange={(e) => handlePeriodSelect(e)}
                        />
                        <NumberInput
                            label="Target Amount"
                            placeholder="Input current target"
                            hideControls
                            name="target"
                            withAsterisk
                            required
                            mt={10}
                            onChange={(e) => handleNumberInput('target_amount', e)}
                            value={editPayload.target_amount ? editPayload.target_amount : 0}
                            thousandSeparator=","
                        />
                        <NumberInput
                            label="Current Progress"
                            placeholder="Input current progress"
                            hideControls
                            name="progress"
                            withAsterisk
                            required
                            mt={10}
                            value={editPayload.current_progress ? editPayload.current_progress : 0}
                            onChange={(e) => handleNumberInput('current_progress', e)}
                            thousandSeparator=","
                        />
                        <Button type="submit" variant="filled" color="primary-red" mt={20} fullWidth>
                            Save
                        </Button>
                    </form>
                </Modal>
                <Modal opened={showAddTargetModal} onClose={() => setShowAddTargetModal(false)} title="Add Sales Target">
                    <form onSubmit={handleSubmit}>
                        <YearPickerInput
                            label="Target priod"
                            placeholder="Pick target priod"
                            name="period"
                            minDate={new Date()}
                            maxDate={maxYearDate}
                            withAsterisk
                            // value={value}
                            onChange={(e) => handlePeriodSelect(e)}
                        />
                        <NumberInput
                            label="Target Amount"
                            placeholder="Input amount of this period target"
                            hideControls
                            name="target_amount"
                            withAsterisk
                            required
                            mt={10}
                            leftSection={
                                <Text>Rp</Text>
                            }
                            onChange={(e) => handleNumberInput('target_amount', e)}
                        />
                        <Button type="submit" variant="filled" color="primary-red" mt={20} fullWidth>
                            Save
                        </Button>
                    </form>
                </Modal>
            </AppShell.Main>
        </DashboardLayout>
    )
}