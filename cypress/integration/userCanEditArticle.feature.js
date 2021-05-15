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
  });

  describe('Succesfully', () => {
    beforeEach(() => {
      cy.intercept('PUT', 'http://localhost:3000/api/articles/**', {
        message: 'You successfully updated the article',
      });
    });

    it('is expected to show prefilled edit article modal', () => {
      cy.get('[data-cy=edit-article-btn]').first().click();
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

    it.only('is expected to show success message and update article in the list', () => {
      cy.get('[data-cy=edit-article-btn]').first().click();
      cy.get('[data-cy=article-edit-modal]').should('be.visible');
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
      cy.get('body').click('center');
      cy.get('[data-cy=article]')
        .first()
        .within(() => {
          cy.get('[data-cy=title]').should(
            'contain',
            'Amateur rocket man became flat after all'
          );
        });
    });
  });

  describe('Unsuccesfully', () => {
    it('is expected to restrict article submit if any fields are empty', () => {});
    // Do not sent request if field values are the same
  });
});
