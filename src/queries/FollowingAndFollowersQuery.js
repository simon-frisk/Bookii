import gql from 'graphql-tag'

export default gql`
  query UserFollowingAndFollowers {
    user {
      _id
      name
      email
      profilePicturePath
      following {
        _id
        name
        profilePicturePath
      }
      followers {
        _id
        name
        profilePicturePath
      }
    }
  }
`
