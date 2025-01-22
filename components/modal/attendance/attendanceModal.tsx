import useApproveCustomer from "@/hooks/customer/useApproveCustomer";
import useDeleteCustomer from "@/hooks/customer/useDeleteCustomer";
import useGetListCustomer from "@/hooks/customer/useGetListCustomer";
import { attendanceLocalModalAtom } from "@/state/component_state/modal/attendance/attendanceLocalModalAtom";
import { customerApproveModalAtom } from "@/state/component_state/modal/customerApproveModalAtom";
import { attendanceDetailAtom } from "@/state/data/attendance/attendanceDetailAtom";
import { customerDetailAtom } from "@/state/data/customer/customerDetailAtom";
import { Button, Image, Loader, Modal, Tabs } from "@mantine/core"
import { IconImageInPicture, IconMap } from "@tabler/icons-react";
import { useAtom } from "jotai";
import { useEffect } from "react";

export const AttendanceModal = () => {
    const [detailAttendance, setDetailAttendance] = useAtom(attendanceDetailAtom);
    const [isModalOpen, setIsModalOpen] = useAtom(attendanceLocalModalAtom);

    useEffect(() => {
        console.log(isModalOpen)
    }, [isModalOpen])

    const onCloseModal = () => {
        setDetailAttendance(null)
        setIsModalOpen(false)
    }

    return (
        <Modal opened={isModalOpen} withCloseButton onClose={onCloseModal} size="lg" title={`${detailAttendance?.sales.name} attendance detail`}>
            {detailAttendance && (
                <Tabs color="primary-red" variant="outline" defaultValue="location">
                    <Tabs.List>
                        <Tabs.Tab value="location" leftSection={<IconMap size={20} stroke={1.5} />}>
                            Location
                        </Tabs.Tab>
                        {detailAttendance?.clock_in_image && (
                            <Tabs.Tab value="image" leftSection={<IconImageInPicture size={20} stroke={1.5} />}>
                                Image
                            </Tabs.Tab>
                        )}
                    </Tabs.List>
                    <Tabs.Panel value="location">
                        <iframe
                            id="map"
                            width="600"
                            height="450"
                            loading="lazy"
                            src={`https://www.google.com/maps?q=${detailAttendance?.latitude},${detailAttendance?.longitude}&hl=en&z=14&output=embed`}>
                        </iframe>
                    </Tabs.Panel>
                    {detailAttendance?.clock_in_image && (
                        <Tabs.Panel value="image">
                            <Image mt={20} src={`${detailAttendance.clock_in_image}`} w="auto"
                                            fit="contain" />
                        </Tabs.Panel>
                    )}
                </Tabs>
            )}
        </Modal>
    )
}