"use client"
import React from 'react';
import DashboardLayout from './layout';
import { ActionIcon, AppShell, AppShellMain, Avatar, Badge, Box, Card, Flex, Grid, Group, ScrollArea, Select, Stack, Table, Text, TextInput, Title, useMantineTheme } from '@mantine/core';
import { BarChart, DonutChart } from '@mantine/charts';
import { IconChartColumn, IconChevronRight, IconSearch } from '@tabler/icons-react';

export default function Dashboard() {
  const theme = useMantineTheme();
  const select = ['Today', 'This Week', 'This Month', 'This Year'];
  const data = [
    { name: 'In Office', value: 400, color: 'indigo.6' },
    { name: 'Half Day', value: 300, color: 'yellow.6' },
    { name: 'Work From Home', value: 100, color: 'teal.6' },
    { name: 'On Leave', value: 200, color: 'gray.6' },
  ];

  const teamData = [
    {
      name: 'JohnDoe', thisWeek: 32, lastWeek: 40
    },
    {
      name: 'Ricky', thisWeek: 32, lastWeek: 40
    },
    {
      name: 'Steve', thisWeek: 32, lastWeek: 40
    },
    {
      name: 'Jane', thisWeek: 32, lastWeek: 40
    },
    {
      name: 'Cole', thisWeek: 32, lastWeek: 40
    },
    {
      name: 'Freeman', thisWeek: 32, lastWeek: 40
    },
  ];

  const elements = [
    {
      name: 'JohnDoe', date: 'Monday, 5 Dec 2024', role: 'Sales', time: '07:58', customer_name: 'Jokowi', status: 'Done', location: 'Rs. Tajuddin Khalid', image: null, product: 'tooth brush', quantity: 2
    },
    {
      name: 'Ricky', date: 'Monday, 5 Dec 2024', role: 'Sales', time: '07:58', customer_name: 'Jokowi', status: 'Done', location: 'Rs. Tajuddin Khalid', image: null, product: 'tooth brush', quantity: 2
    },
    {
      name: 'Steve', date: 'Monday, 5 Dec 2024', role: 'Sales', time: '07:58', customer_name: 'Jokowi', status: 'Done', location: 'Rs. Tajuddin Khalid', image: null, product: 'tooth brush', quantity: 2
    },
    {
      name: 'Jane', date: 'Monday, 5 Dec 2024', role: 'Sales', time: '07:58', customer_name: 'Jokowi', status: 'Done', location: 'Rs. Tajuddin Khalid', image: null, product: 'tooth brush', quantity: 2
    },
    {
      name: 'Cole', date: 'Monday, 5 Dec 2024', role: 'Sales', time: '07:58', customer_name: 'Jokowi', status: 'Done', location: 'Rs. Tajuddin Khalid', image: null, product: 'tooth brush', quantity: 2
    },
    {
      name: 'Freeman', date: 'Monday, 5 Dec 2024', role: 'Sales', time: '07:58', customer_name: 'Jokowi', status: 'Done', location: 'Rs. Tajuddin Khalid', image: null, product: 'tooth brush', quantity: 2
    },
  ]
  const rows = elements.map((element) => (
    <Table.Tr key={element.name}>
      <Table.Td>{element.name}</Table.Td>
      <Table.Td>{element.date}</Table.Td>
      <Table.Td>{element.time}</Table.Td>
      <Table.Td>{element.customer_name}</Table.Td>
      <Table.Td>{element.status}</Table.Td>
      <Table.Td>{element.location}</Table.Td>
      <Table.Td>{element.image}</Table.Td>
      <Table.Td>{element.product}</Table.Td>
      <Table.Td>{element.quantity}</Table.Td>
    </Table.Tr>
  ));

  const total = data.reduce((sum, item) => sum + item.value, 0);
  return (
    <DashboardLayout>
      <AppShell.Main bg={'#F6F6F6'}>
        <div className="header-page">
          <Flex justify={'space-between'}>
            <Box>
              <Title order={2}>Good Afternoon, User!</Title>
              <Text size='sm' mt={10} style={{ color: theme.colors['secondary-gray'][9] }}>You have 2 leave request pending</Text>
            </Box>
            <Box>
              <Text ta={'right'} size='sm' mt={10} style={{ color: theme.colors['secondary-gray'][9] }}>Current time</Text>
              <Title order={2}>12:10 PM</Title>
            </Box>
          </Flex>
        </div>
        <Box mt={20} className="content">
          <Grid>
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
          </Grid>
          <Grid>
            <Grid.Col span={{ base: 12, lg: 8 }}>
              <Card withBorder radius={"md"} px={20} py={30} h={400}>
                <Group justify='space-between'>
                  <Box>
                    <Title order={3}>Visits</Title>
                    <Text ta={'right'} size='sm' mt={10} style={{ color: theme.colors['secondary-gray'][9] }}>From 4-10 Sep, 2023</Text>
                  </Box>
                  <Box>
                    <Select
                      data={select}
                    />
                  </Box>
                </Group>
                <Table.ScrollContainer minWidth={200}>
                  <Table>
                    <Table.Thead>
                      <Table.Tr>
                        <Table.Th>Name</Table.Th>
                        <Table.Th>Date</Table.Th>
                        <Table.Th>Time</Table.Th>
                        <Table.Th>Customer name</Table.Th>
                        <Table.Th>Status</Table.Th>
                        <Table.Th>Location</Table.Th>
                        <Table.Th>Image</Table.Th>
                        <Table.Th>Product</Table.Th>
                        <Table.Th>Quantity</Table.Th>
                      </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>{rows}</Table.Tbody>
                  </Table>
                </Table.ScrollContainer>
              </Card>
            </Grid.Col>
            <Grid.Col span={{ base: 12, lg: 4 }}>
              <Card withBorder radius={"md"} px={20} py={30} h={400}>
                <Group justify='space-between'>
                  <Box>
                    <Title order={3}>Book 1 on 1</Title>
                  </Box>
                  <Box>
                    <IconChartColumn size={20} stroke={1.5} color={"#D15346"}/>
                  </Box>
                </Group>
                <TextInput label="Collegues" placeholder='Find People' mt={20} leftSection={<IconSearch stroke={1.5} size={20} />} />
                <ScrollArea>
                  <Stack gap={10} py={10}>
                    {elements.map((person,index) => (
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
            </Grid.Col>
          </Grid>
        </Box>
      </AppShell.Main>
    </DashboardLayout>
  );
}
