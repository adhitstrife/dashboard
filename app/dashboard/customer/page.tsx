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
    const [searchedCustomer, setSearchedCustomer] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("");
    const [filterBySales, setFilterBySales] = useState("");
    const [assignSalesPayload, setAssignSalesPayload] = useState<assignSales>({
        customer_id: null,
        sales_id: null
    })

    const customerList = useAtomValue(customerListAtom)
    const setActiveMenu = useSetAtom(activeMenuAtom);

    const { height, width } = useViewportSize();
    const { getCountryList, cities, isLoadingGetCities } = useGetCities()
    const { getProvinceList, isLoadingGetProvinces, provinces } = useGetProvinces()
    const { districts, getDistrictList, isLoadingGetDistrict } = useGetDistrict();
    const { getSubDistrictList, isLoadingGetSubDistrict, subDistricts } = useGetSubDistricts();
    const { isLoadingAddCustomer, postNewCustomer } = useAddCustomer();
    const { isLoadingGetListCustomer, getListCustomer } = useGetListCustomer();
    const { isLoadingGetListSales, getListSales, salesData, listForSelesSelect } = useGetListSales();
    const { assignSalesToCustomer, isLoadingAssignSales } = useAssignSalesToCustomer();
    const { getUserProfile, userProfile, isLoading } = useUserProfile()


    const searchProvince = (e: string) => {
        getProvinceList(e)
    }
    const searchCity = (e: string) => {
        getCountryList(e, customerPayload.province_id)
    }

    const searchDistrict = (e: string) => {
        getDistrictList(e, customerPayload.city_id)
    }

    const searchSales = (e: string) => {
        getListSales(1, 10, e)
    }

    const searchSubDistrict = (e: string) => {
        getSubDistrictList(e, customerPayload.district_id)
    }

    const selectSalesToAssign = (e: string | null) => {
        if (e) {
            setAssignSalesPayload({
                ...assignSalesPayload,
                sales_id: parseInt(e)
            })
        }
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

    const handleNumberInput = (name: string, value: string | null | number) => {
        setCustomerPayload({
            ...customerPayload,
            [name]: value
        })
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setCustomerPayload({
            ...customerPayload,
            [name]: value
        });
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            await postNewCustomer(customerPayload);
        } catch (error) {
            console.log(error)
        } finally {
            setShowAddModal(false);
            getListCustomer(page, pageSize, searchedCustomer)
            clearPayload();
        }
    }

    const processAssignSales = async (e: React.FormEvent) => {
        e.preventDefault
        try {
            await assignSalesToCustomer(assignSalesPayload)
        } catch (error) {
            console.log(error)
        } finally {
            setShowAssignSalesModal(false)
            setAssignSalesPayload({
                customer_id: null,
                sales_id: null
            })
        }
    }

    const clearPayload = () => {
        setCustomerPayload({
            address: '',
            city_id: null,
            contact_person: '',
            district_id: null,
            name: '',
            npwp: '',
            permission_letter: '',
            phone: '',
            province_id: null,
            sub_district_id: null
        })
    }

    const elements = [
        {
            username: 'JohnDoe', firstName: 'John', lastName: 'Doe', email: 'john.mckinley@examplepetstore.com', phone: '+6287712345678', address: 'jl. kaki'
        },
    ]

    const handleAssignSales = (customerId: number) => {
        console.log('Assign Sales clicked for customer ID:', customerId);
        setAssignSalesPayload({
            ...assignSalesPayload,
            customer_id: customerId
        })
        setShowAssignSalesModal(true)
    };

    useEffect(() => {
        getListCustomer(page, 10, searchedCustomer)
        getProvinceList()
        getUserProfile()
        setActiveMenu("customer")
    }, [])

    const handleChangePage = async (e: any) => {
        await getListCustomer(e, 10, searchedCustomer, selectedStatus, parseInt(filterBySales));
        setPage(e);
    }

    const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        await await getListCustomer(1, 10, value, selectedStatus !== "" ? selectedStatus : undefined, filterBySales !== "" ? parseInt(filterBySales) : undefined);
        setSearchedCustomer(value);
    }

    const handleSelectedStatus = async (e: string | null) => {
        if (e) {
            const status = e == "All" ? "" : e
            await await getListCustomer(1, 10, searchedCustomer, selectedStatus !== "" ? selectedStatus : undefined, filterBySales !== "" ? parseInt(filterBySales) : undefined);
            setSelectedStatus(e);
        }
    }

    const handleFilterBySales = async (e: string | null) => {
        if (e) {
            console.log(e)
            const value = parseInt(e)
            await await getListCustomer(1, 10, searchedCustomer, selectedStatus !== "" ? selectedStatus : undefined, value);
            setFilterBySales(e);
        } else {
            console.log("foo")
            await await getListCustomer(1, 10, searchedCustomer, selectedStatus !== "" ? selectedStatus : undefined, undefined);
            setFilterBySales("");
        }
    }

    return (
        <DashboardLayout>
            <AppShell.Main bg={'#F6F6F6'}>
                <div className="header-page">
                    <Flex justify={'space-between'}>
                        <Box>
                            <Title order={2}>Customers</Title>
                            <Text size='sm' mt={10} style={{ color: theme.colors['secondary-gray'][9] }}>Here is the list of customers</Text>
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
                        <Group>
                            <Button color="primary-red" variant="filled" onClick={() => setShowAddModal(true)}>
                                Add Bulk
                            </Button>
                            <Button color="primary-red" variant="filled" onClick={() => setShowAddModal(true)}>
                                <IconPlus size={20} stroke={1.5} />
                            </Button>
                        </Group>
                    </Group>
                    {customerList ? (
                        <CustomerTable page={page} handleChangePage={handleChangePage} onAssignSales={handleAssignSales} />
                    ) : (
                        <Loader color='white' size={'lg'} />
                    )}
                </Card>
                <CustomerDetailModal />
                <CustomerEditModal />
                <CustomerDeleteModal />
                <CustomerApproveModal />
                <Modal opened={showAddModal} onClose={() => setShowAddModal(false)} title="Add new sales">
                    <form onSubmit={handleSubmit}>
                        <TextInput
                            label="Name"
                            placeholder="Input customer name"
                            name="name"
                            mt={10}
                            onChange={handleChange}
                            withAsterisk
                            required
                        />
                        <TextInput
                            label="Contact Person"
                            placeholder="Input who can be contacted"
                            name="contact_person"
                            mt={10}
                            onChange={handleChange}
                            withAsterisk
                            required
                        />
                        <NumberInput
                            label="Phone"
                            placeholder="Input customer phone number"
                            mt={10}
                            hideControls
                            onChange={(e) => handleNumberInput('phone', e)}
                            withAsterisk
                            required
                        />
                        <TextInput
                            label="Permission letter number"
                            placeholder="Input customer permission letter number"
                            name="permission_letter"
                            mt={10}
                            onChange={handleChange}
                            withAsterisk
                            required
                        />
                        <NumberInput
                            label="NPWP"
                            placeholder="Input customer NPWP"
                            mt={10}
                            hideControls
                            onChange={(e) => handleNumberInput('npwp', e)}
                            withAsterisk
                            required
                        />
                        <Select
                            label="Province"
                            placeholder="Pick customer province"
                            mt={10}
                            data={provinces}
                            name="province_id"
                            searchable
                            onSearchChange={(e) => searchProvince(e)}
                            onChange={(e) => handleSelectChange('province_id', e)}
                            withAsterisk
                        />
                        <Select
                            label="City"
                            placeholder="Pick customer city"
                            mt={10}
                            data={cities}
                            name="city_id"
                            searchable
                            onSearchChange={(e) => searchCity(e)}
                            onChange={(e) => handleSelectChange('city_id', e)}
                            disabled={!customerPayload.province_id}
                            onFocus={(e) => searchCity(e.target.value)}
                            withAsterisk
                        />
                        <Select
                            label="District"
                            placeholder="Pick customer district"
                            mt={10}
                            data={districts}
                            name="district_id"
                            searchable
                            onSearchChange={(e) => searchDistrict(e)}
                            onChange={(e) => handleSelectChange('district_id', e)}
                            disabled={!customerPayload.city_id}
                            onFocus={(e) => searchDistrict(e.target.value)}
                            withAsterisk
                        />
                        <Select
                            label="Sub District"
                            placeholder="Pick customer sub district"
                            mt={10}
                            data={subDistricts}
                            name="sub_district_id"
                            searchable
                            onSearchChange={(e) => searchSubDistrict(e)}
                            onChange={(e) => handleSelectChange('sub_district_id', e)}
                            disabled={!customerPayload.district_id}
                            onFocus={(e) => searchSubDistrict(e.target.value)}
                            withAsterisk
                        />
                        <TextInput
                            label="Address"
                            placeholder="Input Address"
                            mt={10}
                            onChange={handleChange}
                            name="address"
                            withAsterisk
                            required
                        />
                        <Button type="submit" variant="filled" color="primary-red" mt={20} fullWidth>
                            Save
                        </Button>
                    </form>
                </Modal>
                <Modal opened={showAssignSalesModal} onClose={() => setShowAssignSalesModal(false)} title="Pick sales to assign to this customer">
                    <form onSubmit={processAssignSales}>
                        <Select
                            label="Sales"
                            placeholder="Search sales name"
                            mt={10}
                            data={listForSelesSelect}
                            name="sales_id"
                            searchable
                            onSearchChange={(e) => searchSales(e)}
                            onChange={(e) => selectSalesToAssign(e)}
                            withAsterisk
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