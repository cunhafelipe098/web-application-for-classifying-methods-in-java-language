import React, { Component, useEffect } from 'react';
import './Cards.css';
import CardItem from './CardItem';
import {
	Table
} from 'reactstrap';


import api from '../services/api'

export default class Cards extends Component {

  state = {
    "content": '',
    "language": {"name": "java"},
    "loading": false,
    "classification": {"classified": false, value: ''},
    "metrics": []
  };

  handleSubmit = async e => {

    e.preventDefault();

    await this.setState({ "loading": true });

    try {
      const response = await api.post('/function-code/classify',  {
        "language": this.state.language,
        "content": `class GenericClass {${this.state.content}}`
      });
      await this.setState({"metrics": response.data.metrics})
      await this.setState({"classification": {"classified": true, value: response.data.classification} });
       
    } catch (error) {
      console.log("ERROR  --  " + error);
    }
    
    await this.setState({ "loading": false });
    // await this.setState({ "loading": false });

  };

  handleInputChange = e => {
    this.setState({ content: e.target.value });
  };

  classificationResult () {
		if(this.state.classification.classified){
			return <div>
        {(!this.state.classification.value) ?
          (
            <div className='cardsClassification' style={{backgroundColor: "#fab7bc"}}>
              <p style={{marginTop: '15px'}}>Classificação: Não segue boas praticas de Engenharia de Software</p>
            </div>
          )
          :
            (
            <div className='cardsClassification' style={{backgroundColor: "#aaf683"}}>
              <p style={{marginTop: '15px'}}>Classificação: Segue boas praticas de Engenharia de Software</p>
            </div>
          )
        }
        <Table striped >
					<thead >
						<tr>
              <th>Métrica</th>
              <th>Valor</th>
						</tr>
					</thead>
					<tbody>
            {this.state.metrics.map(({name, score}) => {return (
              <tr>
                <th>{name}</th>
                <th>{score}</th>
              </tr>
            )})}
					</tbody>
				</Table>
      </div>
		}
		return;
	}

  render () {
    const { content, loading } = this.state;
    if(loading) {
      return (
        <div className='Loading'>
        <div class="lds-default"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        <div>
          Classificando a função
        </div>
        </div>
      ) 
    }
    
    return (
      <div className='cards'>
        <h2>Descrição das etapas que seu código é submetido até a classificação</h2>
        <div className='cards__container'>
          <div className='cards__wrapper'>
            <ul className='cards__items'>
              <CardItem
                src=''
                text='Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'
                path='/'
              />
            </ul>
          </div>
        </div>
  
        <div className='input-areas'>
          <h2>Teste sua função</h2>
          <form className='inputArea' onSubmit={this.handleSubmit}>
            <textarea
              className='input'
              name='code'
              type='textarea'
              value={content}
              onChange={this.handleInputChange}
            />
            <input className='buttonSunmit' type="submit" value="Enviar" />
          </form>
        </div>    
        {this.classificationResult()}
      </div>      
    );
  }
}
