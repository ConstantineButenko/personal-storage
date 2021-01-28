import React, {Component} from 'react';
import './form.css'

export default class Form extends Component {
    
    state = {
        formValue: '',
        headerValue: ''
    }

    onChange = (e) => {
        const newValue = e.target.value;
        const valueName = e.target.name;
        this.setState({ [valueName] : newValue})
    }

    onSubmit = (e) => {
        e.preventDefault();
        const {headerValue, formValue} = this.state;
        this.props.onAddFolder(headerValue, formValue);
    } 

    render () {
        const {formValue } = this.state;
        return (
            <form
            onSubmit = {this.onSubmit}
            hidden = {this.props.selfHidden}
            className = 'form'>
                <input
                maxLength = "15"
                onChange = {this.onChange}
                placeholder = 'Введите заголовок'
                type = 'text'
                name = 'headerValue' />
               <textarea
               name = 'formValue'
               onChange = {this.onChange}
               placeholder = 'Введите основной текст'
               value = {formValue} ></textarea>
               <button
               className = 'submit-button'
               type = 'submit'></button>
            </form>
        )
    }
}
