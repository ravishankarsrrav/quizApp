import React from "react";
import Enzyme, { shallow, mount } from "enzyme";
import Header from './header';
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter() });

const sessionStorageMock = {
	clear: jest.fn()
};
global.sessionStorage = sessionStorageMock;

describe("Header component", () => {
	test("renders", () => {
		const wrapper = shallow(<Header leftTime={"00:10:00"} />);
		expect(wrapper.exists()).toBe(true);
	});

	test("whether left time is equal to props value", () => {
		const wrapper = mount(<Header leftTime={"00:10:00"} />);
		expect(wrapper.find("span.header-time").text()).toEqual("00:10:00 left");
	});

	test("whether quiz related elements are hidden in header", () => {
		const wrapper = mount(<Header leftTime={"00:10:00"} />);
		expect(wrapper.find("span.header-time").hasClass('hidden')).toEqual(true);
		expect(wrapper.find("span.header-end-test").hasClass('hidden')).toEqual(true);
	});

	test('should check stop quiz function',() => {
		const clickFn = jest.fn();
	    const app = shallow(<Header leftTime={"00:10:00"} showEndTest={true} stopQuiz={clickFn} />);
	    app.find('span.header-end-test').simulate('click');
	    expect(sessionStorage.clear.mock.calls).toHaveLength(1);
	});
});