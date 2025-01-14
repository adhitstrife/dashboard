"use client"
import { Box, Button, Card, Center, Flex, Image, Loader, PasswordInput, Text, TextInput, Title } from '@mantine/core';
import { useMantineTheme } from '@mantine/core';
import Link from 'next/link';
import useLogin from '@/hooks/auth/useLogin';
import React, { useState } from 'react';
import style from '@/app/style/bd-coming-soon.module.css'


export default function HomePage() {
  return (
    <div className="">
      <style jsx global>{`
        * {
          padding: 0;
          margin: 0;
          box-sizing: border-box;
        }
        html, body {
          height: 100%;
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-size: 110%;
          color: #ecf0f1;
          font-family: 'Source Sans Pro', sans-serif;
          background: radial-gradient(ellipse at bottom, #1b2735 0%, #090a0f 100%);
          width: 100%;
          position: absolute;
          top: 0;
          left: 0;
          overflow: hidden;
        }
        
      `}</style>
      <div className="">
        <div className={style.overlay}></div>
        <div className={style.stars} aria-hidden="true"></div>
        <div className={style.starts2} aria-hidden="true"></div>
        <div className={style.stars3} aria-hidden="true"></div>
        <main className={style.main}>
          <section className={style.contact}>
            <h1 className={style.title}>Awesome Thing</h1>
            <h2 className={style.subTitle}>Site Under Construction</h2>
          </section>
        </main>
      </div>
    </div>
  );
}
