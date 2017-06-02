import React, { Component, PropTypes } from 'react';
import zopim from './scripts/zopim';

class ZopimChat extends Component {
  constructor() {
    super();

    this.initialized = false;
  }

  componentWillMount() {
    zopim(document, 'script');
  }

  componentDidMount() {
    const interval = setInterval(() => {
      if (window.$zopim) {
        clearInterval(interval);
        this.initialize(window.$zopim);
        this.initialized = true;
      }
    }, 100);
  }

  initialize(globalZopim) {
    const {
      language,
      countryName,
      title,
      offlineFormGreetings
    } = this.props;

    const chat = globalZopim.livechat;

    chat.setLanguage(language);
    chat.window.setTitle(title);
    chat.offlineForm.setGreetings(offlineFormGreetings);

    chat.departments.filter('');
    chat.departments.setVisitorDepartment(countryName);

    chat.setOnConnected(() => {
      chat.setStatus(
        chat.departments.getDepartment(countryName).status
      );
    });

    this.hideChat = () => globalZopim(() => chat.hideAll());
    this.showChat = () => globalZopim(() => chat.window.show());

    globalZopim(() => {
      chat.window.onHide(() => this.hideChat());
    });

    this.hideChat();
  }

  render() {
    const chatProps = {
      onClick: () => this.initialized && this.showChat()
    };

    return (
      <button {...chatProps}>
        CHAT
      </button>
    );
  }
}

ZopimChat.propTypes = {
  countryName: PropTypes.string.isRequired,
  language: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  offlineFormGreetings: PropTypes.string.isRequired
};

export default ZopimChat;
