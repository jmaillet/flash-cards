

import React, { Component } from 'react';
import {ToastContainer, toast} from 'react-toastify';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css'; 

import { Card } from './card';

import { Operands, generateOperands, isCorrect, OperationKey, OpConfig, config } from './core';


interface State {
  selectedOperation: OperationKey;

  operands: Operands;
  checkAnswer: (answer: number) => boolean;
  currentAnswer: number | null;
}

class App extends Component<any, State>{

  constructor(props: any) {
    super(props);
    this.state = this.getState('addition');
    this.onSelectOperation = this.onSelectOperation.bind(this);
  }

  onSelectOperation = (e: any) => {
    e.preventDefault();
    const op = e.target.id as OperationKey;
    this.setState(this.getState(op));
  }

  getState(op: OperationKey) {
    const operands = generateOperands(op);
    return {
      selectedOperation: op,
      operands: operands,
      checkAnswer: isCorrect(op)(operands),
      currentAnswer: null
    }
  }

  onNext() {
    this.setState(this.getState(this.state.selectedOperation));
  }

  onAnswerSubmitted(answer:number) {
      if(this.state.checkAnswer(answer)){
        toast('Yay! You did it!', {type: 'success'});
        this.onNext();
      }else{
        toast('Try again. You can do it!', {type: 'error'});
      }
  }

  render() {
    const { operands, selectedOperation } = this.state;
    console.log(operands);
    return (
      <div className="container">
      <ToastContainer autoClose={2000}/>
        <nav className="navbar navbar-expand-lg rounded">
          <div className="justify-content-center">
            <ul className="navbar-nav">
              {(Object.keys(config) as (keyof OpConfig)[]).map((key => <li key={key} className="nav-item"><a href="#" id={key} className={`nav-link ${key === this.state.selectedOperation ? 'active':''}`} onClick={this.onSelectOperation} >{config[key].title}</a></li>))}
            </ul>
          </div>
        </nav>
        <div className="row justify-content-center mb-3">

          <div className="col-lg-3 col-md-5 col-sm-6 col-12">
            <Card config={config[selectedOperation]} operands={operands} onAnswer={this.onAnswerSubmitted.bind(this)} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
