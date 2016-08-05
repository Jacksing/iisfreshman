import React from 'react'
import ApproachProperty from './approach-property'
import $ from 'jquery'

let details = [
    {value: 0, name: '100元', description: '読み方は「ひゃくえん」です。'},
    {value: 1, name: '少女', description: '読み方は「しょうじょ」です。'},
    {value: 2, name: '知らん', description: '「知らない」の略です。',},
    {value: 3, name: '運転', description: '読み方は「うんてん」です。'},
    {value: 4, name: '嵐', description: '読み方は「あらし」です。'},
    {value: 5, name: '確認', description: '読み方は「かくにん」です。'},
    {value: 6, name: '木村拓哉', description: 'スーパースターです。'},
    {value: 7, name: '久しぶりだ', description: '「ご無沙汰です」に似てる。'},
    {value: 8, name: '松嶋菜々子', description: '美しい美人です。'},
    {value: 9, name: '終わり', description: '野望と願いを阻んできた。'},
];

let properties = [
    {name: '単語１', detail: details},
    // {name: '単語２', detail: details},
    // {name: '単語３', detail: details},
    // {name: '単語４', detail: details},
    // {name: '単語５', detail: details},
    {name: '単語２', detail: $.extend(true, [], details)},
    {name: '単語３', detail: $.extend(true, [], details)},
    {name: '単語４', detail: $.extend(true, [], details)},
    {name: '単語５', detail: $.extend(true, [], details)},
];

let propertyValues = {
    '単語１': 1,
    '単語２': 3,
    '単語３': 16,
    '単語４': 1,
    '単語５': 9,
};

export default class Approach extends React.Component {
    render() {
        let propertyList = properties.map(property => {
            return <ApproachProperty key={property.name}
                                     title={property.name} 
                                     details={property.detail}
                                     value={propertyValues[property.name]} />;
        });

        return (
            <div>
                {propertyList}
            </div>
        );
    }
}
