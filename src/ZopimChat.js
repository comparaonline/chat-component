import React, { Component, PropTypes } from 'react';
import zopim from './scripts/zopim';

class ZopimChat extends Component {
  constructor() {
    super();

    this.state = { isOpen: true };
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
      }
    }, 100);
  }

  onClick() {
    return this.showChat();
  }

  countryConfig(globalZopim) {
    const {
      language,
      countryName,
      title,
      conciergeTitle,
      offlineFormGreetings
    } = this.props;

    const chat = globalZopim.livechat;

    chat.setLanguage(language);
    chat.window.setTitle(title);
    chat.concierge.setTitle(conciergeTitle);
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
      <div>
        {
          React.cloneElement(this.props.children, { onClick: this.onClick })
        }
      </div>
    );
  }
}

ZopimChat.propTypes = {
  children: React.PropTypes.element.isRequired,
  countryName: PropTypes.string.isRequired,
  language: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  conciergeTitle: PropTypes.string.isRequired,
  offlineFormGreetings: PropTypes.string.isRequired
};

export default ZopimChat;
