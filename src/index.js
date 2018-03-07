import React, { StrictMode } from 'react'
import { render } from 'react-dom'
import Context from './Context'
import Header from './Header'
import List from './List'
import styles from './styles.css'

class Todo extends React.Component {
  state = {
    todos: [],
    total: 0,
    finished: 0,
    theme: 'light'
  }

  onThemeChange = newTheme => this.setState({
    theme: newTheme
  })

  onTotalChange = value => this.setState({
    total: this.state.total + value
  })

  onFinishedChange = value => this.setState({
    finished: this.state.finished + value
  })

  componentDidMount () {
    fetch('/api/todos').then(res => res.json()).then((data) => {
      this.setState({
        todos: data,
        total: data.length
      })
    })
  }

  render () {
    const { todos, total, finished, theme } = this.state
    const listProps = {
      defaultValue: todos,
      theme,
      totalChange: this.onTotalChange,
      finishedChange: this.onFinishedChange
    }

    return (
      <StrictMode>
        <div className={styles.todos}>
          <Context.Provider value={{ total, finished }}>
            <Header onThemeChange={this.onThemeChange} />
          </Context.Provider>
          <List {...listProps} />
        </div>
      </StrictMode>
    )
  }
}

render(<Todo />, document.getElementById('root'))
