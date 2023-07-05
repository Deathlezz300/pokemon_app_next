import PokemonApi from "@/api/PokemonApi"
import { PokemonResponse } from "@/interfaces/PokemonResponse"

export const getPokemonInfo=async(valor:string)=>{

    const {data}=await PokemonApi.get<PokemonResponse>(`/pokemon/${valor}`)


    return {
        id:data.id,
        name:data.name,
        sprites:data.sprites
    }

}