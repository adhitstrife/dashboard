'use client'
import useUserProfile from "@/hooks/auth/useUserProfile";
import { activeMenuAtom } from "@/state/component_state/menu/activeMenuAtom";
import { AppShell, AppShellMain, Burger, Button, Container, Drawer, Flex, Group, Image, NavLink, ScrollArea, Skeleton, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { IconCalendarCheck, IconCar, IconCheck, IconClockCheck, IconHome, IconHome2, IconLogout, IconLogs, IconMessage, IconUser, IconUserDollar, IconUserStar, IconUsersGroup } from "@tabler/icons-react";
import { useAtomValue } from "jotai";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function DashboardLayout({ children }: { children?: React.ReactNode }) {
    const [opened, { toggle }] = useDisclosure();
    const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
    const activeMenu = useAtomValue(activeMenuAtom);
    const router = useRouter();
    const { getUserProfile, userProfile, isLoading } = useUserProfile()
    useEffect(() => {
        getUserProfile()
    }, [])

    const handleLogOut = () => {
        Cookies.remove('authToken');
        router.push("/")

        notifications.show({
            title: 'Logout Success',
            message: 'Good Bye',
            color: 'primary-red',
            icon: <IconCheck size={20} stroke={1.5} />,
            position: 'top-right'
        })
    }

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
                <AppShell.Section></AppShell.Section>
                <AppShell.Section grow>
                    <NavLink href="/dashboard" label={"Dashboard"} leftSection={<IconHome2 size={20} stroke={1.5} />} color="primary-red" active={activeMenu == "dashboard" ? true : false} variant="filled" />
                    <NavLink href="/dashboard/visit" label={"Visit"} leftSection={<IconCar size={20} stroke={1.5} />} color="primary-red" active={activeMenu == "visit" ? true : false} variant="filled" />
                    <NavLink href="/dashboard/leave" label={"Leave"} leftSection={<IconCalendarCheck size={20} stroke={1.5} />} color="primary-red" active={activeMenu == "leave" ? true : false} variant="filled" />
                    <NavLink childrenOffset={28} href="#required-for-focus" label={"User Management"} leftSection={<IconUsersGroup size={20} stroke={1.5} />} >
                        {userProfile?.user_type == 'Manager' && (
                            <NavLink href="/dashboard/admin" label={"Admin"} color="primary-red" active={activeMenu == "admin" ? true : false} variant="filled" leftSection={<IconUserStar size={20} stroke={1.5} />} />
                        )}
                        <NavLink href="/dashboard/sales" label={"Sales"} color="primary-red" active={activeMenu == "sales" ? true : false} variant="filled" leftSection={<IconUser size={20} stroke={1.5} />} />
                    </NavLink>
                    <NavLink href="/dashboard/attendance" label={"Attendance"} leftSection={<IconClockCheck size={20} stroke={1.5} />} color="primary-red" active={activeMenu == "attendance" ? true : false} variant="filled" />
                    <NavLink href="/dashboard/customer" label={"Customers"} leftSection={<IconUserDollar size={20} stroke={1.5} />} color="primary-red" active={activeMenu == "customer" ? true : false} variant="filled" />
                    {userProfile?.user_type == 'Manager' && (
                        <NavLink href="/dashboard/activity-logs" label={"Logs"} leftSection={<IconLogs size={20} stroke={1.5} />} color="primary-red" active={activeMenu == "logs" ? true : false} variant="filled" />
                    )}
                </AppShell.Section>
                <AppShell.Section>
                    <Button onClick={handleLogOut} variant="transparent" color="primary-red" rightSection={<IconLogout size={20} stroke={1.5} />} mt={50}>Log Out</Button>
                </AppShell.Section>
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
                    <NavLink href="/dashboard/visit" label={"Visit"} leftSection={<IconCar size={20} stroke={1.5} />} />
                    <NavLink href="/dashboard/leave" label={"Leave"} leftSection={<IconCalendarCheck size={20} stroke={1.5} />} />
                    <NavLink childrenOffset={28} href="#required-for-focus" label={"User Management"} leftSection={<IconUsersGroup size={20} stroke={1.5} />} >
                        {userProfile?.user_type == 'Manager' && (
                            <NavLink href="/dashboard/admin" label={"Admin"} color="primary-red" variant="filled" leftSection={<IconUserStar size={20} stroke={1.5} />} />
                        )}
                        <NavLink href="/dashboard/sales" label={"Sales"} color="primary-red" variant="filled" leftSection={<IconUser size={20} stroke={1.5} />} />
                    </NavLink>
                    <NavLink href="/dashboard/attendance" label={"Attendance"} leftSection={<IconClockCheck size={20} stroke={1.5} />} />
                    <NavLink href="/dashboard/customer" label={"Customers"} leftSection={<IconUserDollar size={20} stroke={1.5} />} />
                    {userProfile?.user_type == 'Manager' && (
                        <NavLink href="/dashboard/activity-logs" label={"Logs"} leftSection={<IconLogs size={20} stroke={1.5} />} />
                    )}
                    <Button onClick={handleLogOut} variant="transparent" color="primary-red" rightSection={<IconLogout size={20} stroke={1.5} />} mt={50}>Log Out</Button>
                </ScrollArea>
            </Drawer>
        </AppShell>

    );
}