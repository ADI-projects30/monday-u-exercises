export class PokemonClient {
    async fetchPokemon(allIds) {
        let pokemons = []
        const idsArr = allIds.toString().split(',')
        const promises = [];
        const arrayLength = idsArr.length;
        for (let i = 0; i < arrayLength; i++) {
            const url = `https://pokeapi.co/api/v2/pokemon/${idsArr[i]}`;
            promises.push(fetch(url).then((res) => res.json()));
        }

        try {
            await Promise.all(promises).then((results) => {
                const pokemon = results.map((result) => ({
                    name: result.name,
            }));
            pokemons.push(pokemon)
        });
        } catch(err) {
            pokemons.push([{name: `Pokemons with IDs ${allIds} was not found`}]);
        }

        return pokemons[0]
    };
}