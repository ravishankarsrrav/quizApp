
import React from "react";
import Enzyme, { shallow, mount } from "enzyme";
import Header from './header';
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter() });

describe("Header component", () => {
	test("renders", () => {
		const wrapper = shallow(<Header />);
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

	test("whether left time update in header component is working", () => {
		const wrapper = mount(<Header leftTime={"00:10:00"} />);
		expect(wrapper.find("span.header-time").text()).toEqual("00:10:00 left");
		wrapper.setProps({leftTime : "00:09:59"});
		expect(wrapper.find("span.header-time").text()).toEqual("00:09:59 left");
	});
});