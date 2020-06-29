import gql from 'graphql-tag'

export default gql`
  query UserPage($_id: ID) {
    user(_id: $_id) {
      _id
      name
      profilePicturePath
      followers {
        _id
      }
      feedBooks {
        _id
        bookId
        comment
        date
        favorite
        book {
          thumbnail
          title
          bookId
        }
      }
    }
  }
`
