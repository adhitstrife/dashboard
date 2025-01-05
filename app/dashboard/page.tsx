"use client"
import React, { useEffect, useState } from 'react';
import DashboardLayout from './layout';
import { ActionIcon, AppShell, AppShellMain, Avatar, Badge, Box, Card, Flex, Grid, Group, Pagination, ScrollArea, Select, Skeleton, Stack, Switch, Table, Text, TextInput, Title, useMantineTheme } from '@mantine/core';
import { BarChart, DonutChart } from '@mantine/charts';
import { IconCalendarClock, IconChartColumn, IconChevronRight, IconFilter, IconFilterBolt, IconFilterSearch, IconSearch } from '@tabler/icons-react';
import useUserProfile from '@/hooks/auth/useUserProfile';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { visitListAtom } from '@/state/data/visit/visitListAtom';
import useGetListVisit from '@/hooks/visit/useGetListVisit';
import { VisitTable } from '@/components/table/visitTable';
import { Map } from '@/components/map/map';
import { VisitFilterModal } from '@/components/modal/visit/visitFilterModal';
import { visitFilterModalAtom } from '@/state/component_state/modal/visit/visitFilterModalAtom';
import { showMapAtom } from '@/state/component_state/switch/map/showMapAtom';
import TimeDisplay from '@/components/clock/clock';

