// Essa API tem o objetivo de lidar com as manipulações de CEP

import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 4000;

// Configuração do CORS para que um domínio diferente possa acessar a aplicação
app.use(cors());

// Rota para buscar endereço pelo CEP
app.get('/cep/:cep', async (req, res) => {
    const cep = req.params.cep;

    console.log(`Entrando na rota /cep, o valor que eu recebi foi: ${cep}`);

    // Validação básica para garantir que o CEP recebido é um número de 8 dígitos
    const cepPattern = /^[0-9]{8}$/;
    if (!cepPattern.test(cep)) {
        return res.status(400).json({ error: 'CEP inválido' });
    }

    try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();
        if (data.erro) {
            return res.status(404).json({ error: 'CEP não encontrado' });
        }
        res.json(data);
    } catch (error) {
        console.error('Erro ao buscar o CEP:', error);
        res.status(500).json({ error: 'Erro ao buscar o CEP' });
    }
});

// Rota para buscar CEP pela latitude e longitude
app.get('/buscarcep', async (req, res) => {
    const { latitude, longitude } = req.query;

    // Função para obter o CEP a partir de coordenadas
    const getCEPFromCoordinates = async (latitude, longitude) => {
        const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`;
        try {
            const response = await fetch(url);
            const data = await response.json();
    
            if (data && data.address && data.address.postcode) {
                return data.address.postcode;
            } else {
                return 'CEP não encontrado para as coordenadas fornecidas.';
            }
        } catch (error) {
            console.error('Erro ao consultar a API:', error.message);
            return 'Erro ao consultar a API do Nominatim.';
        }
    };

    try {
        const cep = await getCEPFromCoordinates(latitude, longitude);
        if (cep) {
            res.json({ cep });
        } else {
            res.status(404).json({ error: 'CEP não encontrado para as coordenadas fornecidas' });
        }
    } catch (error) {
        console.error('Erro ao consultar CEP:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

// Iniciando o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

