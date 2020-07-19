import gql from 'graphql-tag'

export default gql`
  query BookLists {
    bookLists {
      name
      books {
        bookId
        thumbnail
      }
    }
  }
`
