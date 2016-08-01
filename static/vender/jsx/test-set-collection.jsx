import React from 'react';
import ReactDom from 'react-dom';
import $ from 'jquery';
import Clipboard from 'clipboard'

import {chinese} from './full-width-chars';

require('../sass/base');
var css = require('../sass/test-helper');

function hasValue(value) {
    return !(value == null || value == undefined || value == '');
}

function randomString(length, mix=true, byte=false) {
    var randomChineseChar = () => {
        // parts of chinese char field.
        var charFrom = 19968,
            charTo = 20968,
            maxLen = charTo - charFrom;
        return String.fromCharCode(charFrom + Math.floor(Math.random() * maxLen));
    };

    var randomFullWidthChar = () => {
        return chinese[Math.floor(Math.random() * chinese.length)];
    };

    var randomHalfChar = () => {
        var strRepo = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
        return strRepo.charAt(Math.floor(Math.random() * strRepo.length));
    };

    var rest = length;
    var resultStr = '';

    while (true) {
        if (rest == 0) {
            break;
        }

        var getHalfChar = (!mix || rest == 1) || Math.random() > 0.5;

        if (getHalfChar && false) {
            resultStr += randomHalfChar();
            rest--;
        }
        else {
            resultStr += randomFullWidthChar();
            rest -= byte ? 2 : 1;
        }
    }
    return resultStr;
}

function copyToClipboard(maintext){
  if (window.clipboardData){
    window.clipboardData.setData("Text", maintext);
    }else if (window.netscape){
      try{
        netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
    }catch(e){
        alert("该浏览器不支持一键复制！n请手工复制文本框链接地址～");
    }

    var clip = Components.classes['@mozilla.org/widget/clipboard;1'].createInstance(Components.interfaces.nsIClipboard);
    if (!clip) return;
    var trans = Components.classes['@mozilla.org/widget/transferable;1'].createInstance(Components.interfaces.nsITransferable);
    if (!trans) return;
    trans.addDataFlavor('text/unicode');
    var str = new Object();
    var len = new Object();
    var str = Components.classes["@mozilla.org/supports-string;1"].createInstance(Components.interfaces.nsISupportsString);
    var copytext=maintext;
    str.data=copytext;
    trans.setTransferData("text/unicode",str,copytext.length*2);
    var clipid=Components.interfaces.nsIClipboard;
    if (!clip) return false;
    clip.setData(trans,null,clipid.kGlobalClipboard);
  }
  alert("以下内容已经复制到剪贴板nn" + maintext);
}

var TestSet = React.createClass({
    propTypes: {
        edage: React.PropTypes.number
    },
    getInitialState: function () {
        return {
            edage: this.props.edage,
            indrop: this.props.edage - 1,
            outdrop: this.props.edage + 1,
            indropText: randomString(this.props.edage - 1),
            edageText: randomString(this.props.edage),
            outdropText: randomString(this.props.edage + 1),
        }
    },
    handleChange: function (event) {
        var value = event.target.value;
        if (!hasValue(value)) {
            this.setState({
                edage: '',
                indrop: '',
                outdrop: '',
                indropText: '',
                edageText: '',
                outdropText: '',
            });
            return;
        }
        if (isNaN(value) || value > this.props.max || value < this.props.min) {
            return;
        }
        var edage = parseInt(value);
        this.setState({
            edage: edage,
            indrop: edage - 1,
            outdrop: edage + 1,
            indropText: randomString(edage - 1),
            edageText: randomString(edage),
            outdropText: randomString(edage + 1),
        });
    },
    render: function () {
        return (
            <div className="test-set">
                <div className="tags">{this.props.tags.map((v, k) => <span key={k}>{v}</span>)}</div>
                <input className="edage" type="text" ref="edage" value={this.state.edage} onChange={this.handleChange} />
                <div>
                    <span className="title indrop">{this.state.indrop}</span>
                    <textarea className="text indrop" cols="80" rows="3" value={this.state.indropText} readOnly></textarea>
                    <button className="copy-btn" data-clipboard-text={this.state.indropText}>Copy</button>
                </div>
                <div>
                    <span className="title edage">{this.state.edage}</span>
                    <textarea className="text edage" cols="80" rows="3" value={this.state.edageText} readOnly></textarea>
                    <button className="copy-btn" data-clipboard-text={this.state.edageText}>Copy</button>
                </div>
                <div>
                    <span className="title outdrop">{this.state.outdrop}</span>
                    <textarea className="text outdrop" cols="80" rows="3" value={this.state.outdropText} readOnly></textarea>
                    <button className="copy-btn" data-clipboard-text={this.state.outdropText}>Copy</button>
                </div>
            </div>
        );
    },
});

var TestSetCollection = React.createClass({
    getInitialState: function() {
        return {
            loading: true,
            error: null,
            data: null,
        }
    },

    componentDidMount: function () {
        this.props.promise.then(
            value => this.setState({loading: false, data: value}),
            error => this.setState({loading: false, error: error})
        );
        var clipboard = new Clipboard('.copy-btn');
    },

    render: function () {
        if (this.state.loading) {
            return <div>Loading...</div>
        }
        else if (this.state.error != null) {
            return <div>Error: {this.state.error.message}</div>
        }

        var lengthDict = {};
        var data = this.state.data;
        for (var k in data) {
            var length = data[k]['length'];
            if (length in lengthDict) {
                lengthDict[length].tags.push(k);
            }
            else {
                lengthDict[length] = {tags: [k]};
            }
        }

        var testTextSetList = [];
        for (var k in lengthDict) {
            testTextSetList.push(
                <TestSet key={k} tags={lengthDict[k].tags} edage={parseInt(k)} max={1000} min={1} />
            )
        }

        return (
            <div>{testTextSetList}</div>
        );
    }
});

$(function() {
    ReactDom.render(
        // <TestSet edage={10} max={1000} min={1} />,
        <TestSetCollection promise={$.getJSON(data_url)} />,
        document.getElementById("example")
    );
});
