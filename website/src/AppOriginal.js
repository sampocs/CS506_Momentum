import React, { Component } from 'react';
import Calendar from 'react-calendar';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {
	  date: new Date(),
  }
  
    componentDidMount() {
	  var habitName = '';
	  var habitProp = '';
	  const habitsRef = firebase.database().ref('users/a@gmail_com/history/2019-04-16/'); //retrieve 'users' from firebase
	  habitsRef.on('value', (snapshot) => {
		let habits = snapshot.val();
		let newState = [];
		for (let habit in habits) {
		  habitName = habit;
		  newState.push({
			  id: habit
		  });
		  
		  const ref = firebase.database().ref('users/a@gmail_com/history/2019-04-16/'+habitName);
		  ref.on('value', (snapshot) => {
			  let subtasks = snapshot.val();
			  for (let subtask in subtasks) {
				  habitProp = subtask;
				  
				  newState.push({
					  screen: subtask,
					  property: subtask.value
				  });
				 
				  
				  const propRef = firebase.database().ref('users/a@gmail_com/history/2019-04-16/'+habitName+'/'+habitProp);
				  propRef.on('value', (snapshot) => {
					  let propers = snapshot.val();
					  for (let proper in propers) {
						  newState.push({
							  property: proper
						  });
					  }
				  })
			  }
		  });
		}
		this.setState({
		  habits: newState
		});
	  });
  }
	
  onChange = date => this.setState({date})
	
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
		<Calendar 
			onChange={this.onChange}
			value={this.state.date}
			calendarType="US"
			onClickDay={(value)=>alert('Clicked day: ',value)}
		/>
      </div>
    );
  }
}

  render() {
    return (
      <div className="App">
        <header className="Calendar">
		<center>
		<button class="button"><span>Momentum Tracker </span></button>
		<Calendar 
			onChange={this.onChange}
			value={this.state.date}
			calendarType="US"
			onClickDay={(value)=>alert('Clicked day: ',value)}
		/>
		</center>
        </header>
		<div className="Container">
			<section className="add-item">
			<section className="display-date">
			<center><td>{this.state.date.toLocaleDateString()}</td></center>
			</section>
				<form onSubmit={this.handleSubmit}>
					<section className='display-item'>
					<div className='wrapper'>
					<ol>
					{this.state.habits.map((habit) => {
						return (
						<li key={habit.id}>
							<h3>{habit.id}</h3>
							<ul>
							<li key={habit.screen}>
							<p>brought by: {habit.screen}</p>
							<p>Additionally: {habit.property}</p>
							</li>
							</ul>
						</li>
						)
					})}
					</ol>
					</div>
					</section>
				</form>
			</section>
		</div>
      </div>
    );
  }
}

export default App;
