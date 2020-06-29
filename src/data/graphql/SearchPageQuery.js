import gql from 'graphql-tag'

export default gql`
  query BookSearchPage($query: String!) {
    bookSearch(query: $query) {
      bookId
      title
      subTitle
      authors
      thumbnail
    }
  }
`
