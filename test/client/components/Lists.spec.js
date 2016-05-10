import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import { assert } from 'chai';
import Lists from 'client/components/Lists';

function setup() {
    const props = {
        lists: [
            { id: 1, title: 'list 1', cards: [1, 5] },
        ],
        onListCreate: sinon.spy(),
        onListRemoveClick: sinon.spy()
    };

    const component = shallow(<Lists {...props} />);

    return {
        lists: component.find('List'),
        component,
        props
    };
};

describe('<Lists />', () => {
    it('should render lists', () => {
        const { lists, props } = setup();
        assert.equal(lists.length, props.lists.length);
    });

    it('should pass data to <List />', () => {
        const { lists, props } = setup();
        const listProps = lists.at(0).props();
        const ownProps = props.lists[0];

        assert.equal(listProps.id, ownProps.id);
        assert.equal(listProps.title, ownProps.title);
        assert.equal(listProps.cardsIds, ownProps.cards);
    });

    it('should pass `onListRemoveClick` callback to <List />', () => {
        const { lists, props } = setup();

        lists.at(0).props().onRemoveClick();
        assert.equal(props.onListRemoveClick.callCount, 1);
    });
});
