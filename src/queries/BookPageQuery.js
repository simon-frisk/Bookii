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
        comment
        date
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
      onfollowingfeed {
        _id
        comment
        date
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
