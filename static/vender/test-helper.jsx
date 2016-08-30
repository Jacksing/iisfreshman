import React from 'react';
import ReactDom from 'react-dom';
import $ from 'jquery';

import {TestSetCollection} from './components/TestSetCollection';
import ApproachCollection from './components/ApproachCollection';

import './styles/base';

$(function() {
    ReactDom.render(
        <div>
            <ApproachCollection promise={$.getJSON('/rismo/taxmarks/taxapproach/')} />
            <TestSetCollection promise={$.getJSON(data_url)} mode="full" byte={false} />
        </div>,
        document.getElementById('example')
    );
});
