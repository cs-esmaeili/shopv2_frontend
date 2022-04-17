import React from "react";
import Modal from '../HOC/Modal';
import FileManager from '../../contents/FileManager';

const SelectFolder = ({ data }) => {
    return (
        <Modal obj_id="Modal_FileManager_Folder" close={true} footer={null} title="انتخاب پوشه" size="80%">
            <FileManager selectMode={'folder'} data={data} />
        </Modal>
    );
}
export default SelectFolder;
