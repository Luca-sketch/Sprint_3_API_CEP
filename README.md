# Título: API CEP

## Descrição

Esta API faz parte do projeto Modern Click Store, mas pode ser utilizada em outros projetos. Ela é responsável pela validação e busca de CEPs utilizando geolocalização (latitude e longitude). A validação do CEP é feita utilizando a API [viacep](https://viacep.com.br/) e a busca de CEPs é feita utilizando a API [nominatim](https://nominatim.org/).

## Fluxograma

Este projeto envolve a integração das seções da API (NODE JS) com a comunicação das APIs externas VIA CEP e NOMINATIM.

![Fluxograma da API CEP](https://drive.google.com/uc?export=view&id=1NBjGPxtzwaBeNNsRebCLOGiGg8gidkVO)

## Instruções de Uso

Esta API pode ser utilizada de duas maneiras diferentes: via Docker ou através da instalação tradicional de dependências.

### 1. Docker

Para executar a API utilizando Docker, siga os seguintes passos:

```bash
docker build -t api_cep .
docker run -d -p 4000:4000 api_cep
```
### 2. Instalação Tradicional
```
 node index.js
 npm start
