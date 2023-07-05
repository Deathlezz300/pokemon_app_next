import { MainLayout } from "@/components/layouts/MainLayout";
import { NextPage } from "next";
import { GetStaticProps } from 'next'
import { GetStaticPaths } from 'next'
import PokemonApi from "@/api/PokemonApi";
import { PokemonResponse } from "@/interfaces/PokemonResponse";
import { Button, Card, Container, Grid, Text } from "@nextui-org/react";
import Image from "next/image";
import { existInFavorites, ontToogleFavorite } from "@/utils/localFavorites";
import { useState } from "react";
import confetti from 'canvas-confetti';
import { getPokemonInfo } from "@/utils/getPokemonInfo";
import { redirect } from "next/dist/server/api-utils";

interface props{
    pokemon:PokemonResponse
}

const PokemonPage:NextPage<props>=({pokemon})=>{

   const [IsInFavorites,SetIsInFavorite]=useState(existInFavorites(pokemon))

    const onToogleAddFavorite=()=>{
        ontToogleFavorite(pokemon);
        if(!IsInFavorites){
            confetti({
                zIndex:999,
                particleCount:100,
                spread:100,
                angle:-100,
                origin:{
                    x:1,
                    y:0
                }
            })
        }
        SetIsInFavorite(existInFavorites(pokemon));
    }

    return(
        <MainLayout title={pokemon.name}>
            <section style={{width:'100%',display:'flex',
                justifyContent:'center', alignItems:'center'}}>
                    <Grid.Container css={{width:'90%',marginTop:'5px'}} gap={2}>
                        <Grid xs={12} sm={4}>
                            <Card isHoverable css={{padding:'30px'}}>
                                <Card.Body css={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                                    <Card.Image 
                                        src={pokemon.sprites?.other?.dream_world.front_default || 'no'}
                                        width={'100%'}
                                        height={200}/>
                                </Card.Body>
                            </Card>
                        </Grid>
                    <Grid xs={12} sm={8}>
                        <Card>
                            <Card.Header css={{display:'flex',justifyContent:'space-between'}}>
                                <Text h1 transform="capitalize">{pokemon.name}</Text>
                                <Button
                                  color="gradient"
                                  ghost={!IsInFavorites}
                                  onPress={onToogleAddFavorite}
                                >
                                    {IsInFavorites ? 'Eliminar de favoritos' : 'Guardar en favoritos'}
                                </Button>
                            </Card.Header>
                            <Card.Body>
                                <Text size={30}>Sprites</Text>
                                <Container direction="row" display="flex" justify="center">
                                    <Image src={pokemon.sprites.front_default} width={150} height={150} alt=""/>
                                    <Image src={pokemon.sprites.back_default} width={150} height={150} alt=""/>
                                    <Image src={pokemon.sprites.front_shiny} width={150} height={150} alt=""/>
                                    <Image src={pokemon.sprites.back_shiny} width={150} height={150} alt=""/>
                                </Container>
                            </Card.Body>
                        </Card>
                    </Grid>
                    </Grid.Container>
                </section>
        </MainLayout>
    )

}

//Aqui lo que se hace es crear las paginas de forma estatica, pero con una ruta
//dinamica, el getStathicPats se encarga de generar las x paginas
//con los x parametros que le pasemos

//Con el fall blocking lo que hace es que si se pasa un parametro
//no definido el lo deja pasar al getStaticProps, y luego se hace un
//try-catch en la peticion de la data, si hay error se retorna null, en caso contrario
//el valor, si el valor existe next creará la pagina en el fylesistem y lo guardará
//para futuras peticiones
export const getStaticPaths: GetStaticPaths = async (ctx) => {
    
    //Aqui podriamos hacer una peticion con todos los ids de los productos
    const pokemons151=[...Array(151)].map((value,index)=>`${index+1}`);

    return{
        paths:pokemons151.map(ind=>{
            return{
                params:{id:ind}
            }
        }) ,
        fallback: 'blocking'
    }
}

//Cuando llegamos aca ya tenemos los parametros o props por medio del contexto
//y podemos hacer la peticion de nuestros datos del parametro x
//Con la propieda revalidate es que cada x segundos va a volver
//a actualizar los filesystems de las paginas generadas de forma estatica

export const getStaticProps: GetStaticProps = async ({params}) => {
    
    const {id}=params as {id:string};

    const pokemon=await getPokemonInfo(id);

    if(!pokemon){
        return {
            redirect:{
                destination:'/',
                permanent:false
            }
        }
    }

    return {
        props: {
            pokemon
        },
        revalidate:86400
    }
}


export default PokemonPage;