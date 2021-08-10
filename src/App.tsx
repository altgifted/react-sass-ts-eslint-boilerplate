import { hot } from 'react-hot-loader/root';
import React, { useState } from 'react';
import './app.styles.scss';

const App = () => {
  const [state, setState] = useState();
  return (
    <div className="app">
      <header className="header">Header</header>
      <section className="content">Content</section>
      <footer className="footer">Footer</footer>
    </div>
  );
};

export default hot(App);
