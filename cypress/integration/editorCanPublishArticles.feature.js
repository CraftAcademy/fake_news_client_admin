describe('Publishing articles', () => {
  beforeEach(() => {
    cy.intercept('GET', 'https://fakest-newzz.herokuapp.com/api/articles', {
      fixture: 'listOfArticles.json',
    });
  });

  describe('Successfully as an editor', () => {
    beforeEach(() => {
      cy.intercept('PUT', 'https://fakest-newzz.herokuapp.com/api/articles/7', {
        message: 'The article has been successfully published',
      });
      cy.visit('/');
      cy.window()
        .its('store')
        .invoke('dispatch', {
          type: 'LOG_IN',
          payload: { fullName: 'Mr. Editor', role: 'editor' },
        });
    });

    it('is expected to display a success message', () => {
      cy.get('[data-cy=action-btn]').first().click();
      cy.get('button').contains('Publish').click();
      cy.get('button').contains('Confirm').click();
      cy.get('[data-cy=popup-message]').should(
        'contain',
        'The article has been successfully published'
      );
    });
  });

  describe('Unsuccessfully when article is already published', () => {
    beforeEach(() => {
      cy.visit('/');
      cy.window()
        .its('store')
        .invoke('dispatch', {
          type: 'LOG_IN',
          payload: { fullName: 'Mr. Editor', role: 'editor' },
        });
    });

    it('is expected to make publish button disabled', () => {
      cy.get('[data-cy=action-btn]').eq(1).click();
      cy.get('button').contains('Publish').should('be.disabled');
    });
  });

  describe('Unsuccessfully as a journalist', () => {
    beforeEach(() => {
      cy.visit('/');
      cy.window()
        .its('store')
        .invoke('dispatch', {
          type: 'LOG_IN',
          payload: { fullName: 'Mr. Fake', role: 'journalist' },
        });
    });

    it('is expected not to be enabled', () => {
      cy.get('[data-cy=edit-article-btn]').should('be.visible');
      cy.get('[data-cy=action-btn]').should('not.exist');
    });
  });
});
