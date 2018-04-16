class App extends React.Component {
    constructor() {
      super();
      this.state = {
        searchText: '',
        users: [],
        isLoading: false
      };
    }
  
    onChangeHandle(event) {
      this.setState({searchText: event.target.value});
    }
  
    onSubmit(event) {
        this.setState({ isLoading: true });
      event.preventDefault();
      
      const {searchText} = this.state;
      const url = `https://api.github.com/search/users?q=${searchText}`;
      fetch(url)
        .then(response => response.json())
        .then(responseJson => this.setState({users: responseJson.items, isLoading: false }));
    }
  
    render() {
        const {isLoading } = this.state;
        let content;
        let form = (
            <form onSubmit={event => this.onSubmit(event)}>
                <label htmlFor="searchText">Search by user name</label>
                <input
                type="text"
                id="searchText"
                onChange={event => this.onChangeHandle(event)}
                value={this.state.searchText}/>
            </form>
        )
        if (isLoading) {
            content = (
            <div> 
                {form}
                <img src="https://ebarnette15.files.wordpress.com/2013/03/loading-3.gif"/>
            </div>);
            return content;
            }
        
        else {content = (
            <div>
            {form}
            <UsersList users={this.state.users} loading={isLoading}/>
            </div>)
            return content}

            return ({content})
        
    }
  }

class UsersList extends React.Component {
    get users() {
        return this.props.users.map(user => <User key={user.id} user={user}/>);
    }
    
    render() {
        return (
            <div className="users">
                {this.users}
            </div>
        );
    }
}

class User extends React.Component {
    render() {
        return (
            <div>
                <img src={this.props.user.avatar_url} style={{maxWidth: '100px'}}/>
                <a href={this.props.user.html_url} target="_blank">{this.props.user.login}</a>
            </div>
        );
    }
} 

ReactDOM.render(
    <App />,
    document.getElementById('root')
);