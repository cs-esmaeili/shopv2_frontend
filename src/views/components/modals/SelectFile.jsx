import React from "react";
import Modal from './../HOC/Modal';
import FileManager from '../../contents/FileManager';

const SelectFile = ({ data }) => {
    return (
        <Modal obj_id="Modal_FileManager_File" close={true} footer={null} title="انتخاب فایل" size="80%">
            <FileManager selectMode={'file'} data={data} />
        </Modal>
    );
}
export default SelectFile;
