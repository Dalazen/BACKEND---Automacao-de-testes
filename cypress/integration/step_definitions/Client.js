import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps'
import Client from "../../services/client.service.js"

var Response_Meets, Response_Front

//get_Meets_Clients

When(`request all Meets registered Clients`, () => {
	Client.get_Meets_Clients().then(response => {
        cy.log("RESPONSE: " + JSON.stringify(response.body))
        cy.wrap({response}).as("Response")
        Response_Meets = response.body
    })
});

Then(`should return the response {string} status {int}`, (schema, status) => {
	cy.get("@Response").then(when => {
        cy.validateSchema(when.response.body, `${schema}/${status}`)
        expect(when.response.status).to.equal(status)
    })
});

Then(`should return a non-null body`, () => {
	cy.get("@Response").then(when => {
        expect(when.response.body).to.not.be.null
    })
});

//get_Frontend_Clients

When(`request all Front-end registered Clients`, () => {
	Client.get_Frontend_Clients().then(response => {
        cy.log("RESPONSE: " + JSON.stringify(response.body))
        cy.wrap({response}).as("Response")        
        Response_Front = response.body
    })
});

Then(`should return the response {string} and status {int}`, (schema, status) => {
	cy.get("@Response").then(when => {
        cy.validateSchema(when.response.body, `${schema}/${status}`)        
        expect(when.response.status).to.equal(status)
    })
});

Then(`should return a non-null body`, () => {
	cy.get("@Response").then(when => {
        expect(when.response.body).to.not.be.null
    })
});

//get_Compare_Client

//Variaveis Globais
var errorList = []
var clientErrorList = []

When(`compare all registered Clients`, () => {
    Client.get_Frontend_Clients().then(response_Front => {
        Client.get_Meets_Clients().then(response_Meets => {
            cy.log("RESPONSE: " + JSON.stringify(response_Front.body))
            cy.log("RESPONSE: " + JSON.stringify(response_Meets.body))

            cy.wrap({response_Front}).as("Response_Front")
            cy.wrap({response_Meets}).as("Response_Meets")
        })
        
    })
});

Then(`should return an Array with wrong Clients`, () => {
    cy.get("@Response_Front").then(when_front => {
        cy.get("@Response_Meets").then(when_meets => {

            for(let i = 0; i < when_front.response_Front.body.length; i++){
                for(let j = 0; j < when_meets.response_Meets.body.length; j++){
                    if(when_front.response_Front.body[i].nome == when_meets.response_Meets.body[j].nome){

                        
                        expect(when_front.response_Front.body[i].nome).to.eq(when_meets.response_Meets.body[j].nome)
                        expect(when_front.response_Front.body[i].cpf).to.eq(when_meets.response_Meets.body[j].cpf)
                        expect(when_front.response_Front.body[i].nascimento).to.eq(when_meets.response_Meets.body[j].nascimento)
                        expect(when_front.response_Front.body[i].email).to.eq(when_meets.response_Meets.body[j].email)
                        expect(when_front.response_Front.body[i].celular).to.eq(when_meets.response_Meets.body[j].celular)
                        expect(when_front.response_Front.body[i].cep).to.eq(when_meets.response_Meets.body[j].cep)
                        expect(when_front.response_Front.body[i].logradouro).to.eq(when_meets.response_Meets.body[j].logradouro)
                        expect(when_front.response_Front.body[i].numero).to.eq(when_meets.response_Meets.body[j].numero)
                        expect(when_front.response_Front.body[i].bairro).to.eq(when_meets.response_Meets.body[j].bairro)
                        expect(when_front.response_Front.body[i].cidade).to.eq(when_meets.response_Meets.body[j].cidade)
                        expect(when_front.response_Front.body[i].pais).to.eq(when_meets.response_Meets.body[j].pais)

                    } 
                }

            }

            
        })
    })
});