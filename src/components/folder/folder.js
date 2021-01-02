import React, {Component} from 'react';
import './folder.css'

export default class Folder extends Component {

    

    state = {
        id: this.props.id,
        header: this.props.header,
        text: this.props.text,
    }

    render () {
        const {header, text, id } = this.state;
        const {onShowFolder, onRemoveButton} = this.props;
        return (
            <div
            onClick = {() => onShowFolder(header, text)}
            className = 'folder'>
                <button
                onClick = {(e) => onRemoveButton(id, e)}
                 className = 'remove-button'></button>
                <span
                text = {text}
                 className = 'header'>{header}</span>
            </div>
        )
    }
}