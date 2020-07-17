import gql from 'graphql-tag'

export default gql`
  query UserSearch($name: String!) {
    userSearch(name: $name) {
      _id
      name
      profilePicturePath
    }
  }
`
