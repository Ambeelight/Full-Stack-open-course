describe('Blog app', () => {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      username: 'Sisu',
      name: 'Sisu Ojve',
      password: 'qwerty',
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.visit('http://localhost:5173')
  })

  it('login form is shown', () => {
    cy.contains('log in').click()
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.contains('log in').click()
      cy.get('#username').type('Sisu')
      cy.get('#password').type('qwerty')
      cy.get('#login-btn').click()

      cy.contains('Sisu Ojve logged in')
    })

    it('fails with wrong credentials', function () {
      cy.contains('log in').click()
      cy.get('#username').type('awawa')
      cy.get('#password').type('weewee')
      cy.get('#login-btn').click()

      cy.contains('Wrong username or password').and('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      // log in user here
    })

    it('A blog can be created', function () {
      // ...
    })
  })
})
