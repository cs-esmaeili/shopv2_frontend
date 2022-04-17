import Modal from './../HOC/Modal';
import { _publicFileInformation } from '../../../services/FileManager'
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const FileDetails = ({ item }) => {

    const [information, setInformation] = useState(null);

    const publicFileInformation = async () => {
        console.log(item);
        if (item == null) { return; }
        try {
            const data = { name: item[0] };
            const respons = await _publicFileInformation(data);
            if (respons.data.statusText === "ok") {
                setInformation(respons.data.file);
            } else {
                toast(respons.data.message);
            }
        } catch (error) { }
    }
    useEffect(() => {
        if((item + "").includes('.')){
            publicFileInformation();
        }
    }, [item]);

    return (
        <Modal obj_id="Modal_FileDetails" close={true} footer={null} title="اطلاعات فایل" size="80%">
            <div className="row justify-content-center">
                {(information != null) &&
                    <div className="col-12">
                        <div className="row">
                            <div className="col-xl-4 col-lg-4  col-md-12 col-sm-12 mb-2" style={{ textAlign: "left", direction: "rtl" }}>
                                <div>{information.orginal_name + " : نام در زمان آپلود"}</div>
                                <div>{information.new_name + " : نام فعلی"}</div>
                                <div>{information.created_at + " : زمان آپلود"}</div>
                                <div id="image_size"></div>
                                <button type="button" className="btn btn-info m-2" onClick={() => {
                                    navigator.clipboard.writeText(information.link).then(function () {
                                        toast("لینک کپی شد");
                                    }, function (err) {
                                        console.error('Async: Could not copy text: ', err);
                                    });
                                }} >Link</button>
                                <button type="button" className="btn btn-info m-2" onClick={() => {
                                    navigator.clipboard.writeText(information.file_id).then(function () {
                                        toast("کپی شد id");
                                    }, function (err) {
                                        console.error('Async: Could not copy text: ', err);
                                    });
                                }} >ID</button>
                            </div>
                            <div className="col-xl-8 col-lg-8  col-md-12 col-sm-12" style={{ borderStyle: "solid" }}>
                                <img id="file_image" className="img-fluid" src={information.link} alt="error" onLoad={(e) => {
                                    document.getElementById('image_size').innerHTML =
                                        document.getElementById('file_image').naturalWidth +
                                        'x' +
                                        document.getElementById('file_image').naturalHeight +
                                        " : ابعاد";
                                    document.getElementById('image_size').style.direction = "rtl";
                                    document.getElementById('image_size').style.textAlign = "left";
                                }} />
                            </div>
                        </div>
                    </div>
                }
            </div>
        </Modal>
    );
}
export default FileDetails;
