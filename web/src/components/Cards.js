import React, { Component, useEffect } from 'react';
import './Cards.css';
import CardItem from './CardItem';


import api from '../services/api'

export default class Cards extends Component {

  state = {
    "content": '',
    "language": {"name": "java"},
    "loading": false,
    "classification": {"classified": false, value: ''}
  };

  handleSubmit = async e => {

    e.preventDefault();

    await this.setState({ "loading": true });

    try {
      const response = await api.post('/function-code/classify',  {
        "language": this.state.language,
        "content": this.state.content
      });
      await this.setState({ "classification": {"classified": true, value: response.data.classification} });
       
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
			return (!this.state.classification.value) ?
				(
					<div className="align-self-center" style={{
						height:30,
						backgroundColor: "#fab7bc",
						borderRadius: 4,
            maxWidth: '1120px',
            width: '90%',
            
						}}>
						<p style={{ marginTop: "8%", }} >Classificação: Não segue boas praticas de Engenharia de Software</p>
					</div>
				)
				:
			    (

					<div className="align-self-center" style={{
						width:100,
						height:30,
						backgroundColor: "#aaf683",
						borderRadius: 4,
						}}>
						<p style={{ marginTop: "8%", }} >Classificação: Segue boas praticas de Engenharia de Software</p>
					</div>
				);
		}
		return;
	}

  render () {
    const { content, loading } = this.state;
    if(loading) {
      return <div className='Loading'>carregando</div>
    }
    
    return (
      <div className='cards'>
        <h1>Descrição das etapas que seu código é submetido até a classificação</h1>
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

        <div>
          {this.classificationResult()}
        </div>
      </div>
      
    );
  }
}
