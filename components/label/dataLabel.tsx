import { Box, Text, useMantineTheme } from "@mantine/core";
import { FC } from "react";

interface labelProps {
    label: string;
    value: string;
    withValue?: boolean;
}

export const DataLabel: FC<labelProps> = ({ label, value, withValue = true }) => {
    const theme = useMantineTheme();
    return (
        <Box>
            <Text size='sm' style={{ color: theme.colors['secondary-gray'][9] }}>{ label }</Text>
            {withValue && (
                <Text size='lg' fw={700}>{ value }</Text>
            )}
        </Box>
    )
}