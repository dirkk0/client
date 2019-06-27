import * as React from 'react'
import {Box, Button, Text} from '../../../common-adapters'
import {globalStyles, globalColors, globalMargins} from '../../../styles'
import {intersperseFn} from '../../../util/arrays'

export type BrokenTrackerProps = {
  users: Array<string>
  onClick: (user: string) => void
}

export type InviteProps = {
  inviteEnabled: boolean
  onShareClick: (email: string) => void
  users: Array<string>
}

const commonBannerStyle = {
  ...globalStyles.flexBoxColumn,
  alignItems: 'center',
  backgroundColor: globalColors.red,
  flexWrap: 'wrap',
  justifyContent: 'center',
  paddingBottom: 8,
  paddingLeft: 24,
  paddingRight: 24,
  paddingTop: 8,
}

const BannerBox = (props: {children: React.ReactNode; color: string}) => (
  <Box style={{...commonBannerStyle, backgroundColor: props.color}}>{props.children}</Box>
)

const BannerText = props => <Text center={true} type="BodySmallSemibold" negative={true} {...props} />

function brokenSeparator(idx, item, arr) {
  if (idx === arr.length) {
    return null
  } else if (idx === arr.length - 1) {
    return (
      <BannerText key={idx}>
        {arr.length === 1 ? '' : ','}
        &nbsp;and&nbsp;
      </BannerText>
    )
  } else {
    return <BannerText key={idx}>,&nbsp;</BannerText>
  }
}

const BrokenTrackerBanner = ({users, onClick}: BrokenTrackerProps) =>
  users.length === 1 ? (
    <BannerBox color={globalColors.red}>
      <BannerText>
        <BannerText>Some of&nbsp;</BannerText>
        <BannerText type="BodySmallSemiboldPrimaryLink" onClick={() => onClick(users[0])}>
          {users[0]}
        </BannerText>
        <BannerText>'s proofs have changed since you last followed them.</BannerText>
      </BannerText>
    </BannerBox>
  ) : (
    <BannerBox color={globalColors.red}>
      <BannerText>
        {intersperseFn(
          brokenSeparator,
          users.map((user, idx) => (
            <BannerText type="BodySmallSemiboldPrimaryLink" key={user} onClick={() => onClick(user)}>
              {user}
            </BannerText>
          ))
        )}
        <BannerText>&nbsp;have changed their proofs since you last followed them.</BannerText>
      </BannerText>
    </BannerBox>
  )

const InviteBanner = ({users, inviteEnabled, onShareClick}: InviteProps) =>
  inviteEnabled && users.length === 1 && users[0].endsWith('@phone') ? (
    <BannerBox color={globalColors.blue}>
      <BannerText>Your messages will unlock once they join Keybase and verify their phone number.</BannerText>
      <BannerText>Help them install Keybase:</BannerText>
      <Button
        label="Share install link"
        onClick={() => onShareClick(users[0].slice(0, -6))}
        mode="Secondary"
        style={{
          marginTop: globalMargins.xxtiny,
        }}
      />
    </BannerBox>
  ) : (
    <BannerBox color={globalColors.blue}>
      <BannerText>Your messages to {users.join(' & ')} will unlock when they join Keybase.</BannerText>
    </BannerBox>
  )

export {BrokenTrackerBanner, InviteBanner}
