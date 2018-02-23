export default () => ({
  setLanguage: jest.fn(),
  window: {
    setTitle: jest.fn(),
    show: jest.fn(),
    onHide: jest.fn(),
  },
  concierge: {
    setTitle: jest.fn(),
  },
  prechatForm: {
    setGreetings: jest.fn(),
  },
  offlineForm: {
    setGreetings: jest.fn(),
  },
  departments: {
    filter: jest.fn(),
    setVisitorDepartment: jest.fn(),
  },
  setOnConnected: jest.fn(),
  hideAll: jest.fn(),
});
