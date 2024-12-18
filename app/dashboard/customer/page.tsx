"use client"
import { ActionIcon, AppShell, Box, Button, Card, Dialog, Flex, Group, Image, Modal, NumberInput, Table, Text, TextInput, Title, useMantineTheme } from "@mantine/core";
import DashboardLayout from "../layout";
import { IconPencil, IconPlus, IconTrash } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useDisclosure, useViewportSize } from "@mantine/hooks";

export default function user() {
    const theme = useMantineTheme();
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [opened, { toggle, close }] = useDisclosure(false);
    const { height, width } = useViewportSize();

    const elements = [
        {
            username: 'JohnDoe', firstName: 'John', lastName: 'Doe', email: 'john.mckinley@examplepetstore.com', phone: '+6287712345678', address: 'jl. kaki'
        },
    ]
    const rows = elements.map((element) => (
        <Table.Tr key={element.username}>
            <Table.Td>{element.username}</Table.Td>
            <Table.Td>{element.email}</Table.Td>
            <Table.Td>{element.phone}</Table.Td>
            <Table.Td>
                <Button variant="filled" color="primary-red" size="xs">Assign</Button>
            </Table.Td>
            <Table.Td>
                <Button variant="transparent" color="primary-red" size="xs">Show Letter</Button>
            </Table.Td>
            <Table.Td>{element.address}</Table.Td>
            <Table.Td>
                <Group>
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
                            <Title order={2}>Customers</Title>
                            <Text size='sm' mt={10} style={{ color: theme.colors['secondary-gray'][9] }}>Here is the list of customers</Text>
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
                            <TextInput placeholder="Search Customers" />
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
                                    <Table.Th>Contact Person</Table.Th>
                                    <Table.Th>Phone</Table.Th>
                                    <Table.Th>Sales</Table.Th>
                                    <Table.Th>Permission Letter</Table.Th>
                                    <Table.Th>Address</Table.Th>
                                    <Table.Th>Actions</Table.Th>
                                </Table.Tr>
                            </Table.Thead>
                            <Table.Tbody>{rows}</Table.Tbody>
                        </Table>
                    </Table.ScrollContainer>
                </Card>
                <Modal opened={showAddModal} onClose={() => setShowAddModal(false)} title="Add new sales">
                    <form>
                        <TextInput
                            label="Username"
                            placeholder="Input Username"
                            mt={10}
                        />
                        <TextInput
                            label="Firstname"
                            placeholder="Input Firstname"
                            mt={10}
                        />
                        <TextInput
                            label="Lastname"
                            placeholder="Input Lastname"
                            mt={10}
                        />
                        <NumberInput
                            label="Phonenumber"
                            placeholder="Input Phone Number"
                            mt={10}
                            hideControls
                        />
                        <TextInput
                            label="Address"
                            placeholder="Input Address"
                            mt={10}
                        />
                        <Button variant="filled" color="primary-red" mt={20} fullWidth>
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
                        />
                        <TextInput
                            label="Firstname"
                            placeholder="Input Firstname"
                            mt={10}
                        />
                        <TextInput
                            label="Lastname"
                            placeholder="Input Lastname"
                            mt={10}
                        />
                        <NumberInput
                            label="Phonenumber"
                            placeholder="Input Phone Number"
                            mt={10}
                            hideControls
                        />
                        <TextInput
                            label="Address"
                            placeholder="Input Address"
                            mt={10}
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