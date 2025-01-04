import useApproveCustomer from "@/hooks/customer/useApproveCustomer";
import useDeleteCustomer from "@/hooks/customer/useDeleteCustomer";
import useGetListCustomer from "@/hooks/customer/useGetListCustomer";
import { attendanceLocalModalAtom } from "@/state/component_state/modal/attendance/attendanceLocalModalAtom";
import { customerApproveModalAtom } from "@/state/component_state/modal/customerApproveModalAtom";
import { attendanceDetailAtom } from "@/state/data/attendance/attendanceDetailAtom";
import { customerDetailAtom } from "@/state/data/customer/customerDetailAtom";
import { Button, Loader, Modal } from "@mantine/core"
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
        <Modal opened={isModalOpen} withCloseButton onClose={onCloseModal} size="lg" title={`${detailAttendance?.sales.name} clock in location`}>
            <iframe
                id="map"
                width="600"
                height="450"
                loading="lazy"
                src={`https://www.google.com/maps?q=${detailAttendance?.latitude},${detailAttendance?.longitude}&hl=en&z=14&output=embed`}>
            </iframe>
        </Modal>
    )
}