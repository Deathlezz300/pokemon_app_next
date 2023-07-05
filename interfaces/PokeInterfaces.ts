export interface PokemonListResponse {
    count:    number;
    next:     string;
    previous?: string;
    results:  SmallPokemon[];
}

export interface SmallPokemon {
    name: string;
    url:  string;
    uid: string,
    img: string;
}

