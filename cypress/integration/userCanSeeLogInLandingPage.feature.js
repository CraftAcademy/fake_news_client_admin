describe('User can see login landing page', () => {
  beforeEach(() => {
    cy.visit('/');
  })
  
  describe('Successfully', () => {
    it('is expected to show image', () => {
      cy.get('[data-cy=landing-image]').should('exist');
    });
    it('is expected to show login modal', () => {
      cy.get('[data-cy=login-modal]').should('exist');
      cy.get('[data-cy=login-modal]').within(() => {
        cy.get('[data-cy=login-email]').type('user@mail.com');
        cy.get('[data-cy=login-password]').type('password');
        cy.get('[data-cy=login-btn]').click();
      });
    });
  })
  
})