import React, { Component, PropTypes } from 'react';
import zopim from './scripts/zopim';

class ZopimChat extends Component {
  constructor() {
    super();

    this.isInitialized = false;
    this.state = { isOpen: false };

    this.onClick = this.onClick.bind(this);
  }

  componentWillMount() {
    zopim(document, 'script');
  }

  componentDidMount() {
    const interval = setInterval(() => {
      if (window.$zopim) {
        clearInterval(interval);
        this.countryConfig(window.$zopim);
        this.visibilityConfig(window.$zopim);
        this.isInitialized = true;
      }
    }, 100);
  }

  onClick() {
    return this.isInitialized && this.showChat();
  }

  countryConfig(globalZopim) {
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
  }

  visibilityConfig(globalZopim) {
    const chat = globalZopim.livechat;

    this.hideChat = () => globalZopim(() => {
      chat.hideAll();
      this.setState({ isOpen: false });
    });

    this.showChat = () => globalZopim(() => {
      chat.window.show();
      this.setState({ isOpen: true });
    });

    globalZopim(() => {
      chat.window.onHide(() => this.hideChat());
    });

    this.hideChat();
  }

  render() {
    if (this.state.isOpen) {
      return null;
    }

    return (
      <button onClick={this.onClick}>
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