export default function Dashboard() {
  const theme = useMantineTheme();
  const select = ['Today', 'This Week', 'This Month', 'This Year'];
  const data = [
    { name: 'In Office', value: 400, color: 'indigo.6' },
    { name: 'Half Day', value: 300, color: 'yellow.6' },
    { name: 'Work From Home', value: 100, color: 'teal.6' },
    { name: 'On Leave', value: 200, color: 'gray.6' },
  ];
  const { getUserProfile, userProfile, isLoading } = useUserProfile()

  const visitList = useAtomValue(visitListAtom)
  const setVisitFilterModal = useSetAtom(visitFilterModalAtom)
  const [showMap, setShowMap] = useAtom(showMapAtom);

  const { getListVisit, isLoadingGetListVisit } = useGetListVisit();
  const [page, setPage] = useState(1);

  const handleChangePage = async (e: any) => {
    await getListVisit(e, 10);
  }

  useEffect(() => {
    getUserProfile()
    getListVisit(1, 10)
    console.log('Google Maps API Key:', process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY);
  }, [])

  const total = data.reduce((sum, item) => sum + item.value, 0);
  return (
    <DashboardLayout>
      <AppShell.Main bg={'#F6F6F6'}>
        <div className="header-page">
          <Flex direction={{ base: 'column-reverse', md: 'row' }} justify={{ base: 'flex-start', md: 'space-between' }}>
            <Box mt={{ base: 20, md: 0 }}>
              {userProfile ? (
                <Title order={2}>Good Afternoon, {userProfile.username}!</Title>
              ) : (
                <Skeleton height={8} radius="xl" />
              )}
              <Text size='sm' mt={10} style={{ color: theme.colors['secondary-gray'][9] }}>You have 2 leave request pending</Text>
            </Box>
            <Box>
              <Text ta={{ base: 'left', md: 'right' }} size='sm' mt={10} >Current time</Text>
              <TimeDisplay />
            </Box>
          </Flex>
        </div>
        <Box mt={20} className="content">
          <Grid>
            <Grid.Col span={{ base: 12, lg: 4 }}>
              <Card>
                <Group justify='space-between'>
                  <Text size='sm' c='primary-red' fw={900}>Today Visits</Text>
                  <IconCalendarClock size={20} stroke={1.5} />
                </Group>
                <Box>
                  <Title>30</Title>
                </Box>
              </Card>
            </Grid.Col>
            <Grid.Col span={{ base: 12, lg: 4 }}>
              <Card>
                <Group justify='space-between'>
                  <Text size='sm' c='primary-red' fw={900}>This Week Visits</Text>
                  <IconCalendarClock size={20} stroke={1.5} />
                </Group>
                <Box>
                  <Title>30</Title>
                </Box>
              </Card>
            </Grid.Col>
            <Grid.Col span={{ base: 12, lg: 4 }}>
              <Card>
                <Group justify='space-between'>
                  <Text size='sm' c='primary-red' fw={900}>This Month Visits</Text>
                  <IconCalendarClock size={20} stroke={1.5} />
                </Group>
                <Box>
                  <Title>30</Title>
                </Box>
              </Card>
            </Grid.Col>
          </Grid>
          {/* <Grid>
            <Grid.Col span={{ base: 12, lg: 6 }}>
              <Card withBorder radius={"md"} px={20} py={30}>
                <Group justify='space-between'>
                  <Box>
                    <Title order={3}>My Teams</Title>
                    <Text ta={'right'} size='sm' mt={10} style={{ color: theme.colors['secondary-gray'][9] }}>From 4-10 Sep, 2023</Text>
                  </Box>
                  <Box>
                    <Select
                      data={select}
                    />
                  </Box>
                </Group>
                <Group mt={40} justify='space-between'>
                  <DonutChart data={data} size={150} thickness={30} />
                  <Grid>
                    {data.map((data, index) => (
                      <Grid.Col span={6} key={index}>
                        <Badge color={data.color}>
                          {data.name}
                        </Badge>
                        <Text fz={20} fw={700}>{((data.value / total) * 100).toFixed()} %</Text>
                      </Grid.Col>
                    ))}

                  </Grid>
                </Group>
              </Card>
            </Grid.Col>
            <Grid.Col span={{ base: 12, lg: 6 }}>
              <Card withBorder radius={"md"} px={20} py={30}>
                <Group justify='space-between'>
                  <Box>
                    <Title order={3}>Timings</Title>
                    <Text ta={'right'} size='sm' mt={10} style={{ color: theme.colors['secondary-gray'][9] }}>From 4-10 Sep, 2023</Text>
                  </Box>
                  <Box>
                    <Select
                      data={select}
                    />
                  </Box>
                </Group>
                <Group mt={40} justify='space-between'>
                  <BarChart data={teamData} h={150} dataKey="name" series={[
                    { name: 'thisWeek', color: 'violet.6' },
                    { name: 'lastWeek', color: 'blue.6' }
                  ]} tickLine="none"
                    gridAxis="none"
                    withYAxis={false} barProps={{
                      width: 10
                    }} withLegend />
                </Group>
              </Card>
            </Grid.Col>
          </Grid> */}
          <Grid mt={20}>
            <Grid.Col span={{ base: 12, lg: 12 }}>
              <Card withBorder radius={"md"} px={20} py={30}>
                <Group justify='space-between'>
                  <Box>
                    <Title order={3}>Visits</Title>
                  </Box>
                </Group>
                {visitList && (
                  <Box mt={20}>
                    <VisitFilterModal />
                    <VisitTable />
                    <Pagination my={20} value={page} onChange={(e) => handleChangePage(e)} total={Math.ceil(visitList.count / 10)} />
                  </Box>
                )}
              </Card>
            </Grid.Col>
            {/* <Grid.Col span={{ base: 12, lg: 4 }}>
              <Card withBorder radius={"md"} px={20} py={30} h={400}>
                <Group justify='space-between'>
                  <Box>
                    <Title order={3}>Book 1 on 1</Title>
                  </Box>
                  <Box>
                    <IconChartColumn size={20} stroke={1.5} color={"#D15346"} />
                  </Box>
                </Group>
                <TextInput label="Collegues" placeholder='Find People' mt={20} leftSection={<IconSearch stroke={1.5} size={20} />} />
                <ScrollArea>
                  <Stack gap={10} py={10}>
                    {elements.map((person, index) => (
                      <Group justify='space-between' key={index}>
                        <Group>
                          <Avatar name={person.name} color='initials' />
                          <Box>
                            <Text size='sm'>{person.name}</Text>
                            <Text c={"secondary-gray"} size='xs'>{person.role}</Text>
                          </Box>
                        </Group>
                        <ActionIcon color='primary-red' variant='filled'>
                          <IconChevronRight stroke={1.5} size={20} />
                        </ActionIcon>
                      </Group>
                    ))}
                  </Stack>
                </ScrollArea>
              </Card>
            </Grid.Col> */}
          </Grid>
        </Box>
      </AppShell.Main>
    </DashboardLayout>
  );
}
