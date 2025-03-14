'use client';

import { use, useEffect, useState } from 'react';
import {
  IconCalendarCheck,
  IconClockCheck,
  IconEdit,
  IconFileDollar,
  IconImageInPicture,
  IconLocationCheck,
  IconUser,
  IconUserDollar,
} from '@tabler/icons-react';
import { useAtomValue, useSetAtom } from 'jotai';
import {
  ActionIcon,
  AppShell,
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
  Table,
  Tabs,
  Text,
  Title,
  useMantineTheme,
} from '@mantine/core';
import { YearPickerInput } from '@mantine/dates';
import { useViewportSize } from '@mantine/hooks';
import targetAddPayload from '@/app/interface/payload/targetAddPayload';
import TimeDisplay from '@/components/clock/clock';
import { AttendanceTable } from '@/components/table/attendanceTable';
import { LeaveTable } from '@/components/table/leaveTable';
import { VisitTable } from '@/components/table/visitTable';
import useGetListAttendance from '@/hooks/attendance/useGetListAttendance';
import useUserProfile from '@/hooks/auth/useUserProfile';
import useGetListCustomer from '@/hooks/customer/useGetListCustomer';
import useGetListLeave from '@/hooks/leave/useGetListLeave';
import useGetListSales from '@/hooks/sales/useGetListSales';
import useAddTarget from '@/hooks/target/useAddTarget';
import useUpdateTarget from '@/hooks/target/useUpdateTarget';
import useGetListVisit from '@/hooks/visit/useGetListVisit';
import useGetSalesDetail from '@/hooks/visit/useGetVisitDetail';
import useGetVisitDetail from '@/hooks/visit/useGetVisitDetail';
import { activeMenuAtom } from '@/state/component_state/menu/activeMenuAtom';
import { customerListAtom } from '@/state/data/customer/customerListAtom';
import { leaveListAtom } from '@/state/data/leave/leaveListAtom';
import { visitDetailAtom } from '@/state/data/visit/visitDetailAtom';
import { visitListAtom } from '@/state/data/visit/visitListAtom';
import { DataLabel } from '../../../../components/label/dataLabel';
import { CustomerTable } from '../../../../components/table/customerTable';
import DashboardLayout from '../../layout';

interface SalesDetailProps {
  params: { id: string }; // id is usually passed as a string in params
}

