import React from 'react'
import PropTypes from 'prop-types'
import Context from './Context'
import styles from './styles.css'

class Item extends React.Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    style: PropTypes.object,
    onChange: PropTypes.func.isRequired
  }

  static WIP = Symbol('WIP')
  static FINISHED = Symbol('FINISHED')

  onChange = e => {
    const { checked } = e.target

    this.props.data.status = checked ? Item.FINISHED : Item.WIP
    this.props.onChange(checked ? +1 : -1)
  }

  render () {
    const { data, style } = this.props
    const className = data.status === Item.WIP ? styles.item : styles.finished

    return (
      <li className={className} style={style}>
        <input type="checkbox" onChange={this.onChange} />
        <time className={styles.time}>{data.createAt.toLocaleString()}</time>
        <div>{data.text}</div>
      </li>
    ) 
  }
}

export default class List extends React.Component {
  static propTypes = {
    theme: PropTypes.string.isRequired,
    defaultValue: PropTypes.array.isRequired,
    totalChange: PropTypes.func.isRequired,
    finishedChange: PropTypes.func.isRequired
  }

  static newItem = text => ({
    text,
    status: Item.WIP,
    createAt: new Date()
  })

  constructor (props) {
    super(props)
    this.state = {
      theme: props.theme,
      items: props.defaultValue.map(item => List.newItem(item.text))
    }
  }

  onEditItem = (e) => {
    this.itemText = e.target.value.trim()
  }

  onAddItem = () => {
    if (this.itemText && this.itemText.length) {
      this.setState({
        items: this.state.items.concat(List.newItem(this.itemText))
      }, () => {
        this.itemText = ''
        this.props.totalChange(+1)
      })
    } 
  }

  static getDerivedStateFromProps (nextProps, prevState) {
    const state = {
      theme: nextProps.theme
    }

    if (prevState.items.length === 0) {
      state.items = nextProps.defaultValue.map(item => List.newItem(item))
    }
    else if (nextProps.theme === prevState.theme) {
      return null
    }

    return state
  }

  render () {
    const { theme, items } = this.state

    return (
      <div>
        <div>
          <input className={styles.input} onChange={this.onEditItem} />
          <button onClick={this.onAddItem}>Add</button>
        </div>
        <ul>
          <Context.Consumer>
            {ctx => items.map((item, key) => (
              <Item
                key={key}
                data={item}
                style={ctx.themes[theme]}
                onChange={this.props.finishedChange}
              />
            ))}
          </Context.Consumer>
        </ul>
      </div>
    )
  }
}
