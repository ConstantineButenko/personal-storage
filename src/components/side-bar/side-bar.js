import React, {Component} from 'react';
import Folder from '../folder';
import Form from './form/index'
import OpenedFolder from './opened-folder';
import './side-bar.css';

export default class SideBar extends Component {
    maxID = 100;


    addFolder = (header, text) => {
        return {header: header, text: text, id: Math.round(Math.random() * 100) }                 //Починить id
   }

   setFolders = (header, text) => {
        const oldFolders = this.state.folders;
        const newFolders = [...oldFolders, this.addFolder(header, text)];
        this.setState(({folders}) => {
            return {
                folders: newFolders
            }
        })
   }

   showFolder = (header, text, id) => {
     const shownFolder = this.state.displayForm ? <OpenedFolder
                         onChangeContent = {this.onChangeContent}
                         onClose = {this.onClose}
                         id = {id}
                         header = {header}
                         text = {text} ></OpenedFolder> : null
    this.setState(({openedFolder}) => {
        return {
            openedFolder: shownFolder
        }
    })
   }


   showForm = () => {
    if (this.state.openedFolder === null) this.setState(({displayForm}) => {
        return {
            displayForm: !displayForm
        }
    })
}  

    onClose = (id, header, text) => {
        const newFolders = this.state.folders;
        const idx = newFolders.findIndex(item => item.id === id);
        newFolders[idx].header = header;
        newFolders[idx].text = text;
        this.setState({openedFolder: null,
                        folders: newFolders}, )
    }

    onRemove = (id, e) => {
        e.stopPropagation();
        const {folders} = this.state;
        const idx = folders.findIndex(item => item.id === id);
        const start = idx ? 0 : 1
        const newFolders = [...folders.slice(start, idx), ...folders.slice(idx + 1)]
        this.setState(({folders: newFolders}))
    }

    state = {
        openedFolder: null,
        displayForm: true,
        folders: [
            this.addFolder('Цель номер один', `Доделать логику фронтенда - добавить возможность редактировать содержимое папок,
                                                удалять папки, настроить отображение даты `),
            this.addFolder('Цель номер два', `Сделать нормальный дизайн, расположение, фоны, границы, иконки`),
            this.addFolder('Цель номер три', `Прикрутить бэкенд - настроить работу с сервером, базу данных, GET, POST-реквесты
                                               валидацию форм`)
        ]
    }

     render () {
        const {folders, displayForm, openedFolder} = this.state;
        const buttonLabel = displayForm ? 'Нажмите, чтобы добавить папку' : 'Нажмите, чтобы закрыть окно'
        const foldersContent = folders.map(folder => <Folder
                                                     onRemoveButton = {this.onRemove}
                                                     onShowFolder = {this.showFolder}
                                                     key = {folder.id}
                                                     id = {folder.id}
                                                     header = {folder.header}
                                                     text = {folder.text}></Folder>)
        return (
            <div>
            <div
            className = 'side-bar'>
                {foldersContent}
            </div>
            <div
            className = 'main-menu'>
                <button
                onClick = {this.showForm}
                className = 'get-form-button'>{buttonLabel}</button>
                <Form
                onAddFolder = {this.setFolders}
                selfHidden = {displayForm}
                className = 'form'></Form>
            </div>
            {openedFolder}
            </div>
            
        )
        }}