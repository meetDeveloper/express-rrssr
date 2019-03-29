import React from 'react'
import { hydrate } from 'react-dom'
import App from '../shared/App'

hydrate(
  <App data={window.__INITIAL_DATA__} component={window.__COMPONENT__} />,
  document.getElementById('app')
);