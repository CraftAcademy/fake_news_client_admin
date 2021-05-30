describe('Can create a new journalist', () => {
  beforeEach(() => {
    cy.intercept('GET', 'https://fakest-newzz.herokuapp.com/api/articles', {
      fixture: 'listOfArticles.json',
    });
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
      cy.intercept('POST', 'https://fakest-newzz.herokuapp.com/api/auth', {
        fixture: 'newRegistrationForJournalist.json',
      });
    });
    it('is expected to', () => {
      cy.get('[data-cy=registration-form]').within(() => {
        cy.get('[data-cy=first-name]').type('New');
        cy.get('[data-cy=last-name]').type('Guy');
        cy.get('[data-cy=username]').type('newguy@fakenews.com');
        cy.get('[data-cy=password]').type('password');
        cy.get('[data-cy=password-confirmation]').type('password');
        cy.get('[data-cy=submit-btn]').click();
      });
      cy.get('[data-cy=message]').should(
        'contain',
        'New Guy has successfully been registered as a new journalist'
      );
    });
  });

  describe('unsuccessfully with faulty input', () => {
    beforeEach(() => {});
    it('is expected to', () => {});
  });

  describe('unsuccessfully as another journalist', () => {
    beforeEach(() => {});
    it('is expected to', () => {});
  });
});
