'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { IconEye, IconPencil, IconPlus, IconTrash } from '@tabler/icons-react';
import { useSetAtom } from 'jotai';
import {
  ActionIcon,
  AppShell,
  Box,
  Button,
  Card,
  Dialog,
  Flex,
  Group,
  Loader,
  Modal,
  NumberInput,
  Pagination,
  PasswordInput,
  Select,
  Table,
  Text,
  TextInput,
  Title,
  useMantineTheme,
} from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { useDisclosure, useViewportSize } from '@mantine/hooks';
import salesPayload from '@/app/interface/payload/salesPayload';
import TimeDisplay from '@/components/clock/clock';
import { BulkAssignModal } from '@/components/modal/sales/bulkAssignModal';
import useUserProfile from '@/hooks/auth/useUserProfile';
import useGetCities from '@/hooks/region/useGetCities';
import useAddSales from '@/hooks/sales/useAddSales';
import useDeleteSales from '@/hooks/sales/useDeleteSales';
import useEditSales from '@/hooks/sales/useEditSales';
import useGetListSales from '@/hooks/sales/useGetListSales';
import useGetListSalesForSelect from '@/hooks/sales/useGetListSalesForSelect';
import useGetSalesDetail from '@/hooks/sales/useGetSalesDetail';
import { activeMenuAtom } from '@/state/component_state/menu/activeMenuAtom';
import { salesBulkAssignAtom } from '@/state/component_state/modal/sales/salesBulkAssignAtom';
import DashboardLayout from '../layout';

