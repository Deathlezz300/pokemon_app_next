import Head from 'next/head'
import React from 'react'
import { NavBar } from './NavBar'


interface props{
    children:JSX.Element,
    title?:string
}

const origin=(typeof window==='undefined' ? '' : window.location.origin);

export const MainLayout: React.FC< props > = ({children,title}) => {
  return (
    <>
    <Head>
        <title>{title || 'PokemonApp'}</title>
        <meta name="author" content="Alejandro Toledo" />
        <meta name="description" content="PokemonApp" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        <meta property="og:title" content={`Informacion sobre ${title}`} />
        <meta property="og:description" content={`Esta es la pagina de ${title}`} />
        <meta property="og:image" content={`${origin}/images/banner.png`} />
    </Head>
    <NavBar/>
    <main>
        {children}
    </main>
    </>
  )
}
