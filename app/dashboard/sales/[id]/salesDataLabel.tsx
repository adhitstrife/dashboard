import { Box, Text, useMantineTheme } from "@mantine/core";
import { FC } from "react";

interface salesDetailProps {
    label: string;
    value: string
}

export const SalesDataLabel: FC<salesDetailProps> = ({ label, value }) => {
    const theme = useMantineTheme();
    return (
        <Box>
            <Text size='sm' style={{ color: theme.colors['secondary-gray'][9] }}>{ label }</Text>
            <Text size='lg' fw={700}>{ value }</Text>
        </Box>
    )
}