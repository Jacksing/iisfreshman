import React from 'react'
import ApproachProperty from './approach-property'
import $ from 'jquery'

let details = [
    {code: 0, value: '100元', description: '読み方は「ひゃくえん」です。', selected: false},
    {code: 1, value: '少女', description: '読み方は「しょうじょ」です。', selected: false},
    {code: 2, value: '知らん', description: '「知らない」の略です。', selected: false},
    {code: 3, value: '運転', description: '読み方は「うんてん」です。', selected: false},
    {code: 4, value: '嵐', description: '読み方は「あらし」です。', selected: false},
    {code: 5, value: '確認', description: '読み方は「かくにん」です。', selected: false},
    {code: 6, value: '木村拓哉', description: 'スーパースターです。', selected: false},
    {code: 7, value: '久しぶりだ', description: '「ご無沙汰です」に似てる。', selected: false},
    {code: 8, value: '松嶋菜々子', description: '美しい美人です。', selected: false},
    {code: 9, value: '終わり', description: '野望と願いを阻んできた。', selected: false},
];

let properties = [
    details,
    $.extend(true, [], details),
    $.extend(true, [], details),
    $.extend(true, [], details),
];


export default class Approach extends React.Component {
    render() {
        let propertyList = properties.map(property => {
            return <ApproachProperty title="税率/征收率1" details={property} />
        });

        return (
            <div>
                {propertyList}
            </div>
        );
    }
}
