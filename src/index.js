// https://tylermcginnis.com/reactjs-tutorial-a-comprehensive-guide-to-building-apps-with-react/

import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

// Example of creating component by passing props
class HelloUser extends React.Component {
  render() {
    return (
      <div> Hello, {this.props.name}</div>
    )
  }
};
ReactDOM.render(<HelloUser name="Tyler"/>, document.getElementById('hello_user'));

// Example of simple user input and callback
class InputUsername extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: 'Tyler McGinnis',
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange (e) {
    this.setState({
      username: e.target.value
    });
  }
  render() {
    return (
      <div>
        Username: {this.state.username + "!"} <br />
        Change Name: 
        <input
          type = "text"
          value = {this.state.username}
          onChange = {this.handleChange}
        />
      </div>
    );
  }
};
ReactDOM.render(<InputUsername name="Tyler"/>, document.getElementById('input_username'));

// Example of parent/child component
class FriendsContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: 'Tyler McGinnis',
      friends: ['Jake Lingwall', 'Sarah Drasner', 'Merrick Christensen']
    };
    this.addFriend = this.addFriend.bind(this);
  }
  addFriend(friend) {
    this.setState((state) => ({
      friends: state.friends.concat([friend])
    }));
  };
  render() {
    return (
      <div>
        <h3> Name: {this.state.name} </h3>
        <AddFriend addNew={this.addFriend} />
        <ShowList names={this.state.friends} />
      </div>
    )
  }
};
class ShowList extends React.Component {
  render() {
    return (
      <div>
        <h3> Friends: </h3>
        <ul>
          {this.props.names.map((friend) => <li>{friend}</li>)}
        </ul>
      </div>
    )
  }
};
ShowList.defaultProps = {
  names: []
};

class AddFriend extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      newFriend: ''
    };

    this.updateNewFriend = this.updateNewFriend.bind(this);
    this.handleAddNew = this.handleAddNew.bind(this);
  }
  updateNewFriend(e) {
    this.setState({
      newFriend: e.target.value
    });
  }
  handleAddNew() {
    this.props.addNew(this.state.newFriend);
    this.setState({
      newFriend: ''
    });
  }
  render() {
    return (
      <div>
        <input
          type="text"
          value={this.state.newFriend}
          onChange={this.updateNewFriend}
        />
        <button onClick={this.handleAddNew}> Add Friend </button>
      </div>
    )
  }
};
AddFriend.propTypes = {
  addNew: PropTypes.func.isRequired
};

ReactDOM.render(<FriendsContainer />, document.getElementById('friend_container'));
