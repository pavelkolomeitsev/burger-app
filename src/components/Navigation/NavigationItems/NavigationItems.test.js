import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from "enzyme-adapter-react-16";

import NavigationItems from "./NavigationItems";
import NavigationItem from "./NavigationItem/NavigationItem";

configure({adapter: new Adapter()});

describe('<NavigationItems/>', () => {

    let wrapper = null;

    beforeEach(() => {
        wrapper = shallow(<NavigationItems />);
    });

    it('should render two Navigation items', () => {
        expect(wrapper.find(NavigationItem)).toHaveLength(2);
    });

    it('should contain NavigationItem', () => {
        expect(wrapper.contains(<NavigationItem link='/orders'>Orders</NavigationItem>)).toEqual(true);
    });
});