import * as React from 'react'
import {Props} from './standard-screen'
import {NativeScrollView} from './native-wrappers.native'
import HeaderHoc from './header-hoc'
import * as Styles from '../styles'
import Box from './box'
import Text from './text'

const Kb = {
  Box,
  NativeScrollView,
  Text,
}

const StandardScreen = (props: Props) => {
  return (
    // @ts-ignore for now
    <Kb.NativeScrollView scrollEnabled={props.scrollEnabled}>
      {!!props.notification && (
        <Kb.Box
          style={Styles.collapseStyles([
            styles.banner,
            props.notification.type === 'error' && styles.bannerError,
            props.styleBanner,
          ])}
        >
          {typeof props.notification.message === 'string' ? (
            <Kb.Text center={true} style={styles.bannerText} type="BodySmallSemibold">
              {props.notification.message}
            </Kb.Text>
          ) : (
            props.notification.message
          )}
        </Kb.Box>
      )}
      <Kb.Box
        style={Styles.collapseStyles([
          styles.content,
          !!props.notification && styles.contentMargin,
          props.style,
        ])}
      >
        {props.children}
      </Kb.Box>
    </Kb.NativeScrollView>
  )
}

const MIN_BANNER_HEIGHT = 40
const styles = Styles.styleSheetCreate({
  banner: Styles.platformStyles({
    common: {
      ...Styles.globalStyles.flexBoxColumn,
      alignItems: 'center',
      backgroundColor: Styles.globalColors.green,
      justifyContent: 'center',
      marginBottom: Styles.globalMargins.tiny,
      minHeight: MIN_BANNER_HEIGHT,
      paddingLeft: Styles.globalMargins.tiny,
      paddingRight: Styles.globalMargins.tiny,
    },
    isElectron: {
      paddingBottom: Styles.globalMargins.xtiny,
      paddingTop: Styles.globalMargins.xtiny,
    },
    isMobile: {
      paddingBottom: Styles.globalMargins.tiny,
      paddingTop: Styles.globalMargins.tiny,
    },
  }),
  bannerError: {backgroundColor: Styles.globalColors.red},
  bannerText: {color: Styles.globalColors.white},
  container: {
    ...Styles.globalStyles.flexBoxColumn,
    backgroundColor: Styles.globalColors.white,
    flexGrow: 1,
  },
  content: {
    ...Styles.globalStyles.flexBoxColumn,
    alignItems: 'stretch',
    paddingLeft: Styles.globalMargins.medium,
    paddingRight: Styles.globalMargins.medium,
  },
  contentMargin: {marginTop: MIN_BANNER_HEIGHT},
})

export default HeaderHoc(StandardScreen)
