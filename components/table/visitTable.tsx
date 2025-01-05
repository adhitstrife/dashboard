import customerListResponse from "@/app/interface/response/customer/customerListResponse"
import visitData from "@/app/interface/response/visit/visitData"
import visitListResponse from "@/app/interface/response/visit/visitListResponse"
import { visitDetailAtom } from "@/state/data/visit/visitDetailAtom"
import { visitListAtom } from "@/state/data/visit/visitListAtom"
import { ActionIcon, Box, Table, Text } from "@mantine/core"
import { IconEye } from "@tabler/icons-react"
import { useAtomValue, useSetAtom } from "jotai"
import Link from "next/link"
import { FC } from "react"

export const VisitTable = () => {
    const visitList = useAtomValue(visitListAtom)

    const setVisitDetail = useSetAtom(visitDetailAtom);

    const openDetailVisitModal = (visit: visitData) => {
        setVisitDetail(visit)
    }
    return (
        <Box>
            {visitList && (
                <Table.ScrollContainer minWidth={200} mt={20}>
                    <Table>
                        <Table.Thead>
                            <Table.Tr>
                                <Table.Th>Name</Table.Th>
                                <Table.Th>Sales</Table.Th>
                                <Table.Th>Category</Table.Th>
                                <Table.Th>Visit Date</Table.Th>
                                <Table.Th>Notes</Table.Th>
                                <Table.Th>Action</Table.Th>
                            </Table.Tr>
                        </Table.Thead>
                        {visitList.results.length <= 0 ? (
                            <Table.Tbody>
                                <Table.Tr>
                                    <Table.Td colSpan={12} style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                        <Text>No visit yet </Text>
                                    </Table.Td>
                                </Table.Tr>
                            </Table.Tbody>
                        ) : (
                            <Table.Tbody>
                                {visitList.results.map((visit, index) => (
                                    <Table.Tr key={index}>
                                        <Table.Td>{visit.customer.name}</Table.Td>
                                        <Table.Td>{visit.sales.name}</Table.Td>
                                        <Table.Td>{visit.category}</Table.Td>
                                        <Table.Td>{visit.visit_date}</Table.Td>
                                        <Table.Td>{visit.notes}</Table.Td>
                                        <Table.Td>
                                            <ActionIcon component={Link} href={`/dashboard/visit/${visit.id}`}  variant="transparent">
                                                <IconEye size={20} stroke={1.5} />
                                            </ActionIcon>
                                        </Table.Td>
                                    </Table.Tr>

                                ))}
                            </Table.Tbody>
                        )}
                    </Table>
                </Table.ScrollContainer>
            )}
        </Box>
    )
}