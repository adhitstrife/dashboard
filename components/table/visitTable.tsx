import { FC } from 'react';
import Link from 'next/link';
import { IconEye } from '@tabler/icons-react';
import { useAtomValue, useSetAtom } from 'jotai';
import { ActionIcon, Box, Table, Text } from '@mantine/core';
import customerListResponse from '@/app/interface/response/customer/customerListResponse';
import visitData from '@/app/interface/response/visit/visitData';
import visitListResponse from '@/app/interface/response/visit/visitListResponse';
import { visitDetailAtom } from '@/state/data/visit/visitDetailAtom';
import { visitListAtom } from '@/state/data/visit/visitListAtom';

export const VisitTable = () => {
  const visitList = useAtomValue(visitListAtom);

  const setVisitDetail = useSetAtom(visitDetailAtom);

  const openDetailVisitModal = (visit: visitData) => {
    setVisitDetail(visit);
  };

  const calculateDuration = (start: string, end: string) => {
    const startDate = new Date(start).getTime(); // Convert to timestamp (milliseconds)
    const endDate = new Date(end).getTime();

    if (isNaN(startDate) || isNaN(endDate)) {
      throw new Error('Invalid date format');
    }

    const diffInSeconds = Math.floor((endDate - startDate) / 1000); // Convert to seconds
    const hours = Math.floor(diffInSeconds / 3600);
    const minutes = Math.floor((diffInSeconds % 3600) / 60);

    return `${hours} hours ${minutes} minutes`;
  };
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
                <Table.Th>Visit Duration</Table.Th>
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
                    <Table.Td>{visit.visit_end ? calculateDuration(visit.visit_date, visit.visit_end) : "0 Hour"}</Table.Td>
                    <Table.Td>
                      <ActionIcon
                        component={Link}
                        href={`/dashboard/visit/${visit.id}`}
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
      )}
    </Box>
  );
};
