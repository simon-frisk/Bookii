import gql from 'graphql-tag'

export default gql`
  query ForgotPassword($email: String!) {
    forgotpassword(email: $email)
  }
`
