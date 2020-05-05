import React from 'react'
import { FlatList, View, Button, ActivityIndicator, Image } from 'react-native'
import { useQuery } from '@apollo/react-hooks'
import { useNavigation } from '@react-navigation/native'
import Styles from '../util/Styles'
import Center from '../components/Center'
import ApolloErrorText from '../components/ApolloErrorText'
import Typography from '../components/Typography'
import FeedBookCard from '../components/FeedBookCard'
import ProfilePictureCircle from '../components/ProfilePictureCircle'
import gql from 'graphql-tag'

export const UserPage = gql`
  query UserPage {
    user {
      _id
      name
      profilePicturePath
      feedBooks {
        _id
        bookId
        comment
        date
        book {
          thumbnail
          title
          bookId
        }
      }
    }
  }
`

export default () => {
  const { data, loading, error } = useQuery(UserPage)
  const navigation = useNavigation()

  const Header = () => (
    <View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <ProfilePictureCircle
          profilePicturePath={data.user.profilePicturePath}
          size={75}
        />
        <View style={{ marginRight: 40 }}>
          <Typography size='h1'>{data.user.name}</Typography>
          <Button
            title='Settings'
            onPress={() => {
              navigation.navigate('userSettings')
            }}
          />
        </View>
      </View>
      <Typography size='h1' style={{ marginTop: 40 }}>
        My Feed
      </Typography>
    </View>
  )

  if (loading)
    return (
      <Center>
        <ActivityIndicator />
      </Center>
    )

  if (error)
    return (
      <Center>
        <ApolloErrorText error={error} />
      </Center>
    )

  if (data)
    return (
      <FlatList
        data={data.user.feedBooks.map(feedBook => feedBook)}
        keyExtractor={({ book: { bookId } }, index) => index + bookId}
        contentContainerStyle={Styles.pageContainer}
        ListHeaderComponent={Header}
        ListEmptyComponent={() => (
          <Center>
            <Typography>No books on feed yet!</Typography>
          </Center>
        )}
        renderItem={({ item: feedBook }) => (
          <FeedBookCard
            _id={feedBook._id}
            bookId={feedBook.book.bookId}
            thumbnail={feedBook.book.thumbnail}
            title={feedBook.book.title}
            name={data.user.name}
            profilePicturePath={data.user.profilePicturePath}
            comment={feedBook.comment}
            date={feedBook.date}
          />
        )}
      />
    )
}
