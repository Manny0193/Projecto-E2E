describe('Pet Store API Tests', () => {
  let petId;

  it('should add a pet to the store and read it', () => {
    const petData = {
      id: 1,
      category: {
        id: 0,
        name: 'Perro'
      },
      name: 'Dobbie',
      photoUrls: [
        'string'
      ],
      tags: [
        {
          id: 0,
          name: 'string'
        }
      ],
      status: 'available'
    }
    
    cy.request('POST', 'https://petstore.swagger.io/v2/pet', petData)
      .then((response) => {
        expect(response.status).to.equal(200);
        expect(response.body).to.have.property('id');
        const petId = response.body.id;

        // Read the pet by ID
        cy.request('GET', `https://petstore.swagger.io/v2/pet/${petId}`)
          .then((getResponse) => {
            expect(getResponse.status).to.equal(200);
            expect(getResponse.body.id).to.equal(petData.id);
            expect(response.body.name).to.equal(petData.name);
            expect(response.body.status).to.equal(petData.status);

          });
      });
  });

  it('should update the pet name and status to "sold"', () => {
    const updatedPetdata = {
          id: 1,
          category: {
            id: 0,
            name: 'string'
          },
          name: 'cachorro',
          photoUrls: [
            'string'
          ],
          tags: [
            {
              id: 0,
              name: 'string'
            }
          ],
          status: 'sold'
    }

    cy.request('PUT', 'https://petstore.swagger.io/v2/pet', updatedPetdata)
      .then((response) => {
        expect(response.status).to.equal(200);
        expect(response.body.id).to.equal(updatedPetdata.id)
        expect(response.body.status).to.equal(updatedPetdata.status)

      cy.request('GET', `https://petstore.swagger.io/v2/pet/findByStatus?status=sold`)
        .then((getResponse) => {
          expect(getResponse.status).to.equal(200);

          cy.wrap(getResponse.body).each((pet)=> {
              if(pet.name === updatedPetdata.name){
                expect(pet.name).to.equal(updatedPetdata.name)
              }
          })
        });
      });
  });

});