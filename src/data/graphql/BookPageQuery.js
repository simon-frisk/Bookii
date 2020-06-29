import gql from 'graphql-tag'

export default gql`
  query BookPage($bookId: String!) {
    book(bookId: $bookId) {
      title
      bookId
      subTitle
      authors
      thumbnail
      pages
      published
      publisher
      wikipediadescription
      isWished
      onselffeed {
        _id
        date
        comment
        book {
          bookId
          title
          thumbnail
        }
      }
      onfollowingfeed {
        _id
        date
        comment
        book {
          bookId
          title
          thumbnail
        }
        user {
          name
          profilePicturePath
          _id
        }
      }
    }
  }
`
