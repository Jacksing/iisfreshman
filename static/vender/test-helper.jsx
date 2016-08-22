import React from 'react';
import ReactDom from 'react-dom';
import $ from 'jquery';

import {TestSetCollection} from './components/TestSetCollection';
import Approach from './components/approach';

import './styles/base';

$(function() {
    ReactDom.render(
        <div>
            <Approach promise={$.getJSON('/rismo/taxmarks/taxapproach/')}>
                <TestSetCollection promise={$.getJSON(data_url)} mode="full" byte={false} />
            </Approach>
        </div>,
        document.getElementById("example")
    );
});
