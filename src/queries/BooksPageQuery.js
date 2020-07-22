import gql from 'graphql-tag'

export default gql`
  query BookLists {
    bestSellerLists {
      name
      icon
    }
    categories {
      name
      icon
    }
  }
`
