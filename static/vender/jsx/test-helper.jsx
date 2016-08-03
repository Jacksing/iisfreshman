import React from 'react';
import ReactDom from 'react-dom'
import $ from 'jquery';

import {TestSetCollection} from './test-set-collection'

require('../sass/base');
require('../sass/test-helper');

$(function() {
    ReactDom.render(
        <TestSetCollection promise={$.getJSON(data_url)} mode="full" byte={false} />,
        document.getElementById("example")
    );
});
