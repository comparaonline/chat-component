import React, { Component, PropTypes } from 'react';
import zopim from './scripts/zopim';

class ZopimChat extends Component {
  componentWillMount() {
    zopim(document, 'script');
  }

  componentDidMount() {
    const interval = setInterval(() => {
      if (window.$zopim) {
        clearInterval(interval);
        this.startConfig(window.$zopim.livechat);
      }
    }, 100);
  }

  startConfig(config) {
    const {
      language,
      countryName,
      title,
      offlineFormGreetings
    } = this.props;

    config.setLanguage(language);
    config.window.setTitle(title);
    config.offlineForm.setGreetings(offlineFormGreetings);

    config.departments.filter('');
    config.departments.setVisitorDepartment(countryName);

    config.setOnConnected(() => {
      config.setStatus(
        config.departments.getDepartment(countryName).status
      );
    });
  }

  render() {
    return (
      <span>ZopimChat</span>
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
