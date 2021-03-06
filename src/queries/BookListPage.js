import gql from 'graphql-tag'

export default gql`
  query BookListPage($name: String!) {
    bookList(name: $name) {
      name
      icon
      books {
        title
        thumbnail
        bookId
      }
    }
  }
`
