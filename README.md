chat-component
==============

Component to use the Zendesk Zopim chat.

# Installation
```
$ npm install --save comparaonline/chat-component
```

# Usage

```jsx
  <ZopimChat
    countryName={countryName}
    language={language}
    title={title}
    conciergeTitle={conciergeTitle}
    prechatFormGreetings={prechatFormGreetings}
    offlineFormGreetings={offlineFormGreetings}
  />
```

Where the possible options are:

* `countryName`: The full name of the country (i.e. Chile, Brasil or Colombia).
* `language`: Two letter language ISO code (i.e `es` or `pt`).
* `title`: Text for the main top bar of the chat window.
* `conciergeTitle`: Text shown once a chat is initiated.
* `prechatFormGreetings`: Set the greeting message displayed on the pre-chat form..
* `offlineFormGreetings`: Text shown when the chat deparment status is offline.
