import { useActionSheet } from '@expo/react-native-action-sheet'
import useStyles from '../../util/useStyles'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'

const mutation = gql`
  mutation ToggleInappropriateFlagged($_id: ID!) {
    toggleinappropriateflagged(_id: $_id) {
      _id
      isinappropriateflagged
    }
  }
`

export default (_id, isFlagged) => {
  const { showActionSheetWithOptions } = useActionSheet()
  const { theme } = useStyles()
  const [callMutation] = useMutation(mutation, {
    variables: { _id },
  })

  function showReportActionSheet() {
    showActionSheetWithOptions(
      {
        title: 'Report user',
        message: isFlagged
          ? ' You have reported this user for inappropriate content.'
          : 'You can report this user for inappropriate content if this user has posted something objectionable. The user will then be reviewed and necessary actions will be taken.',
        tintColor: theme.current.complement,
        options: [isFlagged ? 'Remove report' : 'Report user', 'Cancel'],
        cancelButtonIndex: 1,
      },
      buttonIndex => {
        if (buttonIndex === 0) callMutation()
      }
    )
  }

  return showReportActionSheet
}
