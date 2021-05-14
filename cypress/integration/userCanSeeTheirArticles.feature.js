describe('User can see their articles', () => {
  beforeEach(() => {
    cy.visit('/dashboard');
  });

  describe('Successfully', () => {
    beforeEach(() => {
      cy.intercept(
        'GET',
        'https://fake-newzzzz.herokuapp.com/api/articles',
        {
          fixture: 'listOfArticles.json',
        }
      );
    })
  })
})