export default function salesDetail({ params }: { params: Promise<{ id: number }> }) {
  const { id } = use(params);
  const theme = useMantineTheme();
  const { height, width } = useViewportSize();
  const { getUserProfile, userProfile, isLoading } = useUserProfile();
  const { getDetailVisit, isLoadingGetDetailVisit } = useGetVisitDetail();

  const visitData = useAtomValue(visitDetailAtom);
  const setActiveMenu = useSetAtom(activeMenuAtom);

  const currentYear = new Date().getFullYear();

  useEffect(() => {
    getUserProfile();
    getDetailVisit(id);
    setActiveMenu('visit');
  }, [id]);

  const calculateDuration = (start: string, end: string) => {
    const startDate = new Date(start).getTime(); // Convert to timestamp (milliseconds)
    const endDate = new Date(end).getTime();

    if (isNaN(startDate) || isNaN(endDate)) {
      throw new Error('Invalid date format');
    }

    const diffInSeconds = Math.floor((endDate - startDate) / 1000); // Convert to seconds
    const hours = Math.floor(diffInSeconds / 3600);
    const minutes = Math.floor((diffInSeconds % 3600) / 60);

    if (hours > 0) {
      return `${hours} hours ${minutes} minutes`;
    }
    return `${minutes} minutes`;
  };

  return (
    <DashboardLayout>
      <AppShell.Main bg={'#F6F6F6'}>
        <div className="header-page">
          <Flex justify={'space-between'}>
            <Box>
              <Title order={2}>Visit Detail</Title>
              <Text size="sm" mt={10} style={{ color: theme.colors['secondary-gray'][9] }}>
                Here is the detail information of visit
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
          {visitData && (
            <Box mt={40}>
              <Tabs color="primary-red" variant="outline" defaultValue="detail">
                <Tabs.List>
                  <Tabs.Tab value="detail" leftSection={<IconUser size={20} stroke={1.5} />}>
                    Detail
                  </Tabs.Tab>
                  <Tabs.Tab
                    value="location"
                    leftSection={<IconLocationCheck size={20} stroke={1.5} />}
                  >
                    Location
                  </Tabs.Tab>
                  <Tabs.Tab
                    value="image"
                    leftSection={<IconImageInPicture size={20} stroke={1.5} />}
                  >
                    Image
                  </Tabs.Tab>
                </Tabs.List>

                <Tabs.Panel value="detail">
                  <Grid mt={40}>
                    <Grid.Col span={6}>
                      <DataLabel label="Customer Name" value={visitData.customer.name} />
                    </Grid.Col>
                    <Grid.Col span={6}>
                      <DataLabel label="Sales Name" value={visitData.sales.name} />
                    </Grid.Col>
                    <Grid.Col span={6}>
                      <DataLabel label="Category" value={visitData.category} />
                    </Grid.Col>
                    <Grid.Col span={6}>
                      <DataLabel label="Participant" value={visitData.participant} />
                    </Grid.Col>
                    <Grid.Col span={6}>
                      <DataLabel label="Visit Date" value={visitData.visit_date} />
                    </Grid.Col>
                    <Grid.Col span={6}>
                      <DataLabel
                        label="Visit Duration"
                        value={
                          visitData.visit_end
                            ? calculateDuration(visitData.visit_date, visitData.visit_end)
                            : '0 Hour'
                        }
                      />
                    </Grid.Col>
                    <Grid.Col span={6}>
                      <DataLabel label="Notes" value={visitData.notes} />
                    </Grid.Col>
                    <Grid.Col span={12}>
                      <DataLabel label="Products" value="" />
                      <Table.ScrollContainer minWidth={200} mt={20}>
                        <Table>
                          <Table.Thead>
                            <Table.Tr>
                              <Table.Th>Name</Table.Th>
                              <Table.Th>Quantity</Table.Th>
                            </Table.Tr>
                          </Table.Thead>
                          {visitData.products && visitData.products.length > 0 ? (
                            <Table.Tbody>
                              {visitData.products.map((product, index) => (
                                <Table.Tr>
                                  <Table.Td>{product.name}</Table.Td>
                                  <Table.Td>{product.quantity}</Table.Td>
                                </Table.Tr>
                              ))}
                            </Table.Tbody>
                          ) : (
                            <Table.Tbody>
                              <Table.Tr>No Products</Table.Tr>
                            </Table.Tbody>
                          )}
                        </Table>
                      </Table.ScrollContainer>
                    </Grid.Col>
                  </Grid>
                </Tabs.Panel>
                <Tabs.Panel value="location">
                  <Box mt={20}>
                    <iframe
                      id="map"
                      width={width}
                      height="450"
                      loading="lazy"
                      src={`https://www.google.com/maps?q=${visitData.latitude},${visitData.longitude}&hl=en&z=22&output=embed`}
                    ></iframe>
                  </Box>
                </Tabs.Panel>
                <Tabs.Panel value="image">
                  <Image mt={20} src={`${visitData.image_path}`} w="auto" fit="contain" />
                  {visitData.image_paths && visitData.image_paths.length > 0 ? (
                    <Box>
                      {visitData.image_paths.map((image, index) => (
                        <Image mt={20} src={`${image}`} w="auto" key={index} fit="contain" />
                      ))}
                    </Box>
                  ) : (
                    ''
                  )}
                </Tabs.Panel>
              </Tabs>
            </Box>
          )}
        </Card>
      </AppShell.Main>
    </DashboardLayout>
  );
}
