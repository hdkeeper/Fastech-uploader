'use strict';

class UploadField {
    /*
        selector - задаёт HTML-элемент, к которому будет прикреплено поле
        fieldId - уникальный идентификатор поля, строка
        multiple - поддержка множественных файлов, boolean
    */
    constructor(selector, fieldId, multiple = false) {
        this.fieldId = fieldId;
        this.multiple = multiple;
        this.files = [];

        this.hostElement = document.querySelector(selector);
        if (!this.hostElement) {
            throw new Error('Selector not found');
        }
        
        // Outer frame
        const frameElement = document.createElement('div');
        frameElement.className = 'upload-field';
        this.hostElement.append(frameElement);

        // File box
        this.fileBoxElement = document.createElement('div');
        this.fileBoxElement.className = 'file-box';
        frameElement.append(this.fileBoxElement);

        // Attach button
        const attachButtonElement = document.createElement('div');
        attachButtonElement.className = 'attach-button';
        attachButtonElement.addEventListener('click', this.onAttachButtonClick);
        frameElement.append(attachButtonElement);

        // File upload input
        this.inputFileElement = document.createElement('input');
        this.inputFileElement.type = 'file';
        this.inputFileElement.addEventListener('change', this.onFileSelect);
        frameElement.append(this.inputFileElement);

        this.getFiles();
    }

    // Получить список загруженных файлов/API
    async getFiles() {
        const res = await fetch(`/api/files/${this.fieldId}`);
        this.files = await res.json();
        this.update();
    }

    // Удалить один файл/API
    deleteFile(id) {
        return fetch(`/api/files/${this.fieldId}/${id}`, { method: 'DELETE' });
    }

    // Обновить UI
    update() {
        this.fileBoxElement.replaceChildren(...this.files.map((file, i) => {
            const fileElement = document.createElement('span');
            fileElement.className = 'file';

            const deleteElement = document.createElement('span');
            deleteElement.className = 'delete-icon';
            deleteElement.textContent = file.isNew ? '⋯' : '×';
            if (!file.isNew) {
                deleteElement.addEventListener('click', () => this.onDeleteClick(file.id));
            }
            fileElement.append(deleteElement);

            const filenameElement = document.createElement(file.isNew ? 'span' : 'a');
            filenameElement.className = 'filename';
            if (!file.isNew) {
                filenameElement.href = `/api/files/${this.fieldId}/${file.id}`;
            }
            filenameElement.textContent = file.name;
            fileElement.append(filenameElement);

            if (i < this.files.length - 1) {
                fileElement.append('; ');
            }

            return fileElement;
        }));
    }

    // Получить список файлов: [{ id, name }]
    get value() {
        return this.files;
    }

    // Задать список файлов
    set value(files) {
        this.files = files;
        this.update();
    }

    onAttachButtonClick = () => {
        this.inputFileElement.click();
    };

    
    onDeleteClick = async id => {
        await this.deleteFile(id);
        this.files = this.files.filter(f => f.id !== id);
        this.update();
    };

    onFileSelect = async () => {
        const selectedFile = this.inputFileElement.files[0];
        const newFile = { id: Math.random(), name: selectedFile.name, isNew: true };
        let fileToDelete = null;
        if (this.multiple) {
            this.files.push(newFile);
        } else {
            fileToDelete = this.files.pop();
            this.files = [newFile];
        }
        
        this.update();
        this.inputFileElement.value = null;

        // Отправить выбранный файл/API
        const form = new FormData();
        form.set('file', selectedFile, selectedFile.name);
        const uploadRes = await fetch(`/api/files/${this.fieldId}`, {
            method: 'POST',
            body: form
        });
        const readyFile = await uploadRes.json();

        if (!this.multiple && fileToDelete) {
            // Удалить прежний файл
            await this.deleteFile(fileToDelete.id);
        }

        newFile.isNew = false;
        newFile.id = readyFile.id;
        this.update();
    };
}
