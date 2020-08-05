import gql from 'graphql-tag'

export default gql`
  query BookPage($bookId: String!) {
    book(bookId: $bookId) {
      title
      bookId
      subtitle
      authors
      thumbnail
      pages
      published
      description
      wikipediadescription
      isWished
      youtubevideos
      categories {
        name
        icon
      }
      onselffeed {
        _id
        date
        comment
        user {
          name
          profilePicturePath
          _id
        }
      }
      onfollowingfeed {
        _id
        date
        comment
        user {
          name
          profilePicturePath
          _id
        }
      }
    }
  }
`
