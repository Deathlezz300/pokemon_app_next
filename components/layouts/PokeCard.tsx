import { SmallPokemon } from '@/interfaces/PokeInterfaces'
import { Card, Grid, Row, Text } from '@nextui-org/react'
import React,{FC} from 'react'
import { useRouter } from 'next/router'

export const PokeCard:FC<SmallPokemon> =({uid,name,img,url}) => {
  
    const router=useRouter();

    const onPokemonClic=()=>{
        router.push(`/name/${name}`)
    }
  
  
    return (
    <Grid  xs={6} sm={3} md={2} xl={1} key={uid}>
        <Card isHoverable isPressable onClick={onPokemonClic}>
            <Card.Body css={{p:1}}>
                <Card.Image src={img} width="100%" height={140}/>
            </Card.Body>
            <Card.Footer>
                <Row justify='space-between'>
                    <Text transform='capitalize'>{name}</Text>
                    <Text transform='capitalize'>{uid}</Text>
                </Row>
            </Card.Footer>
        </Card>
    </Grid>
  )
}
