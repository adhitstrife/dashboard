"use client"
import { Box, Button, Card, Center, Flex, Image, Loader, PasswordInput, Text, TextInput, Title } from '@mantine/core';
import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';
import { Welcome } from '../components/Welcome/Welcome';
import { useViewportSize } from '@mantine/hooks';
import { useMantineTheme } from '@mantine/core';
import Link from 'next/link';
import useLogin from '@/hooks/auth/useLogin';
import React, { useState } from 'react';


export default function HomePage() {
  const theme = useMantineTheme();
  const { height, width } = useViewportSize();
  const { login, isLoading } = useLogin();
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setCredentials({
      ...credentials,
      [name]: value
    });
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await login(credentials);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

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
        <form onSubmit={handleSubmit}>
          <Flex direction={'column'} w={{ base: 300, sm: 355 }}>
            <TextInput size='md' placeholder='Username' name='username' onChange={(e) => handleChange(e)} />
            <PasswordInput mt={20} size='md' name='password' onChange={(e) => handleChange(e)} placeholder='Password' />
            <Text href={"/dashboard"} component={Link} ta={"right"} mt={12} c={"blue"} size='sm'>Forgot Password</Text>
            <Button type='submit' variant='filled' mt={66} color={"primary-red"}>{isLoading ? <Loader color='white' size={'sm'} /> : 'Sign In'}</Button>
          </Flex>
        </form>
      </Center>
    </Flex>
  );
}
