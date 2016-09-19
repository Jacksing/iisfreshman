import React from 'react'
import ReactDom from 'react-dom'

import ExpressStatusForm from './components/ExpressStatusForm'
import PopupSelector from './components/doodad/PopupSelector'

// import express from './tests/express-data'

import './styles/base'

const ShowExpressStatus = (express) => {
    ReactDom.render(
        <div>
            <ExpressStatusForm modalType="express-status" expressInfo={express} />
        </div>,
        document.getElementById('example')
    )
}

const ShowCompanySelector = (elements, onItemClick) => {
    ReactDom.render(
        <div>
            <PopupSelector modalType="company-selector" elements={elements} onItemClick={onItemClick} />
        </div>,
        document.getElementById('example')
    )
}

window.ShowExpressStatus = ShowExpressStatus
window.ShowCompanySelector = ShowCompanySelector

// ? What is the principle of the usage of module.hot.
if (module.hot) {
    module.hot.accept()
}
