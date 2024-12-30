'use client'
import { AppShell, AppShellMain, Burger, Container, Drawer, Flex, Group, Image, NavLink, ScrollArea, Skeleton, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconCalendarCheck, IconCar, IconHome, IconHome2, IconMessage, IconUserDollar, IconUserStar, IconUsersGroup } from "@tabler/icons-react";
import React, { useEffect } from "react";

export default function DashboardLayout({ children }: { children?: React.ReactNode }) {
    const [opened, { toggle }] = useDisclosure();
    const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
    
    return (
        <AppShell
            header={{ height: 60 }}
            navbar={{ width: 200, breakpoint: 'md', collapsed: { mobile: !opened } }}
            padding="lg"
        >
            <AppShell.Header>
                <Group h="100%" px="md">
                    <Burger opened={drawerOpened} onClick={toggleDrawer} hiddenFrom="md" />
                    <Image src={'/logo.png'} w={150} />
                </Group>
            </AppShell.Header>
            <AppShell.Navbar p="md">
                <NavLink href="/dashboard" label={"Dashboard"} leftSection={<IconHome2 size={20} stroke={1.5} />} color="primary-red" active variant="filled" />
                <NavLink href="#" label={"Visit"} leftSection={<IconCar size={20} stroke={1.5} />} />
                <NavLink href="/dashboard/leave" label={"Leave"} leftSection={<IconCalendarCheck size={20} stroke={1.5} />} />
                <NavLink href="/dashboard/sales" label={"Sales"} leftSection={<IconUserStar size={20} stroke={1.5} />} />
                <NavLink href="/dashboard/customer" label={"Customers"} leftSection={<IconUserDollar size={20} stroke={1.5} />} />
            </AppShell.Navbar>
            {children}
            <Drawer
                opened={drawerOpened}
                onClose={closeDrawer}
                size={'100%'}
                padding={'md'}
                hiddenFrom="md"
                zIndex={1000000}
                title={<Image src={'/logo.png'} w={150} />}
            >
                <ScrollArea h={`calc(100vh - 80)`} mx={'-md'}>
                    <NavLink href="/dashboard" label={"Dashboard"} leftSection={<IconHome2 size={20} stroke={1.5} />} color="primary-red" active variant="filled" />
                    <NavLink href="#" label={"Visit"} leftSection={<IconCar size={20} stroke={1.5} />} />
                    <NavLink href="#" label={"Leave"} leftSection={<IconCalendarCheck size={20} stroke={1.5} />} />
                    <NavLink href="/dashboard/sales" label={"Sales"} leftSection={<IconUserStar size={20} stroke={1.5} />} />
                    <NavLink href="/dashboard/customer" label={"Customers"} leftSection={<IconUserDollar size={20} stroke={1.5} />} />
                </ScrollArea>
            </Drawer>
        </AppShell>

    );
}