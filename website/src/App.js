import React, { Component } from 'react';
import Calendar from 'react-calendar';
import './App.css';
import firebase from './firebase.js';
import Collapsible from 'react-collapsible';

class App extends Component {
  constructor() {
	  super();
	  this.state = {
		  date: new Date(),
		  habit: [],
		  completed: [],
		  notes: [],
		  type: [],
		  post: '',
		  email: '',
		  loading: true,
		  modules: null,
		  update: true
	  };
  }
	
  componentDidMount() {
	  this.habitRetrieval();
  }
  
  componentDidUpdate() {
	  this.habitRetrieval();
  }
	
	//retrieve habits from database
	habitRetrieval() {
	  //TODO: replace email with signed in account
	  const ref = firebase.database().ref('users/a@gmail_com/history');
	  
	  //retrieve tasks by date
	  const date = this.state.date.toJSON().substr(0,10);
	  const post = ref.child(date).orderByKey();
	  
	  if (this.state.update == true) {
	  this.setState ({
		  update: false
	  });
	  
	  post.once('value', snap => {
		  this.setState({
			  habit: [],
			  completed: [],
			  notes: [],
			  type: [],
		  });
		  
		  //retrieve details of habits
		  snap.forEach(child => {
			  this.setState({
				  habit: this.state.habit.concat([child.key]),
				  completed: this.state.completed.concat([child.val().completed]),
				  notes: this.state.notes.concat([child.val().notes]),
				  type: this.state.type.concat([child.val().type])
			  });
			  
			  //print out habit's details
			  const postList = this.state.habit.map((dataList, index) =>
				<p>
				<center>
				<Collapsible trigger={dataList}>
				<div class='content'>
				<b>Completed: </b>
				{(() => {
					switch (this.state.completed[index].toString()) {
						case 'false': return ' Incomplete';
						default: return ' Completed';
					}
				}) ()}
				<br />
				<b>Notes: </b>
				{(() => {
					switch (this.state.notes[index]) {
						case '': return ' None';
						default: return ' ' + this.state.notes[index];
					}
				})()}
				<br />
				<b>Type: </b>{this.state.type[index]}
				</div>
				</Collapsible>
				</center>
				<hr />
				</p>
			  );
			  
			  //finished loading
			  this.setState({
				  post: postList,
				  loading: false
			  });
		  });
		});
		
		if (this.state.loading === true) {
			this.setState({
				post: 'No habits found.',
				loading: false
			});
		}
	  }
	}
  
  onChange = date => {
	  this.setState({
		  date,
		  update: true,
		  loading: true
	  });
  }
	
  render() {
	const {loading, modules} = this.state;
	
    return loading ? (
	  <div><center><h1> loading... </h1></center></div>
    ) : (
      <div className="App">
        <header className="Calendar">
		<center>
		<button class="button"><span>Momentum Tracker </span></button>
		<Calendar 
			onChange={this.onChange}
			value={this.state.date}
			calendarType="US"
		/>
		</center>
        </header>
		<div className="Container">
			<section className="add-item">
			<section className="display-date">
			<center><td>{this.state.date.toJSON().substr(0,10)}</td></center>
			</section>
			<div className="habits">
			<ul>{this.state.post}</ul>
			</div>
			</section>
		</div>
      </div>
    );
  }
}

export default App;
