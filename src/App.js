import React, { Component } from 'react'
import Main from './components/MainComponent'
import DISHES from './shared/dishes'
import { BrowserRouter } from 'react-router-dom'
import { ConfigureStore } from './redux/configureStore'
import { Provider } from 'react-redux'

const store = ConfigureStore()

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dishes: DISHES,
    }
  }

  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div>
            <Main />
          </div>
        </BrowserRouter>
      </Provider>
    )
  }
}

export default App
