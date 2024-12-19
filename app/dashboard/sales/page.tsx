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

export default function user() {
    const theme = useMantineTheme();
    const { height, width } = useViewportSize();
    const { getCountryList, cities, isLoadingGetCities } = useGetCities()
    const { isLoadingAddSales, postNewSales } = useAddSales();
    const { isLoadingGetListSales, getListSales, salesData } = useGetListSales();
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [opened, { toggle, close }] = useDisclosure(false);
    const [addSalesPayload, setAddSalesPayload] = useState<salesPayload>({
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
        joining_date: null,
        bank_name: '',
        account_name: '',
        acoount_number: '',
        city_id: 0,
    })

    useEffect(() => {
        getCountryList()
        getListSales()
    }, [])

    useEffect(() => {
        console.log(addSalesPayload)
    }, [addSalesPayload])

    const searchCity = (e: string) => {
        getCountryList(e)
    }


    const handleSelectChange = (name: string, e: string | null) => {
        if (e) {
            if (name === 'birth_place_id' || name === 'city_id') {
                const value = parseInt(e)
                setAddSalesPayload({
                    ...addSalesPayload,
                    [name]: value
                })
            } else {
                setAddSalesPayload({
                    ...addSalesPayload,
                    [name]: e
                })
            }
        }
    }

    const handleNumberInput = (name: string, value: string | null | number) => {
        setAddSalesPayload({
            ...addSalesPayload,
            [name]: value
        })
    }

    const handleSelectDate = (name: string, value: Date | null) => {
        if (value) {
            const year = value.getFullYear();
            const month = String(value.getMonth() + 1).padStart(2, '0'); // Months are zero-based
            const day = String(value.getDate()).padStart(2, '0');
            const date = `${year}-${month}-${day}`
            setAddSalesPayload({
                ...addSalesPayload,
                [name]: date
            })
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setAddSalesPayload({
            ...addSalesPayload,
            [name]: value
        });
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            await postNewSales(addSalesPayload);
        } catch (error) {
            console.log(error)
        } finally {
            setShowAddModal(false);
            setAddSalesPayload({
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
                joining_date: null,
                bank_name: '',
                account_name: '',
                acoount_number: '',
                city_id: 0,
            })
        }
    }

    const elements = [
        {
            username: 'JohnDoe', firstName: 'John', lastName: 'Doe', email: 'john.mckinley@examplepetstore.com', phone: '+6287712345678', address: 'jl. kaki'
        },
    ]
    const rows = elements.map((element) => (
        <Table.Tr key={element.username}>
            <Table.Td>{element.username}</Table.Td>
            <Table.Td>{element.email}</Table.Td>
            <Table.Td>{element.firstName}</Table.Td>
            <Table.Td>{element.lastName}</Table.Td>
            <Table.Td>{element.phone}</Table.Td>
            <Table.Td>{element.address}</Table.Td>
            <Table.Td>
                <Group>
                    <ActionIcon variant="transparent" onClick={() => setShowEditModal(true)}>
                        <IconEye size={20} stroke={1.5} />
                    </ActionIcon>
                    <ActionIcon variant="transparent" onClick={() => setShowEditModal(true)}>
                        <IconPencil size={20} stroke={1.5} />
                    </ActionIcon>
                    <ActionIcon variant="transparent" onClick={toggle}>
                        <IconTrash color="red" size={20} stroke={1.5} />
                    </ActionIcon>
                </Group>
            </Table.Td>
        </Table.Tr>
    ));

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
                                                    <ActionIcon variant="transparent" onClick={() => setShowEditModal(true)}>
                                                        <IconEye size={20} stroke={1.5} />
                                                    </ActionIcon>
                                                    <ActionIcon variant="transparent" onClick={() => setShowEditModal(true)}>
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
                            onChange={(e) => handleNumberInput('phone', `+62${e}`)}
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
                    <form>
                        <TextInput
                            label="Username"
                            placeholder="Input Username"
                            mt={10}
                            name="username"
                            withAsterisk
                            required
                        />
                        <TextInput
                            label="Firstname"
                            placeholder="Input Firstname"
                            mt={10}
                            name="name"
                            withAsterisk
                            required
                        />
                        <PasswordInput label="Password" placeholder="Input Password" mt={10} name="password" withAsterisk
                            required />
                        <PasswordInput label="Confirm Password" placeholder="Input Password" mt={10} name="password2" withAsterisk
                            required />
                        <TextInput
                            label="Birth place"
                            placeholder="Input where you born"
                            mt={10}
                            name="birth_place"
                            withAsterisk
                            required
                        />
                        <Select
                            label="Gender"
                            placeholder="Pick sales gender"
                            data={['male', 'female']}
                            name="gender"
                        />
                        <Select
                            label="Religion"
                            placeholder="Pick sales religion"
                            data={['islam', 'kristen', 'katolik', 'hindu', 'buddha', 'khonghucu']}
                            name="religion"
                        />
                        <Select
                            label="Blood Type"
                            placeholder="Pick sales blood type"
                            data={['A', 'B', 'AB', '0']}
                            name="blood_type"
                        />
                        <TextInput
                            label="Email"
                            placeholder="Input email address"
                            mt={10}
                            name="email"
                            withAsterisk
                            required
                        />
                        <NumberInput
                            label="Phonenumber"
                            placeholder="Input Phone Number"
                            mt={10}
                            hideControls
                            leftSection={<Text>+62</Text>}
                            name="phone"
                            withAsterisk
                            required
                        />
                        <TextInput
                            label="Address"
                            placeholder="Input Address"
                            mt={10}
                            name="address"
                            withAsterisk
                            required
                        />
                        <NumberInput
                            label="Postal code"
                            placeholder="Input postla code"
                            mt={10}
                            hideControls
                            name="postal_code"
                            withAsterisk
                            required
                        />
                        <NumberInput
                            label="NIP"
                            placeholder="Input NIP"
                            mt={10}
                            hideControls
                            name="nip"
                            withAsterisk
                            required
                        />
                        <DateInput
                            label="Joining date"
                            placeholder="Date sales joining date"

                        />
                        <TextInput
                            label="Bank name"
                            placeholder="Input bank name"
                            mt={10}
                            name="bank_name"
                            withAsterisk
                            required
                        />
                        <TextInput
                            label="Account name"
                            placeholder="Input account name"
                            mt={10}
                            name="account_name"
                            withAsterisk
                            required
                        />
                        <NumberInput
                            label="Account number"
                            placeholder="Input account number"
                            mt={10}
                            hideControls
                            name="account_number"
                            withAsterisk
                            required
                        />
                        <Select
                            label="City"
                            placeholder="Pick sales city"
                            data={['A', 'B', 'AB', '0']}
                            name="city_id"
                        />
                        <Button variant="filled" color="primary-red" mt={20} fullWidth>
                            Save
                        </Button>
                    </form>
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