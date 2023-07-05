import { MainLayout } from "@/components/layouts/MainLayout";
import { NoFavorites } from "@/components/layouts/NoFavorites";
import { PokemonResponse } from "@/interfaces/PokemonResponse";
import { pokemons } from "@/utils/localFavorites";
import { Card, Grid } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const FavoritePage=()=>{

    const [favoritePokemons,SetFavoritePokemons]=useState<PokemonResponse[]>([]);

    const router=useRouter();

    useEffect(()=>{
        SetFavoritePokemons(pokemons());
        console.log("hola");
    },[])

    const onClickPokemon=(pokemon:PokemonResponse)=>{
        router.push(`/name/${pokemon.name}`);
    }

    return(
        <MainLayout>
            {
                favoritePokemons.length===0 ? <NoFavorites/> :
                <Grid.Container gap={2} direction="row" justify="flex-start">
                    {
                        favoritePokemons.map(pok=>(
                            <Grid xs={6} sm={3} md={2} lg={1} key={pok.id}>
                                <Card isHoverable onPress={()=>onClickPokemon(pok)} isPressable css={{padding:10}}>
                                    <Card.Image
                                        src={pok.sprites.other?.dream_world.front_default || ''}
                                        width={'100%'}
                                        height={140}
                                        alt=""
                                    />
                                </Card>
                            </Grid>
                        ))
                    }
                </Grid.Container>
            }
        </MainLayout>
    )
}

export default FavoritePage;