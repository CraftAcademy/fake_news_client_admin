describe('editor can publish articles', () => {
  beforeEach(() => {
    cy.intercept('GET', 'https://fakest-newzz.herokuapp.com/api/articles', {
      fixture: 'listOfArticles.json',
    });
  });

  describe('Successfully as an editor', () => {
    before(() => {
      cy.visit('/');
      cy.window()
        .its('store')
        .invoke('dispatch', {
          type: 'LOG_IN',
          payload: { fullName: 'Mr. Editor', role: 'editor' },
        });
    });

    it('is expected to show edit button in dashboard', () => {
      cy.get('[data-cy=action-btn]').first().click();
      cy.get('[data-cy=confirm-modal]').within(() => {
        cy.get('[data-cy=confirm]').click();
      });
      cy.get('[data-cy=popup-message]').should(
        'contain',
        'The article has successfully been published'
      );
    });
  });

  describe('Unsuccessfully because article is already published', () => {
    before(() => {
      cy.visit('/');
      cy.window()
        .its('store')
        .invoke('dispatch', {
          type: 'LOG_IN',
          payload: { fullName: 'Mr. Editor', role: 'editor' },
        });
    });

    it('is expected to not be able to click the button', () => {
      cy.get('[data-cy=action-btn]').eq(1).should('be.disabled');
      cy.get('[data-cy=action-btn]').eq(1).click();
      cy.get('[data-cy=confirm-modal]').should('not.exist');
    });
  });

  describe('Unsuccessfully as a journalist', () => {
    before(() => {
      cy.visit('/');
      cy.window()
        .its('store')
        .invoke('dispatch', {
          type: 'LOG_IN',
          payload: { fullName: 'Mr. Fake', role: 'journalist' },
        });
    });

    it('is expected to not be able to click the button', () => {
      cy.get('[data-cy=publish-btn]').should('not.exist');
    });
  });
});
