import React from 'react'
import ReactDom from 'react-dom'

import ExpressStatusForm from './components/ExpressStatusForm'

import express from './tests/express-data'

import './styles/base'

const jacksing = (express) => {
    ReactDom.render(
        <div>
            <ExpressStatusForm modalType="express" expressInfo={express} />
        </div>,
        document.getElementById('example')
    )
}

// jacksing(express)

window.jacksing = jacksing

// ? What is the principle of the usage of module.hot.
if (module.hot) {
    module.hot.accept()
}
