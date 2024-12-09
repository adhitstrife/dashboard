"use client"
import { Box, Button, Card, Center, Flex, Image, PasswordInput, Text, TextInput, Title } from '@mantine/core';
import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';
import { Welcome } from '../components/Welcome/Welcome';
import { useViewportSize } from '@mantine/hooks';
import { useMantineTheme } from '@mantine/core';
import Link from 'next/link';


export default function HomePage() {
  const { height, width } = useViewportSize();
  const theme = useMantineTheme();
  return (
    <Flex direction={"column"} mih={height} px={20}>
      <Box mt={100} className="">
        <Image mx={"auto"} w={200} src={"/logo.png"} />
      </Box>
      <div className="title">
        <Title mt={112} ta={"center"} order={2}>Welcome</Title>
        <Text ta={"center"} style={{ color: theme.colors.gray[5] }}>Continue sign in to started the app</Text>
      </div>
      <Center mt={30} className="input">
        <Flex direction={'column'} w={{ base: 500, sm: 355 }}>
          <TextInput size='md' placeholder='Username' />
          <PasswordInput mt={20} size='md' placeholder='Password' />
          <Text href={"/dashboard"} component={Link} ta={"right"} mt={12} c={"blue"} size='sm'>Forgot Password</Text>
          <Button variant='filled' mt={66} color={"primary-red"}>Login</Button>
        </Flex>
      </Center>
    </Flex>
  );
}
