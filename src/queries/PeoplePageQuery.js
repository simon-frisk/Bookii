import gql from 'graphql-tag'

export default gql`
  query PeoplePageQuery($after: ID) {
    users {
      _id
      name
      profilePicturePath
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
