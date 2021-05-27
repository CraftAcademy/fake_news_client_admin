describe('Editor can get an overview of company statistics', () => {
  beforeEach(() => {
    cy.intercept('GET', 'https://fakest-newzz.herokuapp.com/api/statistics', {
      fixture: 'statisticsResponse.json',
    });
    cy.visit('/');
    cy.window()
      .its('store')
      .invoke('dispatch', {
        type: 'LOG_IN',
        payload: { fullName: 'Mr. Editor', role: 'editor' },
      });
    cy.get(['data-cy=admin-overiew']).click();
  });

  describe('successfully as an editor view the company statistics overview ', () => {
    cy.get('[data-cy=company-stats]')
      .first()
      .find('[data-cy=amount]')
      .should('contain', 26);
    cy.get('[data-cy=company-stats]')
      .eq(1)
      .find('[data-cy=amount]')
      .should('contain', 10);
    cy.get('[data-cy=company-stats]')
      .eq(2)
      .find('[data-cy=amount]')
      .should('contain', 4);
  });
});
