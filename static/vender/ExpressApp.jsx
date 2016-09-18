import React from 'react'
import ReactDom from 'react-dom'

import ExpressStatus from './components/ExpressStatusForm'

import express from './tests/express-data'

import './styles/base'

ReactDom.render(
    <div>
        <ExpressStatus status={express} />
    </div>,
    document.getElementById('example')
)

// ? What is the principle of the usage of module.hot.
if (module.hot) {
    module.hot.accept()
}