import gql from 'graphql-tag'

export default gql`
  query BookPage($bookId: String!) {
    book(bookId: $bookId) {
      title
      bookId
      subTitle
      authors
      thumbnail
      description
      pages
      published
      publisher
      wikipediadescription
      isWished
      youtubevideos
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
