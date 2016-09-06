import React from 'react';
import ReactDom from 'react-dom';

// import {TestSetCollection} from './components/TestSetCollection';
import ApproachCollection from './components/ApproachCollection';

import './styles/base';

ReactDom.render(
    <div>
        <ApproachCollection promise={$.getJSON('http://localhost:8000/rismo/taxmarks/taxapproach/')} />
        { /**<TestSetCollection promise={$.getJSON(data_url)} mode="full" byte={false} /> */}
    </div>,
    document.getElementById('example')
);

// ? What is the principle of the usage of module.hot.
if (module.hot) {
    module.hot.accept();
}