import React from 'react';
import ReactDom from 'react-dom';
import $ from 'jquery';

import {TestSetCollection} from './components/TestSetCollection';
import ApproachCollection from './components/ApproachCollection';
import ApproachPropertyList from './components/ApproachPropertyList';

import './styles/base';

$(function() {
    ReactDom.render(
        <div>
            <ApproachCollection promise={$.getJSON('/rismo/taxmarks/taxapproach/')} />
            <TestSetCollection promise={$.getJSON(data_url)} mode="full" byte={false} />
            {/*<ApproachPropertyList/>*/}
        </div>,
        document.getElementById('example')
    );
});
