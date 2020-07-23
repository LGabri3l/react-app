import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Button from '@material-ui/core/Button';
import Swal from 'sweetalert2'


let searchTerm; 

class App extends Component {
	
	
	
	 constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
        this.state = { repositories: [] };
		
    }

		render() {
        return(
            <div>
                <form>
                
				<input type="text" className="App" ref={(input) => { this.App = input; }}/> <br /> <br />
				<Button variant="contained" color="secondary" onClick={this.onClick}>Search</Button>
                </form>
                <div className="foundRepo">{this.props.name}</div>
				<div className="foundRepo">{this.props.stargazers_count}</div>
				<div className="foundRepo">{this.props.watchers_count}</div>
                <h2>Repositories</h2>
                <ul>
                 { 
				 
				 this.state.repositories.map( ( item, index ) => (
                    <li key={ index }>
                        <a href={ item.html_url }>{ item.name }</a>
					<br / >
						stargazers_count: { item.stargazers_count }
					<br / >
						watchers_count: { item.watchers_count }
                    </li>

                )) }
				
                </ul>
            </div>
            );
    }

    
	onClick(event) {
		
        searchTerm = this.App.value;
        let endpoint = 'https://api.github.com/search/repositories?sort=stars&order=desc&q=' + searchTerm;
        console.log(searchTerm);
        fetch(endpoint)
            .then(blob => blob.json())
            .then(response => {
				if (response.items != undefined){
                this.setState({ repositories: response.items });
				}else {
					Swal.fire({
						icon: 'error',
						title: 'Oops...',
						text: 'Something went wrong with your search!',
						footer: '<a href>Why do I have this issue?</a>'
					})
				}
			});
        event.preventDefault();

    }
}



export default App;
