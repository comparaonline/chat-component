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
      offlineFormGreetings
    } = this.props;

    window.$zopim(() => {
      const chat = window.$zopim.livechat;

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

      window.$zopim(() => {
        chat.window.onHide(() => this.hideChat());
      });

      this.hideChat();
    });
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
