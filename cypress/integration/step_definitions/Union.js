import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps'
import Union from "../../services/union.service.js"
import Client from "../../services/client.service.js"

var testeArr

//post_Union
When(`compare Clients to get those with repeated Names`, () => {
    Client.get_Meets_Clients().then(response => {
        //Encaminhar Nome e Email
        //Remover ._ID
        response = response.body
        for (let i = 0; i < response.length; i++) {
            for (var eachProperty in response[i]) {
                if (eachProperty === "nome" || eachProperty === "email") {
                    continue
                } else {
                    delete response[i][eachProperty]
                }
            }            
        }
        var nameArr = response.map(item => item.nome) //Apenas os Nomes
        var duplicatesArr = nameArr.filter((item, idx) => nameArr.indexOf(item) != idx) //Apenas os Nomes Duplicados
        testeArr = response.filter(e => duplicatesArr.includes(e.nome)) //Forma a Array
        if (testeArr.length === 0) {
            cy.log("Não há Clientes com nomes repetidos!")
        } else {
            cy.log("Clientes com nomes repetidos: " + JSON.stringify(testeArr))
        }
    })
});

Then(`save those Clients on Union with response status {int}`, (status) => {
    if (testeArr.length === 0) {
        return true
    } else {
        testeArr.forEach(e => {
            Union.post_Union().then(response => {
                cy.log("RESPONSE: " + JSON.stringify(response.body))
                expect(response.status).to.equal(status)
            })
        });
    }
});