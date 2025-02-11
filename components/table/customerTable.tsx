import { FC, useState } from 'react';
import Link from 'next/link';
import {
  IconCheck,
  IconEdit,
  IconEye,
  IconPencil,
  IconTrash,
  IconUserPin,
} from '@tabler/icons-react';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import {
  ActionIcon,
  Badge,
  Box,
  Button,
  Group,
  Pagination,
  Table,
  Text,
  Tooltip,
} from '@mantine/core';
import customerData from '@/app/interface/response/customer/customerData';
import customerListResponse from '@/app/interface/response/customer/customerListResponse';
import useGetCustomerDetail from '@/hooks/customer/useGetCustomerDetail';
import { customerApproveModalAtom } from '@/state/component_state/modal/customerApproveModalAtom';
import { customerDeleteModalAtom } from '@/state/component_state/modal/customerDeleteModalAtom';
import { customerDetailModalAtom } from '@/state/component_state/modal/customerDetailModalAtom';
import { customerEditModalAtom } from '@/state/component_state/modal/customerEditModalAtom';
import { customerDetailAtom } from '@/state/data/customer/customerDetailAtom';
import { customerListAtom } from '@/state/data/customer/customerListAtom';

interface customerTable {
  page: number;
  handleChangePage: (page: number) => void;
  onAssignSales?: (customerId: number) => void;
  isHideActionButton?: boolean;
}
export const CustomerTable: FC<customerTable> = ({
  page,
  handleChangePage,
  onAssignSales,
  isHideActionButton,
}) => {
  const setDetailCustomer = useSetAtom(customerDetailAtom);
  const setIsModalOpen = useSetAtom(customerDetailModalAtom);
  const setIsModalEditOpen = useSetAtom(customerEditModalAtom);
  const setIsModalDeleteOpen = useSetAtom(customerDeleteModalAtom);
  const setIsModalApproveOpen = useSetAtom(customerApproveModalAtom);
  const dataCustomer = useAtomValue(customerDetailAtom);
  const customerList = useAtomValue(customerListAtom);

  const { getDetailCustomer, customerDetail, isLoadingGetDetailCustomer } = useGetCustomerDetail();

  const handleOpenDetailModal = (customer: customerData) => {
    setDetailCustomer(customer);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = async (customer: customerData) => {
    await getDetailCustomer(customer.id);
    setIsModalEditOpen(true);
  };

  const handleOpenApproveModal = async (customer: customerData) => {
    await getDetailCustomer(customer.id);
    setIsModalApproveOpen(true);
  };

  const handleOpenDeleteModal = (customer: customerData) => {
    setDetailCustomer(customer);
    setIsModalDeleteOpen(true);
  };

  return (
    <Box>
      {customerList && (
        <div className="">
          <Table.ScrollContainer minWidth={200} mt={20}>
            <Table>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Name</Table.Th>
                  <Table.Th>Contact Person</Table.Th>
                  <Table.Th>Joined Date</Table.Th>
                  <Table.Th>Phone</Table.Th>
                  {!isHideActionButton && <Table.Th>Action</Table.Th>}
                </Table.Tr>
              </Table.Thead>
              {customerList.results.length <= 0 ? (
                <Table.Tbody>
                  <Table.Tr>
                    <Table.Td colSpan={6} style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                      <Text>No customers yet </Text>
                    </Table.Td>
                  </Table.Tr>
                </Table.Tbody>
              ) : (
                <Table.Tbody>
                  {customerList.results.map((customer, index) => (
                    <Table.Tr key={index}>
                      <Table.Td>{customer.name}</Table.Td>
                      <Table.Td>{customer.contact_person}</Table.Td>
                      <Table.Td>{new Date(customer.created_at).toLocaleDateString()}</Table.Td>
                      <Table.Td>{customer.phone}</Table.Td>
                      <Table.Td>
                        {!isHideActionButton && (
                          <Group>
                            {customer.status == 'In Review' ? (
                              <Tooltip label="Approve">
                                <ActionIcon
                                  onClick={() => handleOpenApproveModal(customer)}
                                  variant="transparent"
                                >
                                  <IconCheck color="green" size={20} stroke={1.5} />
                                </ActionIcon>
                              </Tooltip>
                            ) : customer.status != 'In Review' && onAssignSales ? (
                              <Tooltip label="Assign To Sales">
                                <ActionIcon
                                  onClick={() => onAssignSales(customer.id)}
                                  variant="transparent"
                                >
                                  <IconUserPin color="green" size={20} stroke={1.5} />
                                </ActionIcon>
                              </Tooltip>
                            ) : (
                              ''
                            )}
                            <Tooltip label="Customer Details">
                              <ActionIcon
                                component={Link}
                                href={`/dashboard/customer/${customer.id}`}
                                variant="transparent"
                              >
                                <IconEye size={20} stroke={1.5} />
                              </ActionIcon>
                            </Tooltip>
                            <Tooltip label="Edit Customer">
                              <ActionIcon
                                onClick={() => handleOpenEditModal(customer)}
                                variant="transparent"
                              >
                                <IconPencil size={20} stroke={1.5} />
                              </ActionIcon>
                            </Tooltip>
                            <Tooltip label="Delete Customer">
                              <ActionIcon
                                onClick={() => handleOpenDeleteModal(customer)}
                                variant="transparent"
                              >
                                <IconTrash color="red" size={20} stroke={1.5} />
                              </ActionIcon>
                            </Tooltip>
                          </Group>
                        )}
                      </Table.Td>
                    </Table.Tr>
                  ))}
                </Table.Tbody>
              )}
            </Table>
          </Table.ScrollContainer>
          {customerList.count > 10 && (
            <Pagination
              color="primary-red"
              mt={10}
              value={page}
              onChange={(e) => handleChangePage(e)}
              total={Math.ceil(customerList.count / 10)}
            />
          )}
        </div>
      )}
    </Box>
  );
};
