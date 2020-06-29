import gql from 'graphql-tag'

export default gql`
  query PeoplePage {
    users {
      _id
      name
      profilePicturePath
    }
  }
`
