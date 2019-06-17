import React from "react";
import Enzyme, { shallow, mount } from "enzyme";
import QuizStartup from './quizStartup';
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter() });

const sessionStorageMock = {
	getItem: jest.fn(() => "quiz"),
	setItem: jest.fn(),
	clear: jest.fn()
};
global.sessionStorage = sessionStorageMock;

global.window = Object.create(window);
const url = "http://localhost:8080/quiz";
Object.defineProperty(window.location, 'href', {
  writable: true,
  value: url
});


describe("QuizStartup component", () => {
	test("renders", () => {
		const wrapper = shallow(<QuizStartup />);
		expect(wrapper.exists()).toBe(true);
	});

	test("should redirect page", () => {
		const wrapper = shallow(<QuizStartup />);
		expect(window.location.href).toEqual(url);
	});

	test("should set the cookie value", () => {
		const clickFn = jest.fn();
		const wrapper = mount(<QuizStartup startQuiz={clickFn} />);
		expect(sessionStorage.getItem).toHaveBeenLastCalledWith("quizID");
		expect(sessionStorage.getItem.mock.calls).toHaveLength(3);
	});
});
