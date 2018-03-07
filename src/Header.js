import React from 'react'
import PropTypes from 'prop-types'
import Context from './Context'
import styles from './styles.css'

export default class Header extends React.Component {
  static propTypes = {
    onThemeChange: PropTypes.func.isRequired
  }

  render () {
    const { onThemeChange } = this.props

    return (
      <div className={styles.header}>
        <Context.Consumer>
          {ctx => (
            <span>{`${ctx.finished} Finished / ${ctx.total} Total`}</span>
          )}
        </Context.Consumer>
        <span>
          Theme:
          <button onClick={() => onThemeChange('light')}>Light</button>
          <button onClick={() => onThemeChange('dark')}>Dark</button>
        </span>
      </div>
    )
  }
}
