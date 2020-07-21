import gql from 'graphql-tag'

export default gql`
  query BookListPage($name: String!) {
    bookList(name: $name) {
      name
      books {
        title
        thumbnail
        bookId
      }
    }
  }
`
