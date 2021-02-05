import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps'
import Union from "../../services/union.service.js"

When(`save Clients with repeated names`, () => {
	Union.post_Union().then(response => {
        cy.log("RESPONSE: " + JSON.stringify(response.body))
        cy.wrap({response}).as("Response")
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
