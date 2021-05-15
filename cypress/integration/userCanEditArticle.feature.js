describe('', () => {
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
    it('is expected to show prefilled edit article modal', () => {
      cy.get('[data-cy=edit-btn]').first().click();
      cy.get('[data-cy=article-edit-modal]').should('be.visible');
      cy.get('[data-cy=article-edit-form]').within(() => {
        cy.get('[data-cy=title]').should(
          'include',
          'Amateur Rocket-Maker Finally Launches Himself'
        );
        cy.get('[data-cy=teaser]').should(
          'include',
          'Mike Hughes, a California man'
        );
        cy.get('[data-cy=body]').should(
          'include',
          'Science gets a lot of respect these days.'
        );
        cy.get('[data-cy=categories]').should('contain', 'Aliens');
      });
    });

    it('is expected to show success message and update article in the list', () => {
      cy.get('[data-cy=edit-btn]').first().click();
      cy.get('[data-cy=article-edit-modal]').should('be.visible');
      cy.get('[data-cy=article-edit-form]').within(() => {
        cy.get('[data-cy=title]').type(
          'Amateur rocket man became flat after all'
        );
        cy.get('[data-cy=submit.btn]').click();
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
