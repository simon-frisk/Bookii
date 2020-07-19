import gql from 'graphql-tag'

export default gql`
  query UpdateFeedBookPage($_id: ID!) {
    user {
      _id
      feedBooks(_id: $_id) {
        _id
        bookId
        comment
        date
        favorite
        book {
          title
        }
      }
    }
  }
`
