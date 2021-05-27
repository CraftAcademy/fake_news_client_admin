describe('Can get an overview of company statistics', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.window()
      .its('store')
      .invoke('dispatch', {
        type: 'LOG_IN',
        payload: { fullName: 'Mr. Editor', role: 'editor' },
      });
   
  });

  describe('successfully as an editor', () => {
    beforeEach(() => {
      cy.intercept('GET', 'https://fakest-newzz.herokuapp.com/api/statistics', {
        fixture: 'statisticsResponse.json',
      });
      cy.get('[data-cy=editor-overiew]').click();
    });
    it('to view the company statistics overview', () => {
      cy.url().should('contain', '/overview');
      cy.get('[data-cy=company-stats]')
        .first()
        .find('[data-cy=amount]')
        .should('contain', 26);
      cy.get('[data-cy=company-stats]')
        .eq(1)
        .find('[data-cy=amount]')
        .should('contain', 7);
      cy.get('[data-cy=company-stats]')
        .eq(2)
        .find('[data-cy=amount]')
        .should('contain', 4);
      cy.get('[data-cy=company-stats]')
        .eq(3)
        .find('[data-cy=amount]')
        .should('contain', 10);
      cy.get('[data-cy=company-stats]')
        .eq(4)
        .find('[data-cy=amount]')
        .should('contain', 1170);
    });

    it('view graph summary of company statistics', () => {
      cy.get('[data-cy=articles-graph]').should('be.visible');
      cy.get('[data-cy=subscribers-graph]').should('be.visible');
    });
  });

  describe('unsuccessfully as when Stripe API does not respond', () => {
    beforeEach(() => {
      cy.intercept('GET', 'https://fakest-newzz.herokuapp.com/api/statistics', {
        fixture: 'stripeErrorResponse.json',
        statusCode: 401,
      });
      cy.get('[data-cy=editor-overiew]').click();
    });
    it('is expected to still show only local data', () => {
      cy.get('[data-cy=company-stats]')
        .first()
        .find('[data-cy=amount]')
        .should('contain', 26);
    });
    it('is expected to also show an error message', () => {
      cy.get('[data-cy=popup-message]').should(
        'contain',
        'Stripe servers are currently not responding, please try again later'
      );
    });
  });
});
