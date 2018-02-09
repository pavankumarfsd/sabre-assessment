import React from 'react';
import ReactDOM from 'react-dom';
import SomeContent from './SomeContent';
import SearchComponent from './SearchComponent';

class App extends React.Component {
    render() {
        return (
            <div className="app">
                <SearchComponent />
                <SomeContent />
                <SomeContent />
            </div>
        );
    }
};

ReactDOM.render(<App/>, document.getElementById("app"));
