import PokemonApi from "@/api/PokemonApi";
import { MainLayout } from "@/components/layouts/MainLayout";
import { PokemonListResponse } from "@/interfaces/PokeInterfaces";
import { PokemonResponse } from "@/interfaces/PokemonResponse";
import { getPokemonInfo } from "@/utils/getPokemonInfo";
import { existInFavorites, ontToogleFavorite } from "@/utils/localFavorites";
import { Grid, Card, Button, Container,Text,Image } from "@nextui-org/react";
import confetti from "canvas-confetti";
import { NextPage } from "next";
import { GetStaticPaths } from 'next'
import { GetStaticProps } from 'next'
import { useState } from "react";

interface props{
    pokemon:PokemonResponse
}

const PokemonByName:NextPage<props>=({pokemon})=>{
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


// You should use getStaticPaths if you’re statically pre-rendering pages that use dynamic routes


export const getStaticPaths: GetStaticPaths = async (ctx) => {
    
    
    const { data } = await PokemonApi.get<PokemonListResponse>('/pokemon?limit=151&offset=0');  // your fetch function here 


    return {
        paths: data.results.map(pok=>{
            return{
                params:{name:pok.name}
            }
        }),
        fallback: 'blocking'
    }
}


export const getStaticProps: GetStaticProps = async ({params}) => {
    
    const {name}=params as {name:string};
    
    const pokemon=await getPokemonInfo(name);
    
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
        }
    }
}

export default PokemonByName