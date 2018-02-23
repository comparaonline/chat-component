import React, { Component } from 'react';
import PropTypes from 'prop-types'; // eslint-disable-line

import zopim from './scripts/zopim';

class ZopimChat extends Component {
  constructor() {
    super();

    this.state = { isOpen: true };
    this.onClick = this.onClick.bind(this);
  }

  componentWillMount() {
    this.props.zopimFn(document, 'script');

    this.countryConfig();
    this.visibilityConfig();
  }

  onClick() {
    return this.showChat();
  }

  countryConfig() {
    const {
      language,
      countryName,
      title,
      conciergeTitle,
      prechatFormGreetings,
      offlineFormGreetings,
    } = this.props;

    window.$zopim(() => {
      const chat = window.$zopim.livechat;

      chat.setLanguage(language);
      chat.window.setTitle(title);
      chat.concierge.setTitle(conciergeTitle);
      chat.prechatForm.setGreetings(prechatFormGreetings);
      chat.offlineForm.setGreetings(offlineFormGreetings);

      chat.departments.filter('');
      chat.departments.setVisitorDepartment(countryName);

      chat.setOnConnected(() => (
        chat.setStatus(chat.departments.getDepartment(countryName).status)
      ));
    });
  }

  visibilityConfig() {
    window.$zopim(() => {
      const chat = window.$zopim.livechat;

      this.hideChat = () => window.$zopim(() => {
        chat.hideAll();
        this.setState({ isOpen: false });
      });

      this.showChat = () => window.$zopim(() => {
        chat.window.show();
        this.setState({ isOpen: true });
      });

      if (this.props.children) {
        window.$zopim(() => (
          chat.window.onHide(() => this.hideChat())
        ));

        this.hideChat();
      }
    });
  }

  render() {
    if (this.props.children && !this.state.isOpen) {
      return React.cloneElement(this.props.children, { onClick: this.onClick });
    }

    return null;
  }
}

ZopimChat.defaultProps = {
  children: null,
  zopimFn: zopim,
};

ZopimChat.propTypes = {
  children: PropTypes.node,
  zopimFn: PropTypes.func,
  countryName: PropTypes.string.isRequired,
  language: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  conciergeTitle: PropTypes.string.isRequired,
  prechatFormGreetings: PropTypes.string.isRequired,
  offlineFormGreetings: PropTypes.string.isRequired,
};

export default ZopimChat;
