import gql from 'graphql-tag'

export default gql`
  query PeoplePageQuery {
    users {
      _id
      name
      profilePicturePath
    }
    feed {
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
