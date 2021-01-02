import React, {Component} from 'react';
 import './opened-folder.css';

export default class OpenedFolder extends Component {

    state = {
        ownHeader: null,
        ownText: null,
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
        const text = e.target.typeofchange === 'ownText' ? e.target.value : this.state.text;
        const header = e.target.typeofchange === 'ownHeader' ? e.target.value : this.state.header;
        const oldHeader = this.state.ownHeader;
         this.setState({[e.target.name] : false,
                        ownHeader: header,
                         ownText: text})
        this.props.onChangeContent(oldHeader, header, text)
    
    }

    render() {
    const {onClose, header, text} = this.props;
    const {ownHeader, ownText, DIV, H1} = this.state;
    const textValue = ownText ? ownText : text;
    const headerValue = ownHeader ? ownHeader : header;
    const domHeader = H1 ? <textarea
                             typeofchange = 'ownHeader'
                             name = 'H1'
                             onBlur = {(e) => this.onBlur(e)}
                             defaultValue = {headerValue}></textarea> : <h1
    onClick = {(e) => this.onEdit(e)}>{headerValue}</h1>
    const domText = DIV ? <textarea
    onBlur = {(e) => this.onBlur(e)}
    typeofchange = 'ownText'
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
            onClick = {() => onClose()}></button></div>
            {domText}
        </div>
    )
}}
