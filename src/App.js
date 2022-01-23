import React, { Component } from 'react';
import './App.css';

import { API, graphqlOperation } from 'aws-amplify'
import { listRestaurants } from './graphql/queries'
import { createRestaurant } from './graphql/mutations'

class App extends Component {
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
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }
  createRestaurant = async () => {
    const { Name, Email, Location } = this.state
    //if (Name === '' || Email === '' || Location === '') return
    try {
      const restaurant = { Name, Email, Location }
      const restaurants = [...this.state.restaurants, restaurant]
      this.setState({ restaurants, Name: '', Email: '', Location: '' })
      await API.graphql(graphqlOperation(createRestaurant, {input: restaurant}))
      console.log('Data successfully created!')
    } catch (err) {
      console.log('error: ', err)
    }
  }
  render() {
    return (
      <div className="App">
        <div style={styles.inputContainer}>
          <input
            name='Name'
            placeholder='Name'
            onChange={this.onChange}
            value={this.state.Name}
            style={styles.input}
          />
          <input
            name='Email'
            placeholder='Email'
            onChange={this.onChange}
            value={this.state.Email}
            style={styles.input}
          />
          <select name="Location" onChange={this.onChange} value={this.state.Location} style={styles.select}>
          <option>Select Your Country \/</option>  
          <option value="India">India</option>
          <option value="Australia">Australia</option>
          <option value="America">America</option>
          <option value="Canada">Canada</option>
          <option value="Dubai">Dubai</option>
          <option value="Russia">Russia</option>
          </select>
        </div>

        <button
          style={styles.button}
          onClick={this.createRestaurant}
        >Create</button>
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
    );
  }
}
const styles = {
  inputContainer: {
    margin: '0 auto', display: 'flex', flexDirection: 'column', width: 300
  },
  button: {
    border: 'none', backgroundColor: '#ddd', padding: '10px 30px'
  },
  input: {
    fontSize: 18,
    border: 'none',
    margin: 10,
    height: 35,
    backgroundColor: "#ddd",
    padding: 8
  },
  select:{
    fontSize:18,
    margin: 10,
    height:35,
    backgroundColor:"#ddd",
    padding:8
  },
  item: {
    padding: 10,
    borderBottom: '2px solid #ddd'
  },
  Name: { fontSize: 22 },
  Email: { color: 'rgba(0, 0, 0, .45)' },
  Location:{ fontSize: 22}
}

export default App