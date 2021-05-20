describe('User can log out', () => {
  beforeEach(() => {
    cy.intercept(
      'POST',
      'https://fakest-newzz.herokuapp.com/api/auth/sign_in',
      {
        fixture: 'handleLogin.json',
      }
    );
    cy.visit('/');
  });
  it('is expected to get redirected back to ')
});
