import React from 'react';
import ApproachProperty from './approach-property';
import $ from 'jquery';

let japanese = [
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

let chinese = [
    {value: 0, name: '100元', description: '也就是十个十元。'},
    {value: 1, name: '少女', description: '豆蔻年华。'},
    {value: 2, name: '不知道', description: '地方方言读作知不道。',},
    {value: 3, name: '老司机', description: '老司机带带我。'},
    {value: 4, name: '岚', description: '风暴来了。'},
    {value: 5, name: '确认', description: '拼音写作queren。'},
    {value: 6, name: '木村拓哉', description: 'SMAP成员。'},
    {value: 7, name: '好久不见', description: '好久不见。'},
    {value: 8, name: '古畑任三郎', description: '我是古畑任三郎。'},
    {value: 9, name: '结束', description: '一共十个属性。'},
];

let english = [
    {value: 0, name: '100 USD', description: 'One hundred dollar.'},
    {value: 1, name: 'Girl', description: 'Beautiful and young woman.'},
    {value: 2, name: 'BTW', description: 'By the way.',},
    {value: 3, name: 'SSMS', description: 'Sql Server Management Studio.'},
    {value: 4, name: 'Blizzard', description: 'Blizzard Entertaiment'},
    {value: 5, name: 'Confirm', description: 'I am almost forgot all the english words.'},
    {value: 6, name: 'Kimura Takuya', description: 'A superstart of SMAP.'},
    {value: 7, name: 'Over', description: 'Eight words in all.'},
];

let properties = [
    {index: 0, name: '中文', detail: chinese},
    {index: 1, name: 'English', detail: english},
    {index: 2, name: '日本語', detail: japanese},
    {index: 3, name: '中文２', detail: $.extend(true, [], chinese)},
];

let propertyValues = {
    0: 1,
    1: 3,
    2: 16,
    3: 1,
};

export default class Approach extends React.Component {
    changeData() {
        properties[0].detail[0] = {value: 9, name: '終わり', description: '野望と願いを阻んできた。'};
    }

    constructor(props) {
        super(props);
        this.state = {
            properties: properties,
        };
    }

    handleOnPropertySave(data) {
        var {index, value, name, description, ...others} = data;
        
        if (value == undefined) {
            var newValue = properties[index].detail.length;
            properties[index].detail.push({
                value: newValue,
                name: name,
                description: description,
            });
        }
        else {
            properties[index].detail.forEach(function(detail) {
                if (detail.value == value) {
                    detail.name = name;
                    detail.description = description;
                }
            }, this);
        }

        this.setState({
            properties: properties
        });

        return true;
    }

    render() {
        let propertyList = this.state.properties.map(property => {
            return <ApproachProperty key={property.index}
                                     index={property.index}
                                     name={property.name}
                                     details={property.detail}
                                     value={propertyValues[property.index]}
                                     nullable={true}
                                     onSave={this.handleOnPropertySave.bind(this)} />;
        });

        return (
            <div>
                {propertyList}
                <button type="button" onClick={this.changeData}></button>
            </div>
        );
    }
}
