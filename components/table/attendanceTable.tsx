import { IconDetails, IconEye } from '@tabler/icons-react';
import { useAtomValue, useSetAtom } from 'jotai';
import { ActionIcon, Badge, Box, Button, Table, Text } from '@mantine/core';
import attendanceData from '@/app/interface/response/attendance/attendanceData';
import { attendanceLocalModalAtom } from '@/state/component_state/modal/attendance/attendanceLocalModalAtom';
import { attendanceDetailAtom } from '@/state/data/attendance/attendanceDetailAtom';
import { attendanceListAtom } from '@/state/data/attendance/attendanceListAtom';

export const AttendanceTable = () => {
  const attendanceList = useAtomValue(attendanceListAtom);
  const setAttendanceDetail = useSetAtom(attendanceDetailAtom);
  const setOpenModal = useSetAtom(attendanceLocalModalAtom);

  const openDetailAttendanceModal = (attendance: attendanceData) => {
    setAttendanceDetail(attendance);
    setOpenModal(true);
  };
  return (
    <Box>
      {attendanceList && (
        <Table.ScrollContainer minWidth={200} mt={20}>
          <Table>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Name</Table.Th>
                <Table.Th>Clock In</Table.Th>
                <Table.Th>Status</Table.Th>
                <Table.Th>Clock Out</Table.Th>
                <Table.Th>Details</Table.Th>
              </Table.Tr>
            </Table.Thead>
            {attendanceList.results.length <= 0 ? (
              <Table.Tbody>
                <Table.Tr>
                  <Table.Td colSpan={6} style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                    <Text>No attendance record yet </Text>
                  </Table.Td>
                </Table.Tr>
              </Table.Tbody>
            ) : (
              <Table.Tbody>
                {attendanceList.results.map((attendance, index) => (
                  <Table.Tr>
                    <Table.Td>{attendance.sales.name}</Table.Td>
                    <Table.Td>{`${attendance.clock_in_date} : ${attendance.clock_in_time}`}</Table.Td>
                    <Table.Td>
                      {attendance.is_late ? (
                        <Badge color="primary-red" size="sm">
                          Late Clock In
                        </Badge>
                      ) : (
                        <Badge color="green" size="sm">
                          On Time
                        </Badge>
                      )}
                    </Table.Td>
                    <Table.Td>{`${attendance.clock_out_date ? attendance.clock_out_date : '-'} : ${attendance.clock_out_time ? attendance.clock_out_time : '-'}`}</Table.Td>
                    <Table.Td>
                      <ActionIcon
                        onClick={() => openDetailAttendanceModal(attendance)}
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
