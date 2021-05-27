describe('User can edit article', () => {
  beforeEach(() => {
    cy.intercept(
      'GET',
      'https://fakest-newzz.herokuapp.com/api/auth/validate_token',
      {
        fixture: 'handleLogin.json',
      }
    );
    cy.intercept('GET', 'https://fakest-newzz.herokuapp.com/api/articles', {
      fixture: 'listOfArticles.json',
    });
    cy.intercept('GET', 'https://fakest-newzz.herokuapp.com/api/articles/**', {
      fixture: 'amateurRocketManArticleFixture.json',
    });
    cy.visit('/');
    cy.get('[data-cy=edit-article-btn]').first().click();
  });

  describe('Succesfully', () => {
    beforeEach(() => {
      cy.intercept(
        'PUT',
        'https://fakest-newzz.herokuapp.com/api/articles/**',
        {
          message: 'You successfully updated the article',
        }
      );
    });

    it('is expected to show prefilled edit article modal', () => {
      cy.get('[data-cy=article-form]').within(() => {
        cy.get('[data-cy=title]')
          .find('input')
          .should(
            'have.value',
            "Amateur Rocket-Maker Finally Launches Himself Off Earth - Now To Prove It's Flat"
          );
        cy.get('[data-cy=teaser]').should(
          'contain.text',
          'Mike Hughes, a California man who is most known for his belief that the Earth is shaped like a Frisbee'
        );
        cy.get('[data-cy=body]').should(
          'contain.text',
          'The 61-year-old limo driver and daredevil-turned-rocket-maker soared about 1,875'
        );
        cy.get('[data-cy="categories"]')
          .find('[aria-atomic="true"]')
          .should('contain', 'Aliens');
      });
      cy.get('[data-cy=premium]').should('have.class', 'checked');
      cy.get('[data-cy=thumbnail]').should('be.visible');
    });

    it('is expected to show success message', () => {
      cy.get('[data-cy=article-form]').within(() => {
        cy.get('[data-cy=title]')
          .find('input')
          .clear()
          .type('Amateur rocket man became flat after all');
        cy.get('[data-cy=submit-btn]').click();
      });
      cy.get('[data-cy=submit-message]').should(
        'contain',
        'You successfully updated the article'
      );
      cy.wait(1000);
      cy.url().should('contain', '/dashboard');
    });
  });

  describe('Unsuccesfully with invalid params', () => {
    beforeEach(() => {
      cy.intercept(
        'PUT',
        'https://fakest-newzz.herokuapp.com/api/articles/**',
        {
          message: 'You successfully updated the article',
        }
      );
    });
    it('is expected to restrict article submit if any fields are empty', () => {
      cy.get('[data-cy=article-form]').within(() => {
        cy.get('[data-cy=title]').find('input').clear();
        cy.get('[data-cy=submit-btn]').click();
        cy.get('input:invalid').should('have.length', 1);
        cy.get('[data-cy=title]')
          .find('input')
          .then(($input) => {
            expect($input[0].validationMessage).to.eq(
              'Please fill out this field.'
            );
          });
      });
    });
    it('it expected to close the modal but not send a request if field values are unchanged', () => {
      cy.get('[data-cy=article-form]').within(() => {
        cy.get('[data-cy=submit-btn]').click();
      });
      cy.get('[data-cy=article-edit-modal]').should('not.exist');
      cy.get('[data-cy=popup-message]').should('not.exist');
    });
  });

  describe('Unsuccesfully identical data', () => {
    beforeEach(() => {
      cy.intercept(
        'PUT',
        'https://fakest-newzz.herokuapp.com/api/articles/**',
        {
          message: 'You successfully updated the article',
        }
      );
    });
    it('is expected to show an error message if the article is identical to the original', () => {
      cy.get('[data-cy=article-form]').within(() => {
        cy.get('[data-cy=submit-btn]').click();
      });
      cy.get('[data-cy=popup-message]').should(
        'contain',
        'You might want to change something in the article!'
      );
    });
  });
});
