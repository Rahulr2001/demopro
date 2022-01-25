import React from 'react';
import './style.css';

import { API, graphqlOperation } from 'aws-amplify'
import { listRestaurants } from './graphql/queries'
//import { createRestaurant } from './graphql/mutations'


class RegisterForm extends React.Component {
    
    state = { Name: '', Email: '', Location: '', restaurants: [] }
    async componentDidMount() {
        try {
          const apiData = await API.graphql(graphqlOperation(listRestaurants))
          const restaurants = apiData.data.listRestaurants.items
          this.setState({ restaurants })
        } catch (err) {
          console.log('error: ', err)
        }
      }



    constructor() {
      super();
      this.state = {
        fields: {},
        errors: {}
      }

      this.handleChange = this.handleChange.bind(this);
      this.submituserRegistrationForm = this.submituserRegistrationForm.bind(this);

    };

    handleChange(e) {
      let fields = this.state.fields;
      fields[e.target.name] = e.target.value;
      this.setState({
        fields
      });

    }

    submituserRegistrationForm(e) {
      e.preventDefault();
      if (this.validateForm()) {
          let fields = {};
          fields["username"] = "";
          fields["emailid"] = "";
          this.setState({fields:fields});
          alert("Form submitted");
      }

    }

    validateForm() {

      let fields = this.state.fields;
      let errors = {};
      let formIsValid = true;

      if (!fields["username"]) {
        formIsValid = false;
        errors["username"] = "*Please enter your username.";
      }

      if (typeof fields["username"] !== "undefined") {
        if (!fields["username"].match(/^[a-zA-Z ]*$/)) {
          formIsValid = false;
          errors["username"] = "*Please enter alphabet characters only.";
        }
      }

      if (!fields["emailid"]) {
        formIsValid = false;
        errors["emailid"] = "*Please enter your email-ID.";
      }

      if (typeof fields["emailid"] !== "undefined") {
        //regular expression for email validation
        var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
        if (!pattern.test(fields["emailid"])) {
          formIsValid = false;
          errors["emailid"] = "*Please enter valid email-ID.";
        }
      }

      this.setState({
        errors: errors
      });
      return formIsValid;


    }



  render() {
    return (
    <div id="main-registration-container">
     <div id="register">
        <h3>Registration page</h3>
        <form method="post"  name="userRegistrationForm"  onSubmit= {this.submituserRegistrationForm} >
        <label>Name</label>
        <input type="text" name="username" value={this.state.fields.username} onChange={this.handleChange} />
        <div className="errorMsg">{this.state.errors.username}</div>
        <label>Email ID:</label>
        <input type="text" name="emailid" value={this.state.fields.emailid} onChange={this.handleChange}  />
        <div className="errorMsg">{this.state.errors.emailid}</div>
        <input type="submit" className="button"  value="Register"/>
        </form>
        <div>
        {
          this.state.restaurants.map((rest, i) => (
            <div key={i} style={styles.item}>
              <p style={styles.Name}>{rest.Name}</p>
              <p style={styles.Email}>{rest.Email}</p>
              <p style={styles.Location}>{rest.Location}</p>
            </div>
          ))
        }
        </div>
    </div>
</div>

      );
  }


}
const styles={
item: {
    padding: 10,
    borderBottom: '2px solid #ddd'
  },
  Name: { fontSize: 22 },
  Email: { color: 'rgba(0, 0, 0, .45)' },
  Location:{ fontSize: 22}
}



export default RegisterForm;