describe('User can create article', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  describe('successfully', () => {
    it('can fill the article creation form and submit', () => {
      cy.get('[data-cy=create-article-btn]').click()
      cy.get('[data-cy=article-creation-modal]').should('be.visible')
      cy.get('[data-cy=article-creation-form]').within(() => {
        cy.get('[data-cy=title]').type('Title')
        cy.get('[data-cy=teaser]').type('CIA is spying on you')
        cy.get('[data-cy=body]').type('No for real! Get a tinfoil hat quick!')
        cy.get('[data-cy=categories]').click();
        cy.get('.item').contains('Flat Earth').click()
        cy.get(['data-cy=submit-btn']).click()
      })
      cy.get('[data-cy=article-creation-modal]').should('not.be.visible')
    });
  })  
})
