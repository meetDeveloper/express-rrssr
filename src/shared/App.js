import React, { Component } from 'react'
import Grid from './Grid'
import Home from './Home'
import NoMatch from './NoMatch'
import Navbar from './Navbar';



class App extends Component {
  renderSwitch(param) {
    switch(param) {
      case 'Home':
        return <Home />;
      case 'Grid':
        return <Grid data={this.props.data} />;
      case 'NoMatch':
        return <NoMatch />
    }
  }

  render() {
    return (
      <div>
        <Navbar/>
        {this.renderSwitch(this.props.component)}
      </div>
    )
  }
}

export default App