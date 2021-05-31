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
      cy.get('[data-cy=admin-dashboard]').click();
    });
    it('is expected to display a success message containing the new journalist\'s name', () => {
      cy.get('[data-cy=registration-form]').within(() => {
        cy.get('[data-cy=first-name]').type('New');
        cy.get('[data-cy=last-name]').type('Guy');
        cy.get('[data-cy=email]').type('newguy@fakenews.com');
        cy.get('[data-cy=password]').type('password');
        cy.get('[data-cy=password-confirmation]').type('password');
        cy.get('[data-cy=submit-btn]').click();
      });
      cy.get('[data-cy=popup-message]').should(
        'contain',
        'New Guy has successfully been registered as a new journalist'
      );
    });
  });

  describe('unsuccessfully with faulty input', () => {
    beforeEach(() => {
      cy.intercept('POST', 'https://fakest-newzz.herokuapp.com/api/auth', {
        statusCode: 422,
        body: { errors: ['Invalid credentials. Try again'] },
      });
      cy.get('[data-cy=admin-dashboard]').click();
    });
    it('is expected to show an error message', () => {
      cy.get('[data-cy=registration-form]').within(() => {
        cy.get('[data-cy=first-name]').type('New');
        cy.get('[data-cy=last-name]').type('Guy');
        cy.get('[data-cy=email]').type('newguy@fakenews.com');
        cy.get('[data-cy=password]').type('password');
        cy.get('[data-cy=password-confirmation]').type('not password');
        cy.get('[data-cy=submit-btn]').click();
      });
      cy.get('[data-cy=popup-message]').should(
        'contain',
        'Invalid credentials. Try again'
      );
    });
  });

  describe('unsuccessfully as another journalist', () => {
    beforeEach(() => {
      cy.window()
        .its('store')
        .invoke('dispatch', {
          type: 'LOG_IN',
          payload: { fullName: 'Mr. Journalist', role: 'journalist' },
        });
    });
    it('is expected to not be able to see the admin button', () => {
      cy.get('[data-cy=admin-dashboard]').should('not.exist');
    });
  });
});
