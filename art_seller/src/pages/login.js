import React from "react";
import axios from "axios";
import './login.css';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    this.data = {
      email: this.state.username,
      password: this.state.password,
    }

    this.dataJSON = JSON.stringify(this.data);
  
    this.config = {
      method: 'post',
      url: 'http://localhost:8080/login',
      headers: { 
        'Content-Type': 'application/json'
      },
      data : this.dataJSON
    };

    this.res = new Map();
    axios(this.config)
    .then(function (response) {
      alert(JSON.stringify(response.data));
    })
    .catch(function (error) {
      alert(error);
    }); 
  }

  render() {
    return (
      <div id="loginform">
      <h2 id="headerTitle">Login</h2>
        <form onSubmit={this.handleSubmit} action='#'>
          <div class="row">
            <label>Email</label>
            <input id="input" type="Email" placeholder="Entrer votre Email" name="username" onChange={this.handleChange}/>
          </div>
          <div class="row">
            <label>Mot de passe</label>
            <input id="input" type="password" placeholder="Entrer votre mot de passe" name="password" onChange={this.handleChange}/>
          </div>
          <div id="button" class="row">
            <button type="submit">Submit</button>
          </div>
        </form>
    </div>
    )
  }
}

export default LoginForm;