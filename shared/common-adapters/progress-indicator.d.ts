import {Component} from 'react'

export type Props = {
  style?: any
  white?: boolean
  type?: 'Small' | 'Large' | 'Huge'
}

declare class ProgressIndicator extends Component<Props> {}
export default ProgressIndicator
