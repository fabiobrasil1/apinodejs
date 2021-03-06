const { response, request } = require('express');
const express = require('express');

function main() {
    console.log("Iniciando app");
    const app = express();
    app.use(express.json())
    const cadastrados = [];


    app.post('/cadastro', (request, response) => {
        const prarametrosObrigatorios = ["id","numero","nome","idade","sexo","nascimento"]
        for(const campo of prarametrosObrigatorios){
            if(!(campo in request.body)) {
                return response.json({message: `campo ${campo} é obrigatório!`})
            }
        }

        const cadastro = {
            id: request.body.id,
            numero: request.body.numero,
            nome: request.body.nome,
            idade: request.body.idade,
            sexo: request.body.sexo,
            nascimento: request.body.nascimento
        };

        cadastrados.push (cadastro)
    
        return response.json({message: `cadastro realizado com sucesso!`});
    });

    app.delete('/deletar', (request, response) => {
        const idADeletar = request.body.id
        for(const index in cadastrados){
             const item = cadastrados[index];
            if (item.id == idADeletar){    
                cadastrados.splice(index, 1)
                return response.json({message: `cadastro deletado com sucesso: `})
            }
        }
        return response.status(404).json({message: `não foi possível encontrar o telefone!`})
        
    })

    
    app.get('/relatorio', (request, response) =>{
        return response.json(cadastrados)

    });
        
    app.listen(3000, () => {console.log("App iniciado escutando a porta 3000")});

}

main();
