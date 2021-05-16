describe('User can edit article', () => {
  beforeEach(() => {
    cy.intercept('GET', 'http://localhost:3000/api/auth/validate_token', {
      fixture: 'handleLogin.json',
    });
    cy.intercept('GET', 'http://localhost:3000/api/articles', {
      fixture: 'listOfArticles.json',
    });
    cy.intercept('GET', 'http://localhost:3000/api/articles/**', {
      fixture: 'amateurRocketManArticleFixture.json',
    });
    cy.visit('/');
    cy.get('[data-cy=edit-article-btn]').first().click();
  });

  describe('Succesfully', () => {
    beforeEach(() => {
      cy.intercept('PUT', 'http://localhost:3000/api/articles/**', {
        message: 'You successfully updated the article',
      });
    });

    it('is expected to show prefilled edit article modal', () => {
      cy.get('[data-cy=article-edit-modal]').should('be.visible');
      cy.get('[data-cy=article-edit-form]').within(() => {
        cy.get('[data-cy=title]')
          .find('input')
          .should(
            'have.value',
            "Amateur Rocket-Maker Finally Launches Himself Off Earth - Now To Prove It's Flat"
          );
        cy.get('[data-cy=teaser]').should(
          'contain.text',
          'Mike Hughes, a California man who is most known for'
        );
        cy.get('[data-cy=body]').should(
          'contain.text',
          'Science gets a lot of respect these days'
        );
        cy.get('[data-cy="categories"]')
          .find('[aria-atomic="true"]')
          .should('contain', 'Aliens');
      });
    });

    it('is expected to show success message', () => {
      cy.get('[data-cy=article-edit-form]').within(() => {
        cy.get('[data-cy=title]')
          .clear()
          .type('Amateur rocket man became flat after all');
        cy.get('[data-cy=submit-btn]').click();
      });
      cy.get('[data-cy=popup-message]').should(
        'contain',
        'You successfully updated the article'
      );
    });
  });

  describe('Unsuccesfully', () => {
    beforeEach(() => {
      cy.intercept('PUT', 'http://localhost:3000/api/articles/**', {
        message: 'You successfully updated the article',
      });
    });
    it('is expected to restrict article submit if any fields are empty', () => {
      cy.get('[data-cy=article-edit-form]').within(() => {
        cy.get('[data-cy=title]').clear();
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
      cy.get('[data-cy=article-edit-form]').within(() => {
        cy.get('[data-cy=submit-btn]').click();
      });
      cy.get('[data-cy=article-edit-modal]').should('not.exist');
      cy.get('[data-cy=popup-message]').should('not.exist');
    });
  });
});
