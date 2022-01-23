<a href="https://github.com/OtavioPinheiro/Desafio-1/blob/master/LICENSE.md" alt="LICENSE">
<img src="https://img.shields.io/badge/LICENSE-MIT-brightgreen"/></a>
<a href="" alt="FullCycle">
<img src="https://img.shields.io/badge/Desafio-FullCycle-yellow"/></a>
<a href="" alt="DOCKER">
<img src="https://badgen.net/badge/icon/docker?icon=docker&label"/></a>

[![](https://badgen.net/github/commits/OtavioPinheiro/Desafio-1)](https://github.com/OtavioPinheiro/Desafio-1/commits)
[![](https://img.shields.io/badge/JavaScript-83%25-orange)]()

# Desafio 1 do PFA :whale:
Primeiro desafio do PFA do curso *Full Cycle*.

# Sumário
- [Descrição](#descrição)
- [Dicas](#dicas)
- [Execução](#execução-dos-containers)

## Descrição
Crie um programa utilizando sua linguagem de programação favorita que faça uma listagem simples do nome de alguns módulos do curso *Full Cycle* os trazendo de um banco de dados MySQL. Gere a imagem desse container e a publique no DockerHub.

Gere uma imagem do nginx que seja capaz que receber as solicitações http e encaminhá-las para o container.

Crie um repositório no github com todo o fonte do programa e das imagens geradas.

Crie um arquivo README.md especificando quais comandos precisamos executar para que a aplicação funcione recebendo as solicitações na porta 8080 de nosso computador. Lembrando que NÃO utilizaremos Docker-compose nesse desafio.

# Dicas
## MySQL
- O arquivo init.sql é bem útil quando queremos criar um banco dados de uma forma mais específica e controlada. Nele podemos especificar o *Database* diretamente por do `CREATE DATABASE <nome_do_database>`, sem precisar fazer essa tarefa por meio de comando quando executarmos o `docker run -e MYSQL_DATABASE=<nome_do_database>` ou pelo Dockerfile `ENV MYSQL_DATABASE <nome_do_database>`, ambos os casos definindo a variável de ambiente MYSQL_DATABASE=<nome_do_database>. Outra vantagem é que já podemos criar a tabela e popula-la utilizando o próprio SQL para isso. Utilizando a estratégia do init.sql temos que copiá-lo para dentro da imagem utilizando o `COPY ./init.sql /docker-entrypoint-initdb.d/`, isso irá compiar o arquivo init.sql para a pasta docker-entrypoint.init.d e quando o banco de dados for iniciado pela primeira vez, ele irá executar todos os arquivos .sql que estão dentro desta pasta.

## NodeJS
- Na momento de copiar o conteúdo da pasta node para dentro da *container*, para não sobrescrever a pasta node_modules, podemos "congelar" a pasta, passando junto com o `docker run`  a *flag* `-v /home/node/app/node_modules`. Desta forma a pasta node_modules, que tinha sido criado no momento em que executamos o *build*, não será sobrescrita quando executarmos o *container* passando a *flag*  de compartilhamento de volume (`-v ${pwd}/node:/home/node/app/node_modules` para Windows e `-v $(pwd)/node:/home/node/app/node_modules` para Linux).

## Nginx
- Configurar o arquivo default.conf adequadamente.
- Compartilhar a porta correta quando executar o *container* pela *flag* `-p <porta_host>:<porta_container>`

# Execução dos *containers*
Há duas maneiras de executar essa aplicação.

### A primeira maneira consiste em realizar o `git clone` deste projeto e seguir os passos descritos a seguir. Para que a aplicação funcione é necessário executar os comandos na ordem:
1. `docker network create pfa-net`
2. `docker build -t 171793/pfa-mysql`
3. `docker run --name pfa-mysql --init -dit --network pfa-net -v ${pwd}/mysql/data:/var/lib/mysql 171793/pfa-mysql`
4. `docker build -t 171793/pfa-node`
5. `docker run --name pfa-node --init -dit --network pfa-net -v ${pwd}/node:/home/node/app -v /home/node/app/node_modules 171793/pfa-node`
6. `docker build -t 171793/pfa-nginx`
7. `docker run --name pfa-nginx --init -dit --network pfa-net -p 8080:80 171793/pfa-nginx`
8. Acessar o browser em `localhost:8080`

### A segunda maneira consiste em acessar as imagens geradas desse projeto por meio do Docker Hub. Desta forma temos:
1. `docker network create pfa-net`
2. `docker run --name pfa-mysql --init -dit --network pfa-net -v ${pwd}/mysql/data:/var/lib/mysql 171793/pfa-mysql`
3. `docker run --name pfa-node --init -dit --network pfa-net -v ${pwd}/node:/home/node/app -v /home/node/app/node_modules 171793/pfa-node`
4. `docker run --name pfa-nginx --init -dit --network pfa-net -p 8080:80 171793/pfa-nginx`
5. Acessar o browser em `localhost:8080`