describe('Pet Store API Tests', () => {
    let petId;
  
    it('should add a pet to the store and read it', () => {
      cy.request('POST', 'https://petstore.swagger.io/v2/pet', {
        // Pet data...
      }).then((response) => {
        expect(response.status).to.equal(200);
        expect(response.body).to.have.property('id');
        petId = response.body.id;
  
        // Read the pet by ID
        cy.request('GET', `https://petstore.swagger.io/v2/pet/${petId}`)
          .then((getResponse) => {
            expect(getResponse.status).to.equal(200);
            expect(getResponse.body.id).to.equal(petId);
            // Add more assertions as needed...
          });
      });
    });
  
    it('should update the pet name and status to "sold"', () => {
      cy.request('PUT', 'https://petstore.swagger.io/v2/pet', {
        // Updated pet data...
      }).then((response) => {
        expect(response.status).to.equal(200);
        // Add more assertions as needed...
  
        // Read the modified pet by status
        cy.request('GET', `https://petstore.swagger.io/v2/pet/findByStatus?status=sold`)
          .then((getResponse) => {
            expect(getResponse.status).to.equal(200);
            // Add assertions for the modified pet returned in the response...
          });
      });
    });
  });