describe('list of user articles is updated as soon as Create/Edit modal is closed', () => {
  beforeEach(() => {
    let interceptCount = 0;
    
    cy.intercept('GET', 'http://localhost:3000/api/articles', {
      fixture: 'listOfArticles.json',
    });
    cy.intercept('GET', 'http://localhost:3000/api/auth/validate_token', {
      fixture: 'handleLogin.json',
    });
    cy.intercept('GET', 'http://localhost:3000/api/articles/**', {
      fixture: 'amateurRocketManArticleFixture.json',
    });
  });

  it('is expected to show new title after article is edited', () => {
    cy.visit('/dashboard');
    cy.get('[data-cy=edit-article-btn]').first().click();
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
