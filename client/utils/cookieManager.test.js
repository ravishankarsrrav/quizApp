import CookieManager from './cookieManager';

const sessionStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn()
};
global.sessionStorage = sessionStorageMock;

test('should get from sessionStorage', () => {
	const KEY = 'foo', VALUE = 'bar';
	CookieManager.get(KEY);
	expect(sessionStorage.getItem).toHaveBeenLastCalledWith(KEY);
	expect(sessionStorage.getItem.mock.calls).toHaveLength(1);
});

test('should save to sessionStorage', () => {
	const KEY = 'foo', VALUE = 'bar';
	CookieManager.set(KEY, VALUE);
	expect(sessionStorage.setItem).toHaveBeenLastCalledWith(KEY, VALUE);
	expect(sessionStorage.setItem.mock.calls).toHaveLength(1);
});