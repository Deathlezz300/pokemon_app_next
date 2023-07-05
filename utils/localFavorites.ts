import { PokemonResponse } from "@/interfaces/PokemonResponse";

const ontToogleFavorite=(pokemon:PokemonResponse)=>{
    let data:PokemonResponse[]=JSON.parse(localStorage.getItem('favorites') || '[]' );
    if(data.some(pok=>pok.id===pokemon.id)){
       data=data.filter(pok=>{
        return pok.id!=pokemon.id;
       }) 
    }else{
        data.push(pokemon);
    }

    localStorage.setItem('favorites',JSON.stringify(data));
    
}

//En nextjs el trabaja con localStorage tanto del servidor y cliente
//en este caso se debe decir que use el del cliente
const existInFavorites=(pokemon:PokemonResponse):boolean=>{

    if(typeof window ==='undefined') return false;

    const favorites:PokemonResponse[]=JSON.parse(localStorage.getItem('favorites') || '[]');

    return favorites?.some(pok=>pok.id===pokemon.id);

}

const pokemons=():PokemonResponse[]=>{

    return JSON.parse(localStorage.getItem('favorites') || '[]')

}


export{
    ontToogleFavorite,
    existInFavorites,
    pokemons
}