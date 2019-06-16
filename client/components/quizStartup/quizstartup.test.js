import React from "react";
import Enzyme, { shallow, mount } from "enzyme";
import QuizStartup from './quizStartup';
import Adapter from "enzyme-adapter-react-16";
import Cookies from 'js-cookie';
Cookies.get = jest.fn()
    .mockImplementationOnce(() => 'test') // first time   

Enzyme.configure({ adapter: new Adapter() });

describe("QuizStartup component", () => {
	test("renders", () => {
		const wrapper = shallow(<QuizStartup />);
		expect(wrapper.exists()).toBe(true);
	});

	test("should set the cookie value", () => {
		const clickFn = jest.fn();
		const wrapper = mount(<QuizStartup startQuiz={clickFn} />);
		expect(Cookies.get()).toBe('test');
	});
});	
