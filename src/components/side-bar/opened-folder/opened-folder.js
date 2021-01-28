import React, {Component} from 'react';
 import './opened-folder.css';

export default class OpenedFolder extends Component {

    state = {
        id: this.props.id,
        ownHeader: this.props.header,
        ownText: this.props.text,
        DIV: false,
        H1: false
    }

     onEdit = (e) => {
        e.stopPropagation();
        const type = e.target.tagName;
        const value = this.state[type] ? false : true;
        this.setState({[type] : value})             // Костыль, найти объяснение/решение и сделать рефакторинг
        }

    onBlur = (e) => {
        e.preventDefault()
        if (e.target.name === 'H1') {
            const header = e.target.value;
            this.setState({H1 : false,
                        ownHeader: header})
        }
        else  {
            const text = e.target.value;
            this.setState({DIV : false,
                        ownText: text})
        }
    }

    render() {
    const {onClose, header, text} = this.props;
    const {ownHeader, ownText, DIV, H1, id} = this.state;
    const textValue = ownText ? ownText : text;
    const headerValue = ownHeader ? ownHeader : header;
    const domHeader = H1 ? <textarea
                             name = 'H1'
                             onBlur = {(e) => this.onBlur(e)}
                             defaultValue = {headerValue}></textarea> : <h1
    onClick = {(e) => this.onEdit(e)}>{headerValue}</h1>
    const domText = DIV ? <textarea
    onBlur = {(e) => this.onBlur(e)}
    name = 'DIV'
    onSubmit = {(e) => this.onSubmit(e)}
    defaultValue = {textValue}></textarea>  : <div
    onClick = {(e) => this.onEdit(e)}>{textValue}</div>
    return (
        <div
        className = 'opened-folder'>
            <div className = 'top-form'>
            {domHeader}
            <button
            className = 'close-button'
            onClick = {() => onClose(id, ownHeader, ownText)}></button></div>
            {domText}
        </div>
    )
}}
