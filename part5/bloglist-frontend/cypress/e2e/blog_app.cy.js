describe('Blog app', () => {
  beforeEach(function () {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    const user = {
      username: 'Sisu',
      name: 'Sisu Ojve',
      password: 'qwerty',
    }
    cy.createUser(user)
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
      cy.contains('log in').click()
      cy.get('#username').type('Sisu')
      cy.get('#password').type('qwerty')
      cy.get('#login-btn').click()
    })

    it('A blog can be created', function () {
      cy.contains('Create').click()
      cy.get('#title').type('My Test title')
      cy.get('#author').type('A secret test user')
      cy.get('#url').type('www.agroundtest.com')
      cy.get('#createBlog').click()

      cy.contains('A new blog My Test title by A secret test user added')
    })

    describe('blog manipulations', function () {
      beforeEach(function () {
        cy.contains('Create').click()
        cy.get('#title').type('My Test title')
        cy.get('#author').type('A secret test user')
        cy.get('#url').type('www.agroundtest.com')
        cy.get('#createBlog').click()
      })

      it('A new blog can be liked', function () {
        cy.contains('Show').click()
        cy.get('#like').click()

        cy.contains('Likes: 1')
      })

      it('A blog can be deleted by the user', function () {
        cy.contains('Show').click()
        cy.get('#removeBlog').click()
      })

      it('Only the blog`s author can see remove button', function () {
        cy.get('#logout').click()
        cy.createUser({ username: 'Mr.Test', name: 'Adolfo', password: '12345' })
        cy.contains('log in').click()
        cy.get('#username').type('Mr.Test')
        cy.get('#password').type('12345')
        cy.get('#login-btn').click()

        cy.contains('Show').click()

        cy.get('.blog').should('not.contain', 'remove')
      })
    })
  })
})
