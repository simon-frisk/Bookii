import gql from 'graphql-tag'

export default gql`
  query PeoplePageQuery($after: ID) {
    recommendedUsers {
      _id
      name
      profilePicturePath
    }
    user {
      following {
        _id
        name
        profilePicturePath
      }
    }
    feed(after: $after) {
      _id
      comment
      date
      user {
        _id
        name
        profilePicturePath
      }
      book {
        bookId
        thumbnail
        title
      }
    }
  }
`
