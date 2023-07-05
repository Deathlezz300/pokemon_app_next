import { MainLayout } from '@/components/layouts/MainLayout'
import { GetStaticProps, NextPage } from 'next'
import PokemonApi from '@/api/PokemonApi'
import { PokemonListResponse, SmallPokemon } from '@/interfaces/PokeInterfaces'
import Image from 'next/image'
import { Grid } from '@nextui-org/react'
import { PokeCard } from '@/components/layouts/PokeCard'

interface props{
  pokemons:SmallPokemon[]
}

 const HomePage:NextPage<props>=({pokemons})=>{

  return (
      <MainLayout title='PokemonApp'>
          <section style={{
            display:'flex',
            width:'100%',
            justifyContent:'center',
            alignItems:'center'
            }}>
              <Grid.Container css={{width:'95%'}} gap={2} justify='flex-start'>
                {
                  pokemons.map(poke=>{
                    return <PokeCard key={poke.uid} uid={poke.uid} img={poke.img} name={poke.name} url={poke.url}/>
                  })
                }
              </Grid.Container>
          </section>
      </MainLayout>
  )
}


//Se ejecuta del lado del servidor, esto no llega al cliente
//Por ejemplo, con useEffect se ejeucta del lado del cliente, en este caso
//Se ejecuta antes de que se entre a esta pagina
//con excepcion de las props
//Esto se usa cuando nosotros sabemos que data debemos traer para esta pagina
//antes de que el usuario llegue a acceder a la misma
//En otras palabras traer informacion que yo se que informacion es
//En desarrollo se ejecuta varias veces, en el build una unica vez
//Otra cosa a tener en cuenta, esto se usa unicamente cuando LA INFORMACION SIEMPRE ES LA MISMA
export const getStaticProps: GetStaticProps = async (ctx) => {
  
  const {data}=await PokemonApi.get<PokemonListResponse>('/pokemon?limit=151&offset=0');

  const nuevoArreglo=data.results.map(poke=>{

    const id=poke.url.split('/')[6];

    return{
      ...poke,
      uid:id,
      img:`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`
    }
  });

  return {
    props: {
        pokemons:nuevoArreglo
    }
  }
}

export default HomePage;
