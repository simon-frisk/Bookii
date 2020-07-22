import gql from 'graphql-tag'

export default gql`
  query CategoryPage($name: String!) {
    category(name: $name) {
      name
      icon
      books {
        bookId
        title
        thumbnail
      }
    }
  }
`
