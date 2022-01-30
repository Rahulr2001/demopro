import React, { Component } from 'react';
import './App.css';
import { Formik } from "formik";
import * as Yup from "yup";
import { API, graphqlOperation } from 'aws-amplify'
import { listRestaurants } from './graphql/queries'
import { createRestaurant } from './graphql/mutations'
//import { create } from 'yup/lib/Reference';

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
 
  //onChange = e => {
 //   this.setState({ [e.target.name]: e.target.value })
 // }
  //createRestaurant = async () => {
    //const { Name, Email, Location } = this.state
    //const { Name, Email, Location } = values
    //if (Name === '' || Email === '' || Location === '') return
  //  try {
     // const value = { Name, Email, Location }
      //const restaurants = [...this.state.restaurants, restaurant]
      //this.setState({ restaurants, Name: '', Email: '', Location: '' })
   //   await API.graphql(graphqlOperation(createRestaurant, {input: value}))
//console.log('Data successfully created!')
 //   } catch (err) {
  //    console.log('error: ', err)
 //   }
//  }
  
 render() {
    return (
      <Formik
      initialValues={
        {
          Name:"",
          Email:"",
          Location:""
        }
      }
      validationSchema={validationSchema}
      onSubmit={values => {
       //this.createRestaurant(values)
       const createi = async () => {
        //const { Name, Email, Location } = this.state
        const { Name, Email, Location } = values
        //if (Name === '' || Email === '' || Location === '') return
        try {
          const value = { Name, Email, Location }
          //const restaurants = [...this.state.restaurants, restaurant]
          //this.setState({ restaurants, Name: '', Email: '', Location: '' })
          await API.graphql(graphqlOperation(createRestaurant, {input: value}))
          console.log('Data successfully created!')
          alert('Data is Inserted..')
          window.location.reload();
        } catch (err) {
          console.log('error: ', err)
        }
      }
      createi();
      }}
    >
      {
      ({ handleSubmit, handleChange, values, errors }) =>
       (
      <form className="App" onSubmit={handleSubmit}>
        <div style={styles.inputContainer}>
        <label style={styles.titles}>NAME:</label>
          <input
            name='Name'
            //placeholder='Name'
            onChange={handleChange}
            value={values.Name}
            //value={this.state.Name}
            style={styles.input}            
          />
          <small style={styles.error}>{errors.Name}</small>
          <label style={styles.titles}>EMAIL:</label>
          <input
            name='Email'
            //placeholder='Email'
            onChange={handleChange}
            //onChange={this.onChange}
            value={values.Email}
            //value={this.state.Email}
            style={styles.input}            
          />
          <small style={styles.error} >{errors.Email}</small>
          <label style={styles.titles}>LOCATION:</label>
          <select name="Location" 
          //onChange={this.onChange} 
          onChange={handleChange}
          value={values.Location}
          //value={this.state.Location} 
          style={styles.select} > 
          <option value="India">India</option>
          <option value="Australia">Australia</option>
          <option value="America">America</option>
          <option value="Canada">Canada</option>
          <option value="Dubai">Dubai</option>
          <option value="Russia">Russia</option>
          </select>
          <small style={styles.error}>{errors.Location}</small>
        </div>
        <button
        type='submit'
          style={styles.button}
          //onClick={this.createRestaurant}
          //onClick={window.location.reload()}
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
      </form>
          
    )}
   </Formik>)
}
}



const validationSchema = Yup.object({
  Name: Yup.string().required("Name Cannot Be Empty").min(2,"Name is too Short"),
  Email: Yup.string().required("Email Cannot be Empty").email("Enter An Valid Email"),
  Location:Yup.string().required("Select An Location")
});
  

const styles = {
  inputContainer: {
    margin: '0 auto', display: 'flex', flexDirection: 'column', width: 300
  },
  button: {
    border: 'none', backgroundColor: '#ddd', padding: '10px 30px'
  },
  input: {
    fontSize: 18,
    borderColor: 'blue',
    margin: 10,
    height: 20,
    backgroundColor: "#ddd",
    padding: 8,
  },
  select:{
    fontSize:18,
    margin: 10,
    height:40,
    backgroundColor:"#ddd",
    padding:8,
    borderColor:'blue'
  },
  item: {
    padding: 10,
    borderBottom: '2px solid #ddd'
  },
  Name: { fontSize: 22 },
  Email: { color: 'rgba(0, 0, 0, .45)' },
  Location:{ fontSize: 22},
  error:{
    color:'red',
    fontSize:12
  },
  titles:{
  display:'flex',
  fontWeight:'bold'
  }
}
export default App