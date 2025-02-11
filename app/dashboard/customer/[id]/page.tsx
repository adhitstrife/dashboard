'use client';

import { use, useEffect, useState } from 'react';
import Link from 'next/link';
import {
  IconCalendarCheck,
  IconClockCheck,
  IconEdit,
  IconEye,
  IconFileDollar,
  IconLogs,
  IconMap,
  IconRowRemove,
  IconTable,
  IconUser,
  IconUserDollar,
  IconUserX,
} from '@tabler/icons-react';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import {
  ActionIcon,
  AppShell,
  Badge,
  Box,
  Button,
  Card,
  Center,
  Flex,
  Grid,
  Group,
  Image,
  Modal,
  NumberInput,
  Progress,
  Select,
  Table,
  Tabs,
  Text,
  Title,
  Tooltip,
  useMantineTheme,
} from '@mantine/core';
import { YearPickerInput } from '@mantine/dates';
import { useViewportSize } from '@mantine/hooks';
import customerBulkAssign from '@/app/interface/payload/customerBulkAssign';
import targetAddPayload from '@/app/interface/payload/targetAddPayload';
import customerData from '@/app/interface/response/customer/customerData';
import TimeDisplay from '@/components/clock/clock';
import { LogModal } from '@/components/modal/activity_logs/LogModal';
import { CustomerApproveModal } from '@/components/modal/customer/customerApproveModal';
import { CustomerDeleteModal } from '@/components/modal/customer/customerDeleteModal';
import { CustomerDetailModal } from '@/components/modal/customer/customerDetailModal';
import { CustomerEditModal } from '@/components/modal/customer/customerEditModal';
import { BulkAssignModal } from '@/components/modal/sales/bulkAssignModal';
import { AttendanceTable } from '@/components/table/attendanceTable';
import { LeaveTable } from '@/components/table/leaveTable';
import { LogTable } from '@/components/table/logTable';
import { VisitTable } from '@/components/table/visitTable';
import useGetListAttendance from '@/hooks/attendance/useGetListAttendance';
import useUserProfile from '@/hooks/auth/useUserProfile';
import useAssignSalesToCustomer from '@/hooks/customer/useAssignSalesToCustomer';
import useGetCustomerDetail from '@/hooks/customer/useGetCustomerDetail';
import useGetListCustomer from '@/hooks/customer/useGetListCustomer';
import useUnassignCustomer from '@/hooks/customer/useUnassignCustomer';
import useGetListLeave from '@/hooks/leave/useGetListLeave';
import useBulkAssignCustomer from '@/hooks/sales/useBulkAssignCustomer';
import useGetListSales from '@/hooks/sales/useGetListSales';
import useAddTarget from '@/hooks/target/useAddTarget';
import useUpdateTarget from '@/hooks/target/useUpdateTarget';
import useGetListVisit from '@/hooks/visit/useGetListVisit';
import { activeMenuAtom } from '@/state/component_state/menu/activeMenuAtom';
import { activityLogModalAtom } from '@/state/component_state/modal/activityLogs/activityLogModalAtom';
import { customerApproveModalAtom } from '@/state/component_state/modal/customerApproveModalAtom';
import { salesBulkAssignAtom } from '@/state/component_state/modal/sales/salesBulkAssignAtom';
import { visitFilterModalAtom } from '@/state/component_state/modal/visit/visitFilterModalAtom';
import { logDetailAtom } from '@/state/data/activity_logs/logDetailAtom';
import { logListAtom } from '@/state/data/activity_logs/logsListAtom';
import { attendanceListAtom } from '@/state/data/attendance/attendanceListAtom';
import { customerDetailAtom } from '@/state/data/customer/customerDetailAtom';
import { customerListAtom } from '@/state/data/customer/customerListAtom';
import { leaveListAtom } from '@/state/data/leave/leaveListAtom';
import { visitFilterAtom } from '@/state/data/visit/visitFilterAtom';
import { visitListAtom } from '@/state/data/visit/visitListAtom';
import { DataLabel } from '../../../../components/label/dataLabel';
import { CustomerTable } from '../../../../components/table/customerTable';
import DashboardLayout from '../../layout';

interface customerDetailProps {
  params: { id: string }; // id is usually passed as a string in params
}