export default function user() {
  const theme = useMantineTheme();
  const { height, width } = useViewportSize();
  const { getCountryList, cities, isLoadingGetCities } = useGetCities();
  const { isLoadingAddSales, postNewSales } = useAddSales();
  const { isLoadingEditSales, updateDataSales } = useEditSales();
  const { isLoadingGetListSales, getListSales, salesData } = useGetListSales();
  const { isLoadingGetListSalesForSelect, getListSalesForSelect, listForSelesSelect } =
    useGetListSalesForSelect();
  const { getDetailSales, isLoadingGetDetailSales, salesDetail, setSalesDetail } =
    useGetSalesDetail();
  const { deleteSales, isLoadingDeleteSales } = useDeleteSales();
  const { getUserProfile, userProfile, isLoading } = useUserProfile();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [deletedSales, setDeletedSales] = useState(0);
  const [searchedSales, setSearchedSales] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [salesPayload, setSalesPayload] = useState<salesPayload>({
    username: '',
    name: '',
    password: '',
    password2: '',
    birth_place_id: 0,
    gender: '',
    religion: '',
    email: '',
    phone: '',
    address: '',
    postal_code: '',
    nip: '',
    employee_status: '',
    job_level: 'staff',
    joining_date: '',
    city_id: 0,
    area: '',
    division: '',
    supervisor_id: null,
    user_type: '',
  });

  const setActiveMenu = useSetAtom(activeMenuAtom);
  const setBulkAssignModal = useSetAtom(salesBulkAssignAtom);

  useEffect(() => {
    getCountryList();
    getListSales();
    getUserProfile();
    setActiveMenu('sales');
  }, []);

  useEffect(() => {
    if (salesDetail) {
      const sales = salesDetail.results;
      setSalesPayload({
        username: sales.username,
        name: sales.name,
        password: sales.password,
        password2: sales.password2,
        birth_place_id: sales.birth_place ? sales.birth_place.id : null,
        gender: sales.gender,
        religion: sales.religion,
        email: sales.email,
        phone: sales.phone,
        address: sales.address,
        postal_code: sales.postal_code,
        nip: sales.nip,
        employee_status: sales.employee_status,
        job_level: sales.job_level,
        joining_date: sales.joining_date,
        city_id: sales.city ? sales.city.id : null,
        area: sales.area,
        division: sales.division,
        supervisor_id: null,
        user_type: '',
      });
    }
  }, [salesDetail]);

  const searchSuperVisor = (e: string) => {
    getListSalesForSelect(1, 10, e, 'Supervisor');
  };

  const searchCity = (e: string) => {
    getCountryList(e);
  };

  const handleSelectChange = (name: string, e: string | null) => {
    if (e) {
      if (name === 'birth_place_id' || name === 'city_id') {
        const value = parseInt(e);
        setSalesPayload({
          ...salesPayload,
          [name]: value,
        });
      } else if (name == 'supervisor_id') {
        const value = parseInt(e);
        setSalesPayload({
          ...salesPayload,
          [name]: value ? value : null,
        });
      } else {
        setSalesPayload({
          ...salesPayload,
          [name]: e,
        });
      }
    }
  };

  const handleNumberInput = (name: string, value: string | null | number) => {
    setSalesPayload({
      ...salesPayload,
      [name]: value,
    });
  };

  const handleSelectDate = (name: string, value: Date | null) => {
    if (value) {
      const year = value.getFullYear();
      const month = String(value.getMonth() + 1).padStart(2, '0'); // Months are zero-based
      const day = String(value.getDate()).padStart(2, '0');
      const date = `${year}-${month}-${day}`;
      setSalesPayload({
        ...salesPayload,
        [name]: date,
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setSalesPayload({
      ...salesPayload,
      [name]: value,
    });
  };

  const clearPayload = () => {
    setSalesPayload({
      username: '',
      name: '',
      password: '',
      password2: '',
      birth_place_id: 0,
      gender: '',
      religion: '',
      email: '',
      phone: '',
      address: '',
      postal_code: '',
      nip: '',
      employee_status: '',
      job_level: '',
      joining_date: '',
      city_id: 0,
      area: '',
      division: '',
      supervisor_id: null,
      user_type: '',
    });
  };

  const handleCloseModal = () => {
    setDeletedSales(0);
    clearPayload();
    setSalesDetail(null);
    setShowAddModal(false);
    setShowEditModal(false);
    setShowDeleteModal(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await postNewSales(salesPayload);
    } catch (error) {
      console.log(error);
    } finally {
      setShowAddModal(false);
      getListSales(page, pageSize, searchedSales);
      clearPayload();
    }
  };

  const handleUpdate = async (id: number, e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateDataSales(id, salesPayload);
    } catch (error) {
      console.log(error);
    } finally {
      setShowEditModal(false);
      getListSales(page, pageSize, searchedSales);
      clearPayload();
    }
  };

  const handleDelete = async () => {
    try {
      await deleteSales(deletedSales);
    } catch (error) {
      console.log(error);
    } finally {
      setShowDeleteModal(false);
      getListSales(page, pageSize, searchedSales);
      setDeletedSales(0);
    }
  };

  const openEditSalesModal = async (id: number) => {
    try {
      await getDetailSales(id);
      getListSales();
    } catch (error) {
      console.log(error);
    } finally {
      setShowEditModal(true);
    }
  };

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    await getListSales(page, pageSize, value);
    setSearchedSales(value);
  };

  const handleChangePage = async (e: any) => {
    await getListSales(e, pageSize, searchedSales);
    setPage(e);
  };

  const handleModalDelete = (id: number) => {
    setShowDeleteModal(true);
    setDeletedSales(id);
  };

  return (
    <DashboardLayout>
      <AppShell.Main bg={'#F6F6F6'}>
        <div className="header-page">
          <Flex justify={'space-between'}>
            <Box>
              <Title order={2}>Sales</Title>
              <Text size="sm" mt={10} style={{ color: theme.colors['secondary-gray'][9] }}>
                Here is the list of sales
              </Text>
            </Box>
            <Box>
              <Text ta={'right'} size="sm" mt={10}>
                Current time
              </Text>
              {/* <TimeDisplay /> */}
            </Box>
          </Flex>
        </div>
        <Card withBorder radius={'md'} px={20} py={30} mah={'screen'} mt={20}>
          <Group justify="space-between">
            <Group>
              <TextInput placeholder="Search Sales" onChange={(e) => handleSearch(e)} />
            </Group>
            <Group>
              <Button color="primary-red" variant="filled" onClick={() => setBulkAssignModal(true)}>
                Assign Bulk
              </Button>
              <Button color="primary-red" variant="filled" onClick={() => setShowAddModal(true)}>
                <IconPlus size={20} stroke={1.5} />
              </Button>
            </Group>
          </Group>
          {salesData && (
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
                            <ActionIcon
                              variant="transparent"
                              component={Link}
                              href={`/dashboard/sales/${sales.id}`}
                            >
                              <IconEye size={20} stroke={1.5} />
                            </ActionIcon>
                            <ActionIcon
                              variant="transparent"
                              onClick={() => openEditSalesModal(sales.id)}
                            >
                              <IconPencil size={20} stroke={1.5} />
                            </ActionIcon>
                            <ActionIcon
                              variant="transparent"
                              onClick={() => handleModalDelete(sales.id)}
                            >
                              <IconTrash color="red" size={20} stroke={1.5} />
                            </ActionIcon>
                          </Group>
                        </Table.Td>
                      </Table.Tr>
                    ))
                  ) : (
                    <Table.Tr>
                      <Table.Td
                        colSpan={6}
                        style={{ textAlign: 'center', verticalAlign: 'middle' }}
                      >
                        <Loader color="primary-red" size="lg" />
                      </Table.Td>
                    </Table.Tr>
                  )}
                </Table.Tbody>
              </Table>
              {salesData.count > 10 && (
                <Pagination
                  color="primary-red"
                  mt={10}
                  value={page}
                  onChange={(e) => handleChangePage(e)}
                  total={Math.ceil(salesData.count / pageSize)}
                />
              )}
            </Table.ScrollContainer>
          )}
        </Card>
        <BulkAssignModal />
        <Modal opened={showAddModal} onClose={handleCloseModal} title="Add new sales">
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
            <PasswordInput
              label="Password"
              placeholder="Input Password"
              mt={10}
              name="password"
              withAsterisk
              required
              onChange={handleChange}
            />
            <PasswordInput
              label="Confirm Password"
              placeholder="Input Password"
              mt={10}
              name="password2"
              withAsterisk
              required
              onChange={handleChange}
            />
            <Select
              label="User Type"
              placeholder="Pick sales user type"
              data={['Sales', 'Supervisor']}
              name="user_type"
              mt={10}
              onChange={(e) => handleSelectChange('user_type', e)}
            />
            {salesPayload.user_type == 'Sales' && (
              <Select
                label="Supervisor"
                placeholder="Pick sales supervisor"
                mt={10}
                data={listForSelesSelect}
                name="supervisor_id"
                searchable
                onSearchChange={(e) => searchSuperVisor(e)}
                onChange={(e) => handleSelectChange('supervisor_id', e)}
              />
            )}

            <Select
              label="Division"
              placeholder="Pick sales division"
              data={['Office', 'Laboratium', 'Pengantaran', 'Reguler']}
              name="division"
              mt={10}
              onChange={(e) => handleSelectChange('division', e)}
            />
            <Select
              label="Area"
              placeholder="Pick sales area"
              data={['utara', 'selatan']}
              name="area"
              mt={10}
              onChange={(e) => handleSelectChange('area', e)}
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
            <Button type="submit" variant="filled" color="primary-red" mt={20} fullWidth>
              Save
            </Button>
          </form>
        </Modal>
        <Modal opened={showEditModal} onClose={handleCloseModal} title="Edit sales data">
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
                placeholder={
                  salesDetail.results.birth_place
                    ? salesDetail.results.birth_place.name
                    : 'Select birth place'
                }
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
                label="User Type"
                placeholder="Pick sales user type"
                data={['Sales', 'Supervisor']}
                name="user_type"
                mt={10}
                onChange={(e) => handleSelectChange('user_type', e)}
                value={salesPayload.user_type}
              />
              {salesPayload.user_type == 'Sales' && (
                <Select
                  label="Supervisor"
                  placeholder="Pick sales supervisor"
                  mt={10}
                  data={listForSelesSelect}
                  name="supervisor_id"
                  searchable
                  onSearchChange={(e) => searchSuperVisor(e)}
                  onChange={(e) => handleSelectChange('supervisor_id', e)}
                />
              )}
              {salesPayload.division}
              <Select
                label="Division"
                placeholder="Pick sales division"
                data={['Office', 'Laboratium', 'Pengantaran', 'Reguler']}
                name="division"
                mt={10}
                onChange={(e) => handleSelectChange('division', e)}
                value={salesPayload.division}
              />
              <Select
                label="Area"
                placeholder="Pick sales area"
                data={['utara', 'selatan']}
                name="area"
                mt={10}
                onChange={(e) => handleSelectChange('area', e)}
                value={salesPayload.area}
              />
              {/* <Select
                                label="Blood Type"
                                placeholder="Pick sales blood type"
                                data={['A', 'B', 'AB', '0']}
                                name="blood_type"
                                mt={10}
                                onChange={(e) => handleSelectChange('blood_type', e)}
                                value={salesPayload.blood_type}
                            /> */}
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
                mt={10}
                onChange={(e) => handleNumberInput('phone', e)}
                value={salesPayload.phone}
              />
              <TextInput
                label="Address"
                placeholder="Input Address"
                name="address"
                mt={10}
                onChange={handleChange}
                value={salesPayload.address}
              />
              <NumberInput
                label="Postal code"
                placeholder="Input postla code"
                hideControls
                name="postal_code"
                mt={10}
                min={0}
                max={999999}
                clampBehavior="strict"
                onChange={(e) => handleNumberInput('postal_code', e)}
                value={salesPayload.postal_code}
              />
              <NumberInput
                label="NIP"
                placeholder="Input NIP"
                mt={10}
                hideControls
                name="nip"
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
              <Select
                label="City"
                placeholder={
                  salesDetail.results.city ? salesDetail.results.city.name : 'Select city'
                }
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
        <Modal
          opened={showDeleteModal}
          withCloseButton
          onClose={handleCloseModal}
          size="lg"
          title="Are you sure want to delete this item"
        >
          <Button variant="filled" color="primary-red" mt={20} onClick={handleDelete} fullWidth>
            Delete
          </Button>
        </Modal>
      </AppShell.Main>
    </DashboardLayout>
  );
}
