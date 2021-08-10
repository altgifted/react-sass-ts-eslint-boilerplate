import { hot } from 'react-hot-loader/root';
import React from 'react';
import './app.styles.scss';

const App = () => (
  <div className="app">
    <header className="header">Header</header>
    <section className="content">Content</section>
    <footer className="footer">Footer</footer>
  </div>
);

export default hot(App);