export default function customerDetail({ params }: { params: Promise<{ id: number }> }) {
  const { id } = use(params);
  const theme = useMantineTheme();
  const { height, width } = useViewportSize();
  const { getUserProfile, userProfile, isLoading } = useUserProfile();
  const { customerDetail, getDetailCustomer, isLoadingGetDetailCustomer, setCustomerDetail } =
    useGetCustomerDetail();
  const { isLoadingGetListCustomer, getListCustomer } = useGetListCustomer();
  const { getListLeave, isLoadingGetListLeave } = useGetListLeave();
  const { isLoadingGetListVisit, getListVisit } = useGetListVisit();
  const { getListAttendance, isLoadingGetListAttendance } = useGetListAttendance();
  const { isLoadingAddTarget, postNewTarget } = useAddTarget();
  const { isLoadingUpdateTarget, updateTarget } = useUpdateTarget();
  const { isLoadingGetListSales, getListSales, salesData, listForSelesSelect } = useGetListSales();
  const [assignSalesPayload, setAssignSalesPayload] = useState<customerBulkAssign>({
    sales_id: null,
    customer_ids: [],
  });
  const { isLoadingBulkAssignCustomer, assignCustomers } = useBulkAssignCustomer();
  const { isLoadingUnassignCustomer, unassignCustomer } = useUnassignCustomer();

  const leaveData = useAtomValue(leaveListAtom);
  const visitList = useAtomValue(visitListAtom);
  const attendanceList = useAtomValue(attendanceListAtom);
  const setBulkAssignModal = useSetAtom(salesBulkAssignAtom);

  const [showAssignSalesModal, setShowAssignSalesModal] = useState(false);
  const [showEditTargetModal, setShowEditTargetModal] = useState(false);
  const [showAddTargetModal, setShowAddTargetModal] = useState(false);
  const [pageCustomer, setPageCustomer] = useState(1);
  const [pageLeave, setPageLeave] = useState(1);
  const [addPayload, setAddPayload] = useState<targetAddPayload>({
    sales_id: null,
    period: null,
    target_amount: null,
    current_progress: null,
  });
  const [editPayload, setEditPayload] = useState<targetAddPayload>({
    sales_id: null,
    period: null,
    target_amount: null,
    current_progress: null,
  });
  const [searchedCustomer, setSearchedCustomer] = useState('');
  const currentYear = new Date().getFullYear();
  const maxYearDate = new Date(currentYear + 1, 11, 31);

  const customerList = useAtomValue(customerListAtom);
  const [filterVisit, setFilterVisit] = useAtom(visitFilterAtom);
  const setActiveMenu = useSetAtom(activeMenuAtom);
  const setIsModalApproveOpen = useSetAtom(customerApproveModalAtom);

  const setLogDetail = useSetAtom(logDetailAtom);
  const setOpenModal = useSetAtom(activityLogModalAtom);
  const setDetailCustomer = useSetAtom(customerDetailAtom);

  useEffect(() => {
    getUserProfile();
    getDetailCustomer(id);
    setAddPayload((prevPayload) => {
      const payload = {
        ...prevPayload,
        sales_id: id,
      };
      return payload;
    });
    setActiveMenu('customer');
  }, [id]);

  useEffect(() => {
    if (customerDetail) {
      setFilterVisit({
        ...filterVisit,
        customerId: customerDetail.results.id.toString(),
      });
    }
  }, [customerDetail]);

  useEffect(() => {
    getListVisit(1, 10);
  }, [filterVisit]);

  const formatDate = (isoDate: string) => {
    const date = new Date(isoDate);
    const dd = String(date.getDate()).padStart(2, '0');
    const mm = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const yyyy = date.getFullYear();
    const hh = String(date.getHours()).padStart(2, '0');
    const min = String(date.getMinutes()).padStart(2, '0');
    const ss = String(date.getSeconds()).padStart(2, '0');

    return `${dd}/${mm}/${yyyy} ${hh}:${min}:${ss}`;
  };

  const openDetailLogModal = (log: logData) => {
    setLogDetail(log);
    setOpenModal(true);
  };

  const selectSalesToAssign = (e: string | null) => {
    if (e) {
      setAssignSalesPayload({
        ...assignSalesPayload,
        sales_id: parseInt(e),
      });
    }
  };

  const handleUnassignSales = async (assignId: number) => {
    try {
      await unassignCustomer(assignId);
    } catch (error) {
      console.log(error);
    } finally {
      getDetailCustomer(id);
    }
  };

  const handleChangePageCustomer = async (e: any) => {
    await getListCustomer(e, 10, searchedCustomer, undefined, id);
    setPageCustomer(e);
  };

  const handleChangePageLeave = async (e: any) => {
    await getListLeave(e, 10, undefined, id);
    setPageCustomer(e);
  };

  const handleAssignSales = (customerId: number) => {
    setAssignSalesPayload({
      ...assignSalesPayload,
      customer_ids: [...assignSalesPayload.customer_ids, customerId],
    });
    setShowAssignSalesModal(true);
  };

  const handleOpenApproveModal = (customer: customerData) => {
    setDetailCustomer(customer);
    setIsModalApproveOpen(true);
  };

  const processAssignSales = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await assignCustomers(assignSalesPayload);
    } catch (error) {
      console.log(error);
    } finally {
      setShowAssignSalesModal(false);
      setAssignSalesPayload({
        customer_ids: [],
        sales_id: null,
      });
    }
  };

  const searchSales = (e: string) => {
    getListSales(1, 10, e);
  };

  return (
    <DashboardLayout>
      <AppShell.Main bg={'#F6F6F6'}>
        <div className="header-page">
          <Flex justify={'space-between'}>
            <Box>
              <Title order={2}>Customer Detail</Title>
              <Text size="sm" mt={10} style={{ color: theme.colors['secondary-gray'][9] }}>
                Here is the detail information of customer
              </Text>
            </Box>
            <Box>
              <Text ta={'right'} size="sm" mt={10}>
                Current time
              </Text>
              <TimeDisplay />
            </Box>
          </Flex>
        </div>
        <Card withBorder radius={'md'} px={20} py={30} mah={'screen'} mt={20}>
          {customerDetail && (
            <Box>
              <Center>
                <Image
                  radius="md"
                  h={200}
                  w={180}
                  src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-7.png"
                />
              </Center>
              <Title mt={30} order={3} ta={'center'}>
                {customerDetail.results.name}
              </Title>
              <Box mt={40}>
                <Tabs color="primary-red" variant="outline" defaultValue="detail">
                  <Tabs.List>
                    <Tabs.Tab value="detail" leftSection={<IconUser size={20} stroke={1.5} />}>
                      Detail
                    </Tabs.Tab>
                    <Tabs.Tab value="sales" leftSection={<IconClockCheck size={20} stroke={1.5} />}>
                      Sales
                    </Tabs.Tab>
                    <Tabs.Tab value="visit" leftSection={<IconFileDollar size={20} stroke={1.5} />}>
                      Visits
                    </Tabs.Tab>
                    {userProfile?.user_type == 'Manager' && (
                      <Tabs.Tab value="logs" leftSection={<IconLogs size={20} stroke={1.5} />}>
                        Logs
                      </Tabs.Tab>
                    )}
                  </Tabs.List>
                  <Tabs.Panel value="detail">
                    <Grid mt={40}>
                      <Grid.Col span={6}>
                        <DataLabel label="Fullname" value={customerDetail.results.name} />
                      </Grid.Col>
                      <Grid.Col span={6}>
                        <DataLabel
                          label="Address"
                          value={
                            customerDetail.results.address ? customerDetail.results.address : '-'
                          }
                        />
                      </Grid.Col>
                      <Grid.Col span={6}>
                        <DataLabel
                          label="Contact Person"
                          value={
                            customerDetail.results.contact_person
                              ? customerDetail.results.contact_person
                              : '-'
                          }
                        />
                      </Grid.Col>
                      <Grid.Col span={6}>
                        <DataLabel
                          label="Phone Number"
                          value={
                            customerDetail.results.phone
                              ? customerDetail.results.contact_person
                              : '-'
                          }
                        />
                      </Grid.Col>
                      <Grid.Col span={6}>
                        <DataLabel
                          label="Province"
                          value={
                            customerDetail.results.province
                              ? customerDetail.results.province.name
                              : '-'
                          }
                        />
                      </Grid.Col>
                      <Grid.Col span={6}>
                        <DataLabel
                          label="City"
                          value={
                            customerDetail.results.city ? customerDetail.results.city.name : '-'
                          }
                        />
                      </Grid.Col>
                      <Grid.Col span={6}>
                        <DataLabel
                          label="District"
                          value={
                            customerDetail.results.district
                              ? customerDetail.results.district.name
                              : '-'
                          }
                        />
                      </Grid.Col>
                      <Grid.Col span={6}>
                        <DataLabel
                          label="Sub District"
                          value={
                            customerDetail.results.sub_district
                              ? customerDetail.results.sub_district.name
                              : '-'
                          }
                        />
                      </Grid.Col>
                      <Grid.Col span={6}>
                        <DataLabel
                          label="NPWP"
                          value={customerDetail.results.npwp ? customerDetail.results.npwp : '-'}
                        />
                        {customerDetail.results.npwp_image && (
                          <Link href={customerDetail.results.npwp_image} target="_blank">
                            <Image src={customerDetail.results.npwp_image} h={200} w={400} />
                          </Link>
                        )}
                      </Grid.Col>
                      <Grid.Col span={6}>
                        <DataLabel
                          label="Permission Letter"
                          value={
                            customerDetail.results.permission_letter
                              ? customerDetail.results.permission_letter
                              : '-'
                          }
                        />
                      </Grid.Col>
                      <Grid.Col span={6}>
                        <DataLabel label="Status" withValue={false} value="" />
                        {customerDetail.results.status == 'In Review' ? (
                          <Button
                            color="primary-red"
                            onClick={() => handleOpenApproveModal(customerDetail.results)}
                          >
                            Aprrove Customer
                          </Button>
                        ) : (
                          <Badge color="primary-red" size="lg">
                            Approved
                          </Badge>
                        )}
                      </Grid.Col>
                    </Grid>
                  </Tabs.Panel>
                  <Tabs.Panel value="sales">
                    <Button
                      color="primary-red"
                      mt={20}
                      variant="filled"
                      onClick={() => handleAssignSales(customerDetail.results.id)}
                    >
                      Assign Sales
                    </Button>
                    <Table.ScrollContainer minWidth={200} mt={20}>
                      <Table>
                        <Table.Thead>
                          <Table.Tr>
                            <Table.Th>Name</Table.Th>
                            <Table.Th>Division</Table.Th>
                            <Table.Th>Area</Table.Th>
                            <Table.Th>Action</Table.Th>
                          </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>
                          {customerDetail.results.sales.map((sales, index) => (
                            <Table.Tr key={index}>
                              <Table.Td>{sales.sales_name}</Table.Td>
                              <Table.Td>{sales.division}</Table.Td>
                              <Table.Td>{sales.area}</Table.Td>
                              <Table.Td>
                                <Tooltip label="Unassign This Sales">
                                  <ActionIcon
                                    onClick={() => handleUnassignSales(sales.id)}
                                    variant="transparent"
                                  >
                                    <IconUserX color="red" size={20} stroke={1.5} />
                                  </ActionIcon>
                                </Tooltip>
                              </Table.Td>
                            </Table.Tr>
                          ))}
                        </Table.Tbody>
                      </Table>
                    </Table.ScrollContainer>
                  </Tabs.Panel>
                  {userProfile?.user_type == 'Manager' && (
                    <Tabs.Panel value="logs">
                      <Box>
                        <Table.ScrollContainer minWidth={200} mt={20}>
                          <Table>
                            <Table.Thead>
                              <Table.Tr>
                                <Table.Th>User</Table.Th>
                                <Table.Th>Action Type</Table.Th>
                                <Table.Th>Action Time</Table.Th>
                                <Table.Th>Action</Table.Th>
                              </Table.Tr>
                            </Table.Thead>
                            {customerDetail.results.log_note.length <= 0 ? (
                              <Table.Tbody>
                                <Table.Tr>
                                  <Table.Td
                                    colSpan={12}
                                    style={{ textAlign: 'center', verticalAlign: 'middle' }}
                                  >
                                    <Text>No log yet </Text>
                                  </Table.Td>
                                </Table.Tr>
                              </Table.Tbody>
                            ) : (
                              <Table.Tbody>
                                {customerDetail.results.log_note.map((log, index) => (
                                  <Table.Tr key={index}>
                                    <Table.Td>{log.user}</Table.Td>
                                    <Table.Td>{log.action_type}</Table.Td>
                                    <Table.Td>{formatDate(log.action_time)}</Table.Td>
                                    <Table.Td>
                                      <ActionIcon
                                        onClick={() => openDetailLogModal(log)}
                                        variant="transparent"
                                      >
                                        <IconEye size={20} stroke={1.5} />
                                      </ActionIcon>
                                    </Table.Td>
                                  </Table.Tr>
                                ))}
                              </Table.Tbody>
                            )}
                          </Table>
                        </Table.ScrollContainer>
                      </Box>
                    </Tabs.Panel>
                  )}
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
                      <Tabs.Panel value="list">{visitList && <VisitTable />}</Tabs.Panel>
                      <Tabs.Panel value="maps">
                        <iframe
                          id="map"
                          width={width}
                          height="600"
                          loading="lazy"
                          src="https://www.google.com/maps?q=37.7749,-122.4194&hl=en&z=22&output=embed"
                        ></iframe>
                      </Tabs.Panel>
                    </Tabs>
                  </Tabs.Panel>
                </Tabs>
              </Box>
            </Box>
          )}
        </Card>
        <Modal
          opened={showAssignSalesModal}
          onClose={() => setShowAssignSalesModal(false)}
          title="Pick sales to assign to this customer"
        >
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
        <LogModal />
        <CustomerApproveModal />
      </AppShell.Main>
    </DashboardLayout>
  );
}
