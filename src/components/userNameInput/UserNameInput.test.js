import React from 'react';
import { shallow } from 'enzyme';
import { UserNameInput } from './UserNameInput';

it('should render proper UI', () => {
    const wrapper = shallow(<UserNameInput/>);
    expect(wrapper).toMatchSnapshot();    
});
