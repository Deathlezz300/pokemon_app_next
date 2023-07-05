import React from 'react'
import styles from '../../styles/NavBar.module.css';
import { useTheme,Text, Spacer } from '@nextui-org/react';
import Link from 'next/link';

export const NavBar = () => {

   const {theme}=useTheme();

  return (
    <header className={styles.nav} style={{backgroundColor:theme?.colors.gray100.value}}>
        <Link  href='/' style={{display:'flex'}}>
          <Text color='white' h2>P</Text>
          <Text color='white' h3>okemon</Text>
        </Link>

        <Spacer css={{flex:1}}/>

        <Link href='/favorites'>
          <Text color='white'>Favoritos</Text>
        </Link>
    </header>
  )
}
