import React, { Component } from 'react';
import equals from 'ramda/es/equals';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Operands, ConfigEntry } from './core'

interface State {
  answer: string;
}

interface Props {
  config: ConfigEntry;
  operands: Operands;
  onAnswer: (answer: number) => void;
}

export class Card extends Component<Props, State> {

  constructor(props: any) {
    super(props);
    this.state ={answer:''};
    this.onAnswerChange = this.onAnswerChange.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);

  }

  componentDidUpdate(prevProps: Props){
    if(!equals(prevProps.operands,this.props.operands)){
      this.setState({
        answer:''
      })
    }
  }

  onAnswerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      answer: e.target.value
    });
  }

  onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {

    if (e.keyCode === 13) {
      this.props.onAnswer(parseInt(this.state.answer));
      
    }
  }


  render() {
    const { config, operands } = this.props;
    return (

      <div className="card  ">
        <div className="card-header"><h3>{config.title}</h3> </div>
        <div className="card-body">
          <div className="row">
            <div className="col">
              <h2 className="float-right">{operands.operand1}</h2>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <h2 className="float-right">{`${config.symbol} ${operands.operand2}`}</h2>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <hr />
              <input autoFocus type="text" className="form-control text-right font-weight-bold" value={this.state.answer || ''} onChange={this.onAnswerChange} onKeyDown={this.onKeyDown} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}


