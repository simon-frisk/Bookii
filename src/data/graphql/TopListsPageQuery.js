import gql from 'graphql-tag'

export default gql`
  query TopList {
    nytimesBestSellers {
      name
      books {
        bookId
        title
        subTitle
        authors
        thumbnail
      }
    }
  }
`
