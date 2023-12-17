import React, { Component } from 'react'
import axios from 'axios'

export class Create extends Component {
    
    constructor(props) {
        super(props);
        this.state = { task: '' };

        this.handleAdd = this.handleAdd.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleAdd() {
        axios.post('http://localhost:3001/add', {
            task: this.state.task
        }).then(() => {
            console.log('Success :D')
            location.reload()
        }).catch((error) => {
            console.log(error)
        })   
    }

    handleChange(event) {
        this.setState({task: event.target.value});
    }

    render() {
        return (
            <div className="create-container">
                <input type="text" className="create-input" name="" id="" placeholder='Nombre de la tarea' onChange={this.handleChange}/>
                <button type="button" onClick={this.handleAdd} className="create-button">Agregar</button>
            </div>
        )
    }
}

export default Create
