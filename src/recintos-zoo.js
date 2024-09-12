class RecintosZoo {
    constructor() {
        this.recintos = [
            { id: 1, bioma: 'savana', tamanhoTotal: 10, animais: { macacos: 3 } },
            { id: 2, bioma: 'floresta', tamanhoTotal: 5, animais: {} },
            { id: 3, bioma: 'savana e rio', tamanhoTotal: 7, animais: { gazela: 1 } },
            { id: 4, bioma: 'rio', tamanhoTotal: 8, animais: {} },
            { id: 5, bioma: 'savana', tamanhoTotal: 9, animais: { leão: 1 } }
        ];
    }

    analisaRecintos(animal, quantidade) {
        const animais = {
            'LEAO': { tamanho: 3, bioma: 'savana' },
            'LEOPARDO': { tamanho: 2, bioma: 'savana' },
            'CROCODILO': { tamanho: 3, bioma: 'rio' },
            'MACACO': { tamanho: 1, biomas: ['savana', 'floresta'] },
            'GAZELA': { tamanho: 2, bioma: 'savana' },
            'HIPOPOTAMO': { tamanho: 4, biomas: ['savana', 'rio'] }
        };

        if (!animais[animal]) {
            return { erro: 'Animal inválido', recintosViaveis: false };
        }

        if (quantidade <= 0) {
            return { erro: 'Quantidade inválida', recintosViaveis: false };
        }

        if (animal === 'MACACO' && quantidade > 9) {
            return { erro: "Não há recinto viável", recintosViaveis: false };
        }

        const recintosViaveis = this.recintos
            .filter(recinto => {
                if (animal === 'CROCODILO') {
                    return recinto.id === 4;
                }
                // Verifica se o bioma do recinto é compatível com os biomas permitidos para o animal
                return animais[animal].biomas ? animais[animal].biomas.includes(recinto.bioma.split(' e ')[0]) : recinto.bioma.includes(animais[animal].bioma);
            })
            .map(recinto => {
                const espacoOcupado = Object.entries(recinto.animais)
                    .reduce((total, [nomeAnimal, qtd]) => total + (animais[nomeAnimal.toUpperCase()]?.tamanho || 0) * qtd, 0);

                const espacoLivre = recinto.tamanhoTotal - espacoOcupado;

                if (espacoLivre >= (animais[animal].tamanho * quantidade)) {
                    return `Recinto ${recinto.id} (espaço livre: ${espacoLivre - animais[animal].tamanho * quantidade} total: ${recinto.tamanhoTotal})`;
                }
                return null;
            })
            .filter(Boolean);

        return recintosViaveis.length > 0 ? { recintosViaveis } : { erro: 'Não há recinto viável', recintosViaveis: false };
    }
}

export { RecintosZoo as RecintosZoo };
