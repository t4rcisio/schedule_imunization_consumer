# 

Módulo: API front-end

Para compilar por completo o projeto, é preciso baixar e executar dois repositórios:

->	A API [back-end](https://github.com/t4rcisio/schedule_imunization_api) <br/>
->	O front-end (atual)

<br/>
Antes de executar esses passos, vá no repositório da API para subir o servidor!
<br/>
<br/>
Exemplos de pacientes já cadastrados:

 Nome           | CPF           |
| ------------- | ------------- |
| `John`        | 73015412019   |
| `Bob`         | 01749277034   |

<br/>
<br/> 
Exemplos de Servidores já cadastrados

 Nome           | CPF           | Senha       |
| ------------- | ------------- | --------    |
| `Carlos`      | 12872530088   | 12345678    |
| `Ana`         | 28840085009   | 12345678    |
<br/>

<br/>
Fique a vontade para criar usuários e incluir sessões :)
<br/>
<br/>


Preparando o ambiente de execução da API

Passo 1<br/>
-> Clone o projeto
- *git clone https://github.com/t4rcisio/schedule_imunization_consumer.git*

Passo 2<br/>
-> Modifique o arquivo .env-example
-  Modifique o nome do arquivo para .env 

Passo 3 <br/>
-> Instale as dependências:
- Na raiz do projeto, execute  *yarn install*

Passo 4 <br/>
-> Subindo o front
- Por padrão, a porta que o front irá usar é a 3000<br />
        caso queira modificar, o parâmetro está no arquivo .env.<br />
        Execute o comando *npm start*

Se tudo ocorrer bem, seu navegador irá abrir na home da aplicação<br />


