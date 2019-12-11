import React from 'react';
import ReactDOM from 'react-dom';

import './styles/index.css';
import App from './components/App';


//If you previously had:
// ReactDOM.render(<App />, document.getElementById('root'));

// You can opt into Concurrent Mode by writing:
ReactDOM.createRoot(document.getElementById('root')).render(<App />);