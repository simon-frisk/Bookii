import gql from 'graphql-tag'

export default gql`
  mutation ToggleInappropriateFlagged($_id: ID!) {
    toggleinappropriateflagged(_id: $_id)
  }
`
