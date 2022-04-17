import React from "react";
import Modal from '../HOC/Modal';
import CreateProduct from '../../contents/CreateProduct';

const EditProduct = ({ data, onSubmit }) => {
    return (
        <Modal obj_id="Modal_EditProduct" close={true} footer={null} title="" size="80%">
            <CreateProduct edit={true} data={data} onSubmit={onSubmit}/>
        </Modal>
    );
}
export default EditProduct;
