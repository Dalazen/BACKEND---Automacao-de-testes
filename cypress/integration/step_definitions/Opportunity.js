import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps'
import Opportunity from "../../services/opportunity.service.js"

var Response_Meets, Response_Front

//get_Meets_Opportunities

When(`request all Meets registered Opportunities`, () => {
	Opportunity.get_Meets_Opportunities().then(response => {
		cy.log("RESPONSE: " + JSON.stringify(response.body))
        cy.wrap({response}).as("Response")
        Response_Meets = response
	})
});

Then(`should return the response {string} status {int}`, (schema, status) => {
	cy.get("@Response").then(when => {
         var n = 0
        while (when.response.body[n]) {
            cy.validateSchema(when.response.body[n], `${schema}/${status}`)
            n++
        } 
        expect(when.response.status).to.equal(status)
    })
});

Then(`should return a non-null body`, () => {
	cy.get("@Response").then(when => {
        expect(when.response.body).to.not.be.null
    })
});

//get_Frontend_Opportunities

When(`request all Front-end registered Opportunities`, () => {
	Opportunity.get_Frontend_Opportunities().then(response => {
		cy.log("RESPONSE: " + JSON.stringify(response.body))
        cy.wrap({response}).as("Response")
        Response_Front = response
	})
});

Then(`should return the response {string} status {int}`, (schema, status) => {
	cy.get("@Response").then(when => {
        var n = 0
        while (when.response.body[n]) {
            cy.validateSchema(when.response.body[n], `${schema}/${status}`)
            n++
        }
        expect(when.response.status).to.equal(status)
    })
});

Then(`should return a non-null body`, () => {
	cy.get("@Response").then(when => {
        expect(when.response.body).to.not.be.null
    })
});

//@get_Compare_Oportunity

When(`request to compare the registered opportunities`, () => {
    Opportunity.get_Frontend_Opportunities().then(response_Front => {
        Opportunity.get_Meets_Opportunities().then(response_Meets => {
            cy.log("RESPONSE: " + JSON.stringify(response_Front.body))
            cy.log("RESPONSE: " + JSON.stringify(response_Meets.body))

            cy.wrap({response_Front}).as("Response_Front")
            cy.wrap({response_Meets}).as("Response_Meets")
        })
        
    })
});

Then(`should return the correct data`, () => {
	cy.get("@Response_Front").then(when_front => {
        cy.get("@Response_Meets").then(when_meets => {

            for(let i = 0; i < when_front.response_Front.body.length; i++){
                for(let j = 0; j < when_meets.response_Meets.body.length; j++){
                    if(when_front.response_Front.body[i].nome == when_meets.response_Meets.body[j].nome){

                        expect(when_front.response_Front.body[i].nome).to.eq(when_meets.response_Meets.body[j].nome)
                        expect(when_front.response_Front.body[i].tipo_pessoa).to.eq(when_meets.response_Meets.body[j].tipo_pessoa)
                        expect(when_front.response_Front.body[i].cpf_cnpj).to.eq(when_meets.response_Meets.body[j].cpf_cnpj)
                        expect(when_front.response_Front.body[i].celular).to.eq(when_meets.response_Meets.body[j].celular)
                        expect(when_front.response_Front.body[i].email).to.eq(when_meets.response_Meets.body[j].email)
                        expect(when_front.response_Front.body[i].telefone).to.eq(when_meets.response_Meets.body[j].telefone)
                        expect(when_front.response_Front.body[i].area).to.eq(when_meets.response_Meets.body[j].area)
                        expect(when_front.response_Front.body[i].origem).to.eq(when_meets.response_Meets.body[j].origem)
                        expect(when_front.response_Front.body[i].cidade).to.eq(when_meets.response_Meets.body[j].cidade)
                        expect(when_front.response_Front.body[i].uf).to.eq(when_meets.response_Meets.body[j].uf)
                        expect(when_front.response_Front.body[i].status).to.eq(when_meets.response_Meets.body[j].status)
                        expect(when_front.response_Front.body[i].responsavel).to.eq(when_meets.response_Meets.body[j].responsavel)
                        expect(when_front.response_Front.body[i].equipe).to.eq(when_meets.response_Meets.body[j].equipe)
                        expect(when_front.response_Front.body[i].valor).to.eq(when_meets.response_Meets.body[j].valor)
                        expect(when_front.response_Front.body[i].descricao).to.eq(when_meets.response_Meets.body[j].descricao)
                        expect(when_front.response_Front.body[i].etapa).to.eq(when_meets.response_Meets.body[j].etapa)
                        expect(when_front.response_Front.body[i].contato_nome).to.eq(when_meets.response_Meets.body[j].contato_nome)
                        expect(when_front.response_Front.body[i].contato_cargo).to.eq(when_meets.response_Meets.body[j].contato_cargo)
                        expect(when_front.response_Front.body[i].contato_email).to.eq(when_meets.response_Meets.body[j].contato_email)
                        expect(when_front.response_Front.body[i].contato_telefone).to.eq(when_meets.response_Meets.body[j].contato_telefone)
                        expect(when_front.response_Front.body[i].contato_celular).to.eq(when_meets.response_Meets.body[j].contato_celular)




                    }
                }

            }

            
        })
    })
});
