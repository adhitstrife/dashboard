import { useEffect } from 'react';
import Link from 'next/link';
import { useAtom } from 'jotai';
import { Box, Button, Grid, Group, Image, Loader, Modal } from '@mantine/core';
import { DataLabel } from '@/components/label/dataLabel';
import useApproveCustomer from '@/hooks/customer/useApproveCustomer';
import useDeleteCustomer from '@/hooks/customer/useDeleteCustomer';
import useGetListCustomer from '@/hooks/customer/useGetListCustomer';
import { customerApproveModalAtom } from '@/state/component_state/modal/customerApproveModalAtom';
import { customerDetailAtom } from '@/state/data/customer/customerDetailAtom';

export const CustomerApproveModal = () => {
  const [detailCustomer, setDetailCustomer] = useAtom(customerDetailAtom);
  const [isModalOpen, setIsModalOpen] = useAtom(customerApproveModalAtom);
  const { isLoadingGetListCustomer, getListCustomer } = useGetListCustomer();
  const { approveCustomer, isLoadingApproveCustomer } = useApproveCustomer();

  useEffect(() => {
    console.log(isModalOpen);
  }, [isModalOpen]);

  const onCloseModal = () => {
    setDetailCustomer(null);
    setIsModalOpen(false);
  };

  const handleApprove = async () => {
    if (detailCustomer) {
      try {
        await approveCustomer(detailCustomer.id);
      } catch (error) {
        console.log(error);
      } finally {
        getListCustomer(1, 10);
        setIsModalOpen(false);
        setDetailCustomer(null);
      }
    }
  };

  return (
    <Modal
      opened={isModalOpen}
      withCloseButton
      onClose={onCloseModal}
      size="lg"
      title={`Arpprove ${detailCustomer?.name} as customer`}
    >
      <Box>
        {detailCustomer && (
          <Grid mt={20}>
            <Grid.Col span={6}>
              <DataLabel label="Customer Name" value={detailCustomer.name} />
            </Grid.Col>
            <Grid.Col span={6}>
              <DataLabel label="Contact Person" value={detailCustomer.contact_person} />
            </Grid.Col>
            <Grid.Col span={6}>
              <DataLabel label="Phonenumber" value={detailCustomer.phone} />
            </Grid.Col>
            <Grid.Col span={6}>
              <DataLabel label="NPWP" value={detailCustomer.npwp} />
              {detailCustomer.npwp_image && (
                <Link href={detailCustomer.npwp_image} target="_blank">
                  <Image src={detailCustomer.npwp_image} h={100} w={200} />
                </Link>
              )}
            </Grid.Col>
            <Grid.Col span={6}>
              <DataLabel label="Permission Letter" value={detailCustomer.permission_letter} />
            </Grid.Col>
            <Grid.Col span={6}>
              <DataLabel label="Status" value={detailCustomer.status} />
            </Grid.Col>
            <Grid.Col span={6}>
              <DataLabel label="Address" value={detailCustomer.address} />
            </Grid.Col>
            <Grid.Col span={6}>
              <DataLabel
                label="Province"
                value={detailCustomer.province ? detailCustomer.province.name : '-'}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <DataLabel
                label="City"
                value={detailCustomer.city ? detailCustomer.city.name : '-'}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <DataLabel
                label="District"
                value={detailCustomer.district ? detailCustomer.district.name : '-'}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <DataLabel
                label="Sub District"
                value={detailCustomer.sub_district ? detailCustomer.sub_district.name : '-'}
              />
            </Grid.Col>
          </Grid>
        )}
      </Box>
      <Group justify="right" mt={20}>
        <Button onClick={handleApprove} type="submit" variant="filled" color="primary-red">
          {isLoadingApproveCustomer ? <Loader color="white" size={'sm'} /> : 'Approve'}
        </Button>
        <Button onClick={onCloseModal} variant="filled" color="secondary-gray">
          Cancel
        </Button>
      </Group>
    </Modal>
  );
};
