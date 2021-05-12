describe('User can see journalist dashboard', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  describe('successfully', () => {
    cy.get('[data-cy=create-article-btn]').should('exist')
  })
  
})
