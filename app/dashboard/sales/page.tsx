"use client"
import { ActionIcon, AppShell, Box, Button, Card, Dialog, Flex, Group, Loader, Modal, NumberInput, PasswordInput, Select, Table, Text, TextInput, Title, useMantineTheme } from "@mantine/core";
import DashboardLayout from "../layout";
import { IconEye, IconPencil, IconPlus, IconTrash } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useDisclosure, useViewportSize } from "@mantine/hooks";
import { DateInput } from "@mantine/dates";
import useGetCities from "@/hooks/region/useGetCities";
import salesPayload from "@/app/interface/payload/salesPayload";
import useAddSales from "@/hooks/sales/useAddSales";
import useGetListSales from "@/hooks/sales/useGetListSales";
import useGetSalesDetail from "@/hooks/sales/useGetSalesDetail";
import useEditSales from "@/hooks/sales/useEditSales";

export default function user() {
    const theme = useMantineTheme();
    const { height, width } = useViewportSize();
    const { getCountryList, cities, isLoadingGetCities } = useGetCities()
    const { isLoadingAddSales, postNewSales } = useAddSales();
    const { isLoadingEditSales, updateDataSales } = useEditSales();
    const { isLoadingGetListSales, getListSales, salesData } = useGetListSales();
    const { getDetailSales, isLoadingGetDetailSales, salesDetail, setSalesDetail } = useGetSalesDetail()
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [opened, { toggle, close }] = useDisclosure(false);
    const [salesPayload, setSalesPayload] = useState<salesPayload>({
        username: '',
        name: '',
        password: '',
        password2: '',
        birth_place_id: 0,
        gender: '',
        religion: '',
        blood_type: '',
        email: '',
        phone: '',
        address: '',
        postal_code: '',
        nip: '',
        employee_status: '',
        job_level: 'staff',
        joining_date: '',
        bank_name: '',
        account_name: '',
        account_number: '',
        city_id: 0,
    })

    useEffect(() => {
        getCountryList()
        getListSales()
    }, [])

    useEffect(() => {
        if (salesDetail) {
            const sales = salesDetail.results
            setSalesPayload({
                username: sales.username,
                name: sales.name,
                password: sales.password,
                password2: sales.password2,
                birth_place_id: sales.birth_place.id,
                gender: sales.gender,
                religion: sales.religion,
                blood_type: sales.blood_type,
                email: sales.email,
                phone: sales.phone,
                address: sales.address,
                postal_code: sales.postal_code,
                nip: sales.nip,
                employee_status: sales.employee_status,
                job_level: sales.job_level,
                joining_date: sales.joining_date,
                bank_name: sales.bank_name,
                account_name: sales.account_name,
                account_number: sales.account_number,
                city_id: sales.city.id,
            })
        }
    }, [salesDetail])

    const searchCity = (e: string) => {
        getCountryList(e)
    }


    const handleSelectChange = (name: string, e: string | null) => {
        if (e) {
            if (name === 'birth_place_id' || name === 'city_id') {
                const value = parseInt(e)
                setSalesPayload({
                    ...salesPayload,
                    [name]: value
                })
            } else {
                setSalesPayload({
                    ...salesPayload,
                    [name]: e
                })
            }
        }
    }

    const handleNumberInput = (name: string, value: string | null | number) => {
        setSalesPayload({
            ...salesPayload,
            [name]: value
        })
    }

    const handleSelectDate = (name: string, value: Date | null) => {
        if (value) {
            const year = value.getFullYear();
            const month = String(value.getMonth() + 1).padStart(2, '0'); // Months are zero-based
            const day = String(value.getDate()).padStart(2, '0');
            const date = `${year}-${month}-${day}`
            setSalesPayload({
                ...salesPayload,
                [name]: date
            })
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setSalesPayload({
            ...salesPayload,
            [name]: value
        });
    }

    const clearPayload = () => {
        setSalesPayload({
            username: '',
            name: '',
            password: '',
            password2: '',
            birth_place_id: 0,
            gender: '',
            religion: '',
            blood_type: '',
            email: '',
            phone: '',
            address: '',
            postal_code: '',
            nip: '',
            employee_status: '',
            job_level: '',
            joining_date: '',
            bank_name: '',
            account_name: '',
            account_number: '',
            city_id: 0,
        })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            await postNewSales(salesPayload);
        } catch (error) {
            console.log(error)
        } finally {
            setShowAddModal(false);
            getListSales()
            clearPayload();
        }
    }

    const handleUpdate = async (id: number, e: React.FormEvent) => {
        e.preventDefault()
        try {
            await updateDataSales(id, salesPayload);
        } catch (error) {
            console.log(error)
        } finally {
            setShowEditModal(false);
            getListSales()
            clearPayload();
        }
    }


    const openEditSalesModal = async (id: number) => {
        try {
            await getDetailSales(id);
            getListSales()
        } catch (error) {
            console.log(error)
        } finally {
            setShowEditModal(true)
        }
    }

    return (
        <DashboardLayout>
            <AppShell.Main bg={'#F6F6F6'}>
                <div className="header-page">
                    <Flex justify={'space-between'}>
                        <Box>
                            <Title order={2}>Sales</Title>
                            <Text size='sm' mt={10} style={{ color: theme.colors['secondary-gray'][9] }}>Here is the list of sales</Text>
                        </Box>
                        <Box>
                            <Text ta={'right'} size='sm' mt={10} >Current time</Text>
                            <Title order={2}>12:10 PM</Title>
                        </Box>
                    </Flex>
                </div>
                <Card withBorder radius={"md"} px={20} py={30} mah={'screen'} mt={20}>
                    <Group justify='space-between'>
                        <Group>
                            <TextInput placeholder="Search Sales" />
                        </Group>
                        <Button color="primary-red" variant="filled" onClick={() => setShowAddModal(true)}>
                            <IconPlus size={20} stroke={1.5} />
                        </Button>
                    </Group>
                    <Table.ScrollContainer minWidth={200} mt={20}>
                        <Table>
                            <Table.Thead>
                                <Table.Tr>
                                    <Table.Th>Username</Table.Th>
                                    <Table.Th>Fullname</Table.Th>
                                    <Table.Th>Email</Table.Th>
                                    <Table.Th>Phone</Table.Th>
                                    <Table.Th>NIP</Table.Th>
                                    <Table.Th>Actions</Table.Th>
                                </Table.Tr>
                            </Table.Thead>
                            <Table.Tbody>
                                {!isLoadingGetListSales && salesData ? (
                                    salesData.results.map((sales, index) => (
                                        <Table.Tr key={index}>
                                            <Table.Td>{sales.username}</Table.Td>
                                            <Table.Td>{sales.name}</Table.Td>
                                            <Table.Td>{sales.email}</Table.Td>
                                            <Table.Td>{sales.phone}</Table.Td>
                                            <Table.Td>{sales.nip}</Table.Td>
                                            <Table.Td>
                                                <Group>
                                                    <ActionIcon variant="transparent" onClick={() => openEditSalesModal(sales.id)}>
                                                        <IconEye size={20} stroke={1.5} />
                                                    </ActionIcon>
                                                    <ActionIcon variant="transparent" onClick={() => openEditSalesModal(sales.id)}>
                                                        <IconPencil size={20} stroke={1.5} />
                                                    </ActionIcon>
                                                    <ActionIcon variant="transparent" onClick={toggle}>
                                                        <IconTrash color="red" size={20} stroke={1.5} />
                                                    </ActionIcon>
                                                </Group>
                                            </Table.Td>
                                        </Table.Tr>
                                    ))
                                ) : (
                                    <Table.Tr>
                                        <Table.Td colSpan={6} style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                            <Loader color="primary-red" size="lg" />
                                        </Table.Td>
                                    </Table.Tr>
                                )}
                            </Table.Tbody>
                        </Table>
                    </Table.ScrollContainer>
                </Card>
                <Modal opened={showAddModal} onClose={() => setShowAddModal(false)} title="Add new sales">
                    <form onSubmit={handleSubmit}>
                        <TextInput
                            label="Username"
                            placeholder="Input Username"
                            mt={10}
                            name="username"
                            withAsterisk
                            required
                            onChange={handleChange}
                        />
                        <TextInput
                            label="Fullname"
                            placeholder="Input Fullname"
                            mt={10}
                            name="name"
                            withAsterisk
                            required
                            onChange={handleChange}
                        />
                        <PasswordInput label="Password" placeholder="Input Password" mt={10} name="password" withAsterisk
                            required onChange={handleChange} />
                        <PasswordInput label="Confirm Password" placeholder="Input Password" mt={10} name="password2" withAsterisk
                            required onChange={handleChange} />
                        <Select
                            label="Birthplace"
                            placeholder="Pick sales birthplace"
                            mt={10}
                            data={cities}
                            name="city_id"
                            searchable
                            onSearchChange={(e) => searchCity(e)}
                            onChange={(e) => handleSelectChange('birth_place_id', e)}
                        />
                        <Select
                            label="Gender"
                            placeholder="Pick sales gender"
                            data={['pria', 'wanita']}
                            name="gender"
                            mt={10}
                            onChange={(e) => handleSelectChange('gender', e)}
                        />
                        <Select
                            label="Religion"
                            placeholder="Pick sales religion"
                            data={['islam', 'kristen', 'katolik', 'hindu', 'buddha', 'khonghucu']}
                            name="religion"
                            mt={10}
                            onChange={(e) => handleSelectChange('religion', e)}
                        />
                        <Select
                            label="Blood Type"
                            placeholder="Pick sales blood type"
                            data={['A', 'B', 'AB', '0']}
                            name="blood_type"
                            mt={10}
                            onChange={(e) => handleSelectChange('blood_type', e)}
                        />
                        <TextInput
                            label="Email"
                            placeholder="Input email address"
                            mt={10}
                            name="email"
                            withAsterisk
                            required
                            type="email"
                            onChange={handleChange}
                        />
                        <NumberInput
                            label="Phonenumber"
                            placeholder="Input Phone Number"
                            hideControls
                            leftSection={<Text>+62</Text>}
                            name="phone"
                            withAsterisk
                            required
                            mt={10}
                            onChange={(e) => handleNumberInput('phone', e)}
                        />
                        <TextInput
                            label="Address"
                            placeholder="Input Address"
                            name="address"
                            withAsterisk
                            required
                            mt={10}
                            onChange={handleChange}
                        />
                        <NumberInput
                            label="Postal code"
                            placeholder="Input postla code"
                            hideControls
                            name="postal_code"
                            withAsterisk
                            required
                            mt={10}
                            onChange={(e) => handleNumberInput('postal_code', e)}
                        />
                        <NumberInput
                            label="NIP"
                            placeholder="Input NIP"
                            mt={10}
                            hideControls
                            name="nip"
                            withAsterisk
                            required
                            onChange={(e) => handleNumberInput('nip', e)}

                        />
                        <Select
                            label="Employee Status"
                            placeholder="Pick sales employee status"
                            data={['tetap', 'kontrak', 'nonaktif']}
                            name="employee_status"
                            mt={10}
                            onChange={(e) => handleSelectChange('employee_status', e)}
                        />
                        <DateInput
                            label="Joining date"
                            placeholder="Date sales joining date"
                            mt={10}
                            valueFormat="YYYY-MM-DD"
                            onChange={(e) => handleSelectDate('joining_date', e)}

                        />
                        <TextInput
                            label="Bank name"
                            placeholder="Input bank name"
                            mt={10}
                            name="bank_name"
                            withAsterisk
                            required
                            onChange={handleChange}
                        />
                        <TextInput
                            label="Account name"
                            placeholder="Input account name"
                            mt={10}
                            name="account_name"
                            withAsterisk
                            required
                            onChange={handleChange}
                        />
                        <NumberInput
                            label="Account number"
                            placeholder="Input account number"
                            mt={10}
                            hideControls
                            name="account_number"
                            withAsterisk
                            required
                            onChange={(e) => handleNumberInput('account_number', e)}
                        />
                        <Select
                            label="City"
                            placeholder="Pick sales city"
                            data={cities}
                            name="city_id"
                            searchable
                            onSearchChange={(e) => searchCity(e)}
                            onChange={(e) => handleSelectChange('city_id', e)}
                            mt={10}
                        />
                        <Button type="submit" variant="filled" color="primary-red" mt={20} fullWidth>
                            Save
                        </Button>
                    </form>
                </Modal>
                <Modal opened={showEditModal} onClose={() => setShowEditModal(false)} title="Edit sales data">
                    {salesDetail && (
                        <form onSubmit={(e) => handleUpdate(salesDetail.results.id, e)}>
                            <TextInput
                                label="Username"
                                placeholder="Input Username"
                                mt={10}
                                name="username"
                                withAsterisk
                                required
                                onChange={handleChange}
                                value={salesPayload.username}
                            />
                            <TextInput
                                label="Fullname"
                                placeholder="Input Fullname"
                                mt={10}
                                name="name"
                                withAsterisk
                                required
                                onChange={handleChange}
                                value={salesPayload.name}
                            />
                            <Select
                                label="Birthplace"
                                placeholder={salesDetail.results.birth_place.name}
                                mt={10}
                                data={cities}
                                name="city_id"
                                searchable
                                onSearchChange={(e) => searchCity(e)}
                                onChange={(e) => handleSelectChange('birth_place_id', e)}
                                value={salesPayload.birth_place_id ? salesPayload.birth_place_id.toString() : ''}
                            />
                            <Select
                                label="Gender"
                                placeholder="Pick sales gender"
                                data={['pria', 'wanita']}
                                name="gender"
                                mt={10}
                                onChange={(e) => handleSelectChange('gender', e)}
                                value={salesPayload.gender}
                            />
                            <Select
                                label="Religion"
                                placeholder="Pick sales religion"
                                data={['islam', 'kristen', 'katolik', 'hindu', 'buddha', 'khonghucu']}
                                name="religion"
                                mt={10}
                                onChange={(e) => handleSelectChange('religion', e)}
                                value={salesPayload.religion}
                            />
                            <Select
                                label="Blood Type"
                                placeholder="Pick sales blood type"
                                data={['A', 'B', 'AB', '0']}
                                name="blood_type"
                                mt={10}
                                onChange={(e) => handleSelectChange('blood_type', e)}
                                value={salesPayload.blood_type}
                            />
                            <TextInput
                                label="Email"
                                placeholder="Input email address"
                                mt={10}
                                name="email"
                                withAsterisk
                                required
                                type="email"
                                onChange={handleChange}
                                value={salesPayload.email}
                            />
                            <NumberInput
                                label="Phonenumber"
                                placeholder="Input Phone Number"
                                hideControls
                                name="phone"
                                withAsterisk
                                required
                                mt={10}
                                onChange={(e) => handleNumberInput('phone', e)}
                                value={salesPayload.phone}
                            />
                            <TextInput
                                label="Address"
                                placeholder="Input Address"
                                name="address"
                                withAsterisk
                                required
                                mt={10}
                                onChange={handleChange}
                                value={salesPayload.address}
                            />
                            <NumberInput
                                label="Postal code"
                                placeholder="Input postla code"
                                hideControls
                                name="postal_code"
                                withAsterisk
                                required
                                mt={10}
                                onChange={(e) => handleNumberInput('postal_code', e)}
                                value={salesPayload.postal_code}
                            />
                            <NumberInput
                                label="NIP"
                                placeholder="Input NIP"
                                mt={10}
                                hideControls
                                name="nip"
                                withAsterisk
                                required
                                onChange={(e) => handleNumberInput('nip', e)}
                                value={salesPayload.nip}
                            />
                            <Select
                                label="Employee Status"
                                placeholder="Pick sales employee status"
                                data={['tetap', 'kontrak', 'nonaktif']}
                                name="employee_status"
                                mt={10}
                                onChange={(e) => handleSelectChange('employee_status', e)}
                                value={salesPayload.employee_status}
                            />
                            <DateInput
                                label="Joining date"
                                placeholder="Date sales joining date"
                                mt={10}
                                valueFormat="YYYY-MM-DD"
                                onChange={(e) => handleSelectDate('joining_date', e)}
                                value={salesPayload.joining_date ? new Date(salesPayload.joining_date) : null}
                            />
                            <TextInput
                                label="Bank name"
                                placeholder="Input bank name"
                                mt={10}
                                name="bank_name"
                                withAsterisk
                                required
                                onChange={handleChange}
                                value={salesPayload.bank_name}

                            />
                            <TextInput
                                label="Account name"
                                placeholder="Input account name"
                                mt={10}
                                name="account_name"
                                withAsterisk
                                required
                                onChange={handleChange}
                                value={salesPayload.account_name}
                            />
                            <NumberInput
                                label="Account number"
                                placeholder="Input account number"
                                mt={10}
                                hideControls
                                name="account_number"
                                withAsterisk
                                required
                                onChange={(e) => handleNumberInput('account_number', e)}
                                value={salesPayload.account_number}
                            />
                            <Select
                                label="City"
                                placeholder={salesDetail.results.city.name}
                                data={cities}
                                name="city_id"
                                searchable
                                onSearchChange={(e) => searchCity(e)}
                                onChange={(e) => handleSelectChange('city_id', e)}
                                mt={10}
                                value={salesPayload.city_id ? salesPayload.city_id.toString() : ''}
                            />
                            <Button type="submit" variant="filled" color="primary-red" mt={20} fullWidth>
                                Update
                            </Button>
                        </form>

                    )}
                </Modal>
                <Modal opened={opened} withCloseButton onClose={close} size="lg" title="Are you sure want to delete this item">

                    <Button variant="filled" color="primary-red" mt={20} fullWidth>
                        Delete
                    </Button>
                </Modal>
            </AppShell.Main>
        </DashboardLayout>
    )
}