import gql from 'graphql-tag'

export default gql`
  query UserPage($_id: ID) {
    user(_id: $_id) {
      _id
      name
      profilePicturePath
      isinappropriateflagged
      followers {
        _id
      }
      wishBooks {
        title
        thumbnail
        bookId
      }
      feedBooks {
        _id
        comment
        date
        favorite
        user {
          _id
          name
          profilePicturePath
        }
        comments {
          _id
          user {
            profilePicturePath
            _id
            name
          }
          comment
        }
        book {
          bookId
          thumbnail
          title
        }
      }
    }
  }
`
