"use client"
import { ActionIcon, AppShell, Box, Button, Card, Center, Flex, Grid, Group, Image, Modal, NumberInput, Progress, Tabs, Text, Title, useMantineTheme } from "@mantine/core";
import DashboardLayout from "../../layout";
import useUserProfile from "@/hooks/auth/useUserProfile";
import { useEffect, useState } from "react";
import useGetSalesDetail from "@/hooks/sales/useGetSalesDetail";
import { IconCalendarCheck, IconEdit, IconFileDollar, IconUser, IconUserDollar } from "@tabler/icons-react";
import { SalesDataLabel } from "./salesDataLabel";
import { YearPickerInput } from "@mantine/dates";
import targetAddPayload from "@/app/interface/payload/targetAddPayload";
import useAddTarget from "@/hooks/target/useAddTarget";
import useUpdateTarget from "@/hooks/target/useUpdateTarget";

export default function salesDetail({ params }: { params: { id: number } }) {
    const theme = useMantineTheme();
    const { getUserProfile, userProfile, isLoading } = useUserProfile()
    const { getDetailSales, isLoadingGetDetailSales, salesDetail, setSalesDetail } = useGetSalesDetail()
    const { isLoadingAddTarget, postNewTarget } = useAddTarget()
    const { isLoadingUpdateTarget, updateTarget } = useUpdateTarget()
    const [showEditTargetModal, setShowEditTargetModal] = useState(false);
    const [showAddTargetModal, setShowAddTargetModal] = useState(false);
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
    const currentYear = new Date().getFullYear();
    const maxYearDate = new Date(currentYear + 1, 11, 31);

    useEffect(() => {
        getUserProfile()
        getDetailSales(params.id)
        setAddPayload((prevPayload) => {
            const payload = {
                ...prevPayload,
                sales_id: params.id
            }
            return payload
        })
    }, [params])

    useEffect(() => {
        if (salesDetail && salesDetail.results.target) {
            setEditPayload({
                ...editPayload,
                period: salesDetail.results.target.period,
                target_amount: salesDetail.results.target.target_amount,
                current_progress: salesDetail.results.target.current_progress
            })
        }
        console.log("foo")
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
            getDetailSales(params.id)
            setAddPayload({
                sales_id: params.id,
                period: null,
                target_amount: null,
                current_progress: null
            })
            setEditPayload({
                sales_id: params.id,
                period: null,
                target_amount: null,
                current_progress: null
            })
        }
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
                                                <SalesDataLabel label="Username" value={salesDetail.results.username} />
                                            </Grid.Col>
                                            <Grid.Col span={6}>
                                                <SalesDataLabel label="Fullname" value={salesDetail.results.name} />
                                            </Grid.Col>
                                            <Grid.Col span={6}>
                                                <SalesDataLabel label="NIP" value={salesDetail.results.nip} />
                                            </Grid.Col>
                                            <Grid.Col span={6}>
                                                <SalesDataLabel label="Status Pekerja" value={salesDetail.results.employee_status} />
                                            </Grid.Col>
                                            <Grid.Col span={6}>
                                                <SalesDataLabel label="Level" value={salesDetail.results.job_level} />
                                            </Grid.Col>
                                            <Grid.Col span={6}>
                                                <SalesDataLabel label="Joining Date" value={salesDetail.results.joining_date} />
                                            </Grid.Col>
                                            <Grid.Col span={6}>
                                                <SalesDataLabel label="Birthplace" value={salesDetail.results.birth_place.name} />
                                            </Grid.Col>
                                            <Grid.Col span={6}>
                                                <SalesDataLabel label="Gender" value={salesDetail.results.gender} />
                                            </Grid.Col>
                                            <Grid.Col span={6}>
                                                <SalesDataLabel label="Religion" value={salesDetail.results.religion} />
                                            </Grid.Col>
                                            <Grid.Col span={6}>
                                                <SalesDataLabel label="Blood Type" value={salesDetail.results.blood_type} />
                                            </Grid.Col>
                                            <Grid.Col span={6}>
                                                <SalesDataLabel label="Email" value={salesDetail.results.email} />
                                            </Grid.Col>
                                            <Grid.Col span={6}>
                                                <SalesDataLabel label="Phone Number" value={salesDetail.results.phone} />
                                            </Grid.Col>
                                            <Grid.Col span={6}>
                                                <SalesDataLabel label="Address" value={salesDetail.results.address} />
                                            </Grid.Col>
                                            <Grid.Col span={6}>
                                                <SalesDataLabel label="Bank Name" value={salesDetail.results.bank_name} />
                                            </Grid.Col>
                                            <Grid.Col span={6}>
                                                <SalesDataLabel label="Account Name" value={salesDetail.results.account_name} />
                                            </Grid.Col>
                                            <Grid.Col span={6}>
                                                <SalesDataLabel label="Account Number" value={salesDetail.results.account_number} />
                                            </Grid.Col>
                                        </Grid>
                                    </Tabs.Panel>

                                    <Tabs.Panel value="messages">
                                        Messages tab content
                                    </Tabs.Panel>

                                    <Tabs.Panel value="settings">
                                        Settings tab content
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