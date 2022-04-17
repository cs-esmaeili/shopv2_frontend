import React from "react";
import Modal from './../HOC/Modal';
import CreatePost from '../../contents/CreatePost';

const EditPost = ({ data , onSubmit }) => {
    return (
        <Modal obj_id="Modal_EditPost" close={true} footer={null} title="" size="80%">
            <CreatePost edit={true} data={data}  onSubmit={onSubmit}/>
        </Modal>
    );
}
export default EditPost;
