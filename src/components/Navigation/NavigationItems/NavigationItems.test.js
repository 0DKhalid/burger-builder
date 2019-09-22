import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';
import { wrap } from 'module';


configure({ adapter: new Adapter() });

describe('<NavigationItets />', () => {
    let warpper;
    beforeEach(() => {
        warpper = shallow(<NavigationItems />);
    })

    it('should show two Navigation if is not Authintecated', () => {
        expect(warpper.find(NavigationItem)).toHaveLength(2);
    });


    it('should show two Navigation if is Authintecated', () => {
        warpper.setProps({ isAuth: true })
        expect(warpper.find(NavigationItem)).toHaveLength(3);
    });

    it('should be there when is Authenticated', () => {
        warpper.setProps({ isAuth: true });
        expect(warpper.contains(<NavigationItem link="/logout">Logout</NavigationItem>)).toEqual(true);
    })


});


