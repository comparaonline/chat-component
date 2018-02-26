import React from 'react';
import { mount } from 'enzyme';

import buildChat from '../__mocks__/zopim-chat';
import ZopimChat from '../';

describe('<ZopimChat />', () => {
  let livechat = {};
  let props = {};

  beforeEach(() => {
    livechat = buildChat();
    props = {
      countryName: 'Chile',
      language: 'es',
      title: 'title',
      conciergeTitle: 'conciergeTitle',
      prechatFormGreetings: 'prechatFormGreetings',
      offlineFormGreetings: 'offlineFormGreetings',
      zopimFn: () => {
        window.$zopim = fn => fn();
        window.$zopim.livechat = livechat;
      },
    };
  });

  test('Zopim chat receive all props', () => {
    mount(<ZopimChat {...props} />);

    const chatFn = {
      language: livechat.setLanguage,
      title: livechat.window.setTitle,
      conciergeTitle: livechat.concierge.setTitle,
      prechatFormGreetings: livechat.prechatForm.setGreetings,
      offlineFormGreetings: livechat.offlineForm.setGreetings,
      countryName: livechat.departments.setVisitorDepartment,
    };

    const getFirstCallFirstParam = propName => chatFn[propName].mock.calls[0][0];

    Object.keys(chatFn).forEach(propName => (
      expect(getFirstCallFirstParam(propName)).toBe(props[propName])
    ));
  });

  test('Render', () => {
    const wrapper = mount(<ZopimChat {...props} />);
    expect(wrapper).toHaveLength(1);
  });

  test('Without custom opener (children)', () => {
    const wrapper = mount(<ZopimChat {...props} />);
    expect(wrapper.prop('children')).toBeNull();
    expect(wrapper.state('isOpen')).toBeTruthy();
  });

  test('With custom opener (children)', () => {
    const wrapper = mount(<ZopimChat {...props}><button /></ZopimChat>);
    expect(wrapper.find('button')).toHaveLength(1);
    expect(livechat.hideAll.mock.calls).toHaveLength(1);
    expect(wrapper.state('isOpen')).toBeFalsy();
  });

  test('Click on custom opener', () => {
    const wrapper = mount(<ZopimChat {...props}><button /></ZopimChat>);
    wrapper.find('button').simulate('click');
    expect(livechat.window.show.mock.calls).toHaveLength(1);
    expect(wrapper.state('isOpen')).toBeTruthy();
    expect(livechat.hideAll.mock.calls).toHaveLength(1);
    expect(wrapper.find('button')).toHaveLength(0);
  });

  test('Add empty tags', () => {
    const wrapper = mount(<ZopimChat {...props} tags={[]} />);
    expect(wrapper).toHaveLength(1);
  });

  test('Add tags', () => {
    mount(<ZopimChat {...props} tags={['tag1', 'tag2']} />);
    expect(livechat.addTags.mock.calls).toHaveLength(2);
  });
});
