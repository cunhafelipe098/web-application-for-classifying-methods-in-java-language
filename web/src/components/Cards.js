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
        <Table className='resultTable' striped >
					<thead >
						<tr>
              <th>Métrica</th>
              <th>Valor</th>
              <th>Descrição</th>
						</tr>
					</thead>
					<tbody>
            {this.state.metrics.map(({name, score, description}) => {return (
              <tr>
                <th>{name}</th>
                <th>{score}</th>
                <th>{description}</th>
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
                text='O usuário submete sua função pelo front-end através de um input de texto, esse dado é enviado ao back-end pelo cliente http. No back-end a requisição é tratada e então submetida ao módulo de extração de métricas que retorna uma coleção de métricas com seus respectivos valores. Em seguida, as métricas de software são fornecidas ao classificador que retorna a classificação da função. Após a classificação, a requisição é respondida contendo a classificação da função e as métricas. Por fim essas informações são apresentadas na tela para o usuário.'
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
