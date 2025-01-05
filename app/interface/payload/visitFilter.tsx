import { ComboboxItem } from "@mantine/core";

interface visitFilterInterface {
    salesId: ComboboxItem | undefined;
    category: string | undefined;
    startDate: string | undefined;
    endDate: string | undefined
    customerId: string | undefined
}

export default visitFilterInterface;