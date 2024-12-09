'use client'
import { AppShell, AppShellMain, Burger, Container, Drawer, Flex, Group, Image, NavLink, ScrollArea, Skeleton, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconCalendarCheck, IconCar, IconHome, IconHome2, IconMessage, IconUsersGroup } from "@tabler/icons-react";
import React from "react";

export default function DashboardLayout({ children }: { children?: React.ReactNode }) {
    const [opened, { toggle }] = useDisclosure();
    const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
    return (
        <AppShell
            header={{ height: 60 }}
            navbar={{ width: 200, breakpoint: 'sm', collapsed: { mobile: !opened } }}
            padding="lg"
        >
            <AppShell.Header>
                <Group h="100%" px="md">
                    <Burger opened={drawerOpened} onClick={toggleDrawer} hiddenFrom="md" />
                    <Image src={'/logo.png'} w={150} />
                </Group>
            </AppShell.Header>
            <AppShell.Navbar p="md">
                <NavLink href="#" label={"Dashboard"} leftSection={<IconHome2 size={20} stroke={1.5} />} color="primary-red" active variant="filled" />
                <NavLink href="#" label={"User"} leftSection={<IconUsersGroup size={20} stroke={1.5} />} />
                <NavLink href="#" label={"Visit"} leftSection={<IconCar size={20} stroke={1.5} />} />
                <NavLink href="#" label={"Leave"} leftSection={<IconCalendarCheck size={20} stroke={1.5} />} />
                <NavLink href="#" label={"Message"} leftSection={<IconMessage size={20} stroke={1.5} />} />
            </AppShell.Navbar>
            {children}
        </AppShell>

    );
}