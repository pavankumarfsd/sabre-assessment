import React from 'react';
import { SearchService } from './SearchService';

class SearchComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            activeItem: 0,
            searchResults: []
        };
        this.service = new SearchService();
    }

    setFocus(index) {
        if(index < 0) {
            index = this.state.searchResults.length;
        } else if(index >= this.state.searchResults.length) {
            index = 0;
        }
        this.setState({activeItem: index});
        setTimeout(() => {
            let activeDOMItem = document.querySelector('.active-item');
            if(activeDOMItem) {
                activeDOMItem.scrollIntoViewIfNeeded();
            }
        });
    }

    onKeyDown(event) {
        let activeItem = this.state.activeItem;
        switch(event.keyCode) {
            case 38: 
                activeItem = activeItem - 1;
                this.setFocus(activeItem);
                break;
            case 40:
                activeItem = activeItem + 1;
                this.setFocus(activeItem);
                break;
            case 13:
                console.log('selectedItem', this.state.searchResults[this.state.activeItem]);
                this.setState({searchResults: []});
                this.target.value = '';
        }
    }

    onSearch(event) {
        const val = event.target.value;
        if (val === '') {
            this.setState({searchResults: []});
        }

        this.service.fetchData(event.target.value).then(response => {
            this.setState({searchResults: response.items || []})
        }).catch(error => {
            console.error('Error:', error)
        });
    }

    render() {

        let items = this.state.searchResults.map((item, index) =>
            <div className={`search-item ${this.state.activeItem == index ? 'active-item' : ''}`} key={index}>
                <img className="avatar" src={item.avatar_url} alt="No Icon" />
                <div className="login">{item.login}</div>
            </div>
        );

        return (
            <div className="search-container">
                <input type="text" className="search-input" onKeyDown={this.onKeyDown.bind(this)} onChange={this.onSearch.bind(this)}/>
                <div className="search-items">
                    {items}
                </div>
            </div>
        )
    }
}

export default SearchComponent;
