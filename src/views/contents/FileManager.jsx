import React, { useEffect, useState } from 'react';
import { _deletePublicFolderOrFile, _createPublicFolder, _savePublicFiles, _movePublicFileAndFolder, _publicFolderFilesLinks } from './../../services/FileManager';
import useGenerator from "../../global/Idgenerator";
import { toast } from 'react-toastify';
import UploadFile from './../components/modals/UploadFile';
import FileDetails from '../components/modals/FileDetails';
import { useSelector } from 'react-redux';
import FileMove from './../components/modals/FileMove';
import FileRename from '../components/modals/FileRename';

const FileManager = ({ selectMode = null, data = null }) => {

    const [currentFolderFiles, setCurrentFolderFiles] = useState(null);
    const [currentPath, setCurrentPath] = useState("/");
    const [selectedItems, setSlectedItems] = useState(null);
    const [persent, setPersent] = useState(null);
    const [generateID] = useGenerator();
    const permission = useSelector(state => state.profile.permissions).includes('fileManager_page');

    const publicFolderFiles = async (path) => {
        try {
            const data = {
                path,
            };
            const respons = await _publicFolderFilesLinks(data);
            if (respons.data.statusText === "ok") {
                document.getElementById('path').value = path;
                setCurrentFolderFiles(respons.data.list);
            } else {
                toast(respons.data.message);
            }
        } catch (error) { }
    }
    const deleteFilesAndFolder = async () => {
        try {
            const data = {
                path: currentPath,
                list: selectedItems,
            };
            const respons = await _deletePublicFolderOrFile(data);
            if (respons.data.statusText === "ok") {
                publicFolderFiles(currentPath);
            }
            toast(respons.data.message);
        } catch (error) { }
    }
    const createFolder = async (path) => {
        try {
            const data = {
                path,
            };
            const respons = await _createPublicFolder(data);
            if (respons.data.statusText === "ok") {
                publicFolderFiles(currentPath);
            }
            toast(respons.data.message);
        } catch (error) { }
    }


    const MoveHandler = async (path, items) => {
        try {
            const data = {
                old_path: currentPath,
                new_path: path,
                items,
            };
            const respons = await _movePublicFileAndFolder(data);
            if (respons.data.statusText === "ok") {
                publicFolderFiles(currentPath);
            }
            toast(respons.data.message);
        } catch (error) { }
    }

    const uploadFile = async (event) => {
        event.preventDefault();
        try {
            let data = new FormData();
            data.append("path", currentPath);
            data.append("params", JSON.stringify([]));
            for (let i = 0; i < event.target.files.length; i++) {
                data.append("file[]", event.target.files[i]);
            }
            const respons = await _savePublicFiles(data, (persent) => {
                setPersent(persent);
                if (persent === 100) {
                    setPersent(null);
                    setTimeout(() => {
                        document.getElementById('Modal_UploadFile_open').click()
                        document.getElementById('uploaderProgress').style.width = "0%";
                    }, 500);
                }
            }, () => document.getElementById('Modal_UploadFile_open').click());

            if (respons.data.statusText === "ok") {
                publicFolderFiles(currentPath);
            }
            toast(respons.data.message);
        } catch (error) { }
    }

    const handelSelect = async () => {
        if (selectMode === 'folder') {
            try {
                const obj = {
                    path: currentPath + selectedItems[0] + '/',
                };

                const respons = await _publicFolderFilesLinks(obj);
                if (respons.data.statusText === "ok") {
                    data({ folder: selectedItems[0], foler_path: currentPath + selectedItems[0] + '/', files: respons.data.list });
                    document.getElementById('Modal_FileManager_Folder_open').click();
                    document.getElementById('Modal_EditProduct').style.overflowY = 'auto';
                } else {
                    toast(respons.data.message);
                }
            } catch (error) {
                console.log(error);
            }
        } else {
            data({ foler_path: currentPath + selectedItems[0] + '/', file: selectedItems[0] });
            document.getElementById('Modal_FileManager_Folder_open').click();

        }
    }

    useEffect(() => {
        publicFolderFiles(currentPath);
    }, []);

    let timer;
    let ignore = false;
    if (permission === false) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
                <div>شما به این قسمت دسترسی ندارید</div>
            </div>
        );
    } else {
        return (
            <>
                <FileDetails item={selectedItems} />
                <UploadFile persent={persent} />
                <FileMove items={selectedItems} old_path={currentPath} reloadMethod={() => publicFolderFiles(currentPath)} />
                <FileRename old_name={(selectedItems != null) ? selectedItems[0] : ""} path={currentPath} reloadMethod={() => publicFolderFiles(currentPath)} />
                <div className="shadow p-3 mb-5 bg-white rounded">
                    <div className="row">
                        <input className="form-control" id="path" value={currentPath} onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                setCurrentPath(e.target.value);
                                publicFolderFiles(e.target.value);
                            }
                        }}
                            onChange={(e) => {
                                setCurrentPath(e.target.value);
                            }} />
                    </div>
                    <div className="row">
                        <i className="fas fa-home m-2 customHover noSelect" style={{ cursor: "pointer" }} onClick={() => { setCurrentPath('/'); publicFolderFiles('/'); }}> Home </i>
                        <i className="fas fa-arrow-left m-2 customHover noSelect" style={(currentPath === "/") ? { pointerEvents: 'none' } : { cursor: "pointer" }} onClick={() => {
                            let index = -1;
                            for (let i = currentPath.length - 2; i >= 0; i--) {
                                if (currentPath[i] === '/') {
                                    index = i;
                                    break;
                                }
                            }
                            let newPath = currentPath.substring(0, index + 1);
                            setCurrentPath(newPath);
                            publicFolderFiles(newPath);
                        }}> Back </i>
                        <i className="fas fa-sync-alt m-2 customHover noSelect" style={{ cursor: "pointer" }} onClick={() => {
                            publicFolderFiles(currentPath);
                        }}> Reload </i>
                        {(selectMode === null) &&
                            <>
                                <i className="far fa-square m-2 customHover noSelect" style={{ cursor: "pointer" }} onClick={() => {
                                    setSlectedItems(null);
                                }}> Unselect All </i>

                                <i className="far fa-check-square m-2 customHover noSelect" style={{ cursor: "pointer" }} onClick={() => {
                                    let files = document.querySelector('.listFiles').querySelectorAll('div');
                                    let items = [];
                                    for (let i = 0; i < files.length; i++) {
                                        if (files[i].querySelector('div') !== null) {
                                            if (files[i].querySelector('div').innerHTML.includes(".")) {
                                                items.push(files[i].querySelector('div').innerHTML);
                                            } else {
                                                items.push(files[i].querySelector('div').innerHTML);
                                            }
                                        }
                                    }

                                    setSlectedItems(items);
                                }}> Select All </i>
                            </>
                        }
                        <i className="fa fa-trash m-2 customHover noSelect" style={(selectedItems === null) ? { pointerEvents: 'none' } : { cursor: "pointer" }} onClick={() => {
                            if (selectedItems !== null) {
                                deleteFilesAndFolder();
                            }
                        }}> Delete </i>
                        <div className="dropdown">
                            <i className=" dropdown-toggle fas fa-folder-plus m-2 customHover noSelect" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style={{ cursor: "pointer" }}> NewFolder </i>
                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                <input type="text" onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        createFolder(currentPath + e.target.value);
                                        e.target.value = "";
                                    }
                                }} />
                            </div>
                        </div>
                        <i className="fas fa-arrows-alt m-2 customHover noSelect" style={{ cursor: "pointer" }} onClick={() => {
                            document.getElementById('Modal_FileMove_open').click();
                        }}> Move </i>
                        <i className="fas fa-edit m-2 customHover noSelect" style={{ cursor: "pointer" }} onClick={() => {
                            document.getElementById('Modal_FileRename_open').click();
                        }}> Rename </i>
                        <label htmlFor="file">
                            <i className="fas fa-upload m-2 customHover noSelect" style={{ cursor: "pointer" }}> Upload </i>
                        </label>
                        <input
                            id="file"
                            type="file"
                            accept="image/*"
                            aria-describedby="file"
                            multiple
                            style={{ display: "none" }}
                            onChange={uploadFile}
                        />
                    </div>
                </div>
                <div className="row listFiles">
                    {currentFolderFiles != null && currentFolderFiles === "location is empty" &&
                        <div className="w-100" style={{ textAlign: "center" }}>
                            پوشه خالی است
                        </div>
                    }
                    {currentFolderFiles != null && currentFolderFiles !== "location is empty" &&
                        currentFolderFiles.map((value, index) => {

                            return (
                                <div
                                    draggable="true"
                                    onDragOver={(e) => e.preventDefault()}
                                    onDragStart={(e) => {
                                        e.dataTransfer.setData("name", value.name);
                                    }}
                                    onDrop={(e) => {
                                        e.preventDefault();
                                        var data = e.dataTransfer.getData("name");
                                        MoveHandler(currentPath + value.name + '/', [data]);
                                    }}
                                    key={generateID()}
                                    onClick={(e) => {
                                        ignore = false;
                                        if ((selectMode === 'file' && value.name.includes('.'))
                                            || (selectMode === 'folder' && !value.name.includes('.'))
                                            || selectMode == null) {
                                            timer = setTimeout(() => {
                                                if (ignore === false) {
                                                    if (e.shiftKey && selectMode === null) {
                                                        if (selectedItems != null && selectedItems.includes(value.name)) {
                                                            let index = selectedItems.indexOf(value.name);
                                                            if (index !== -1) {
                                                                selectedItems.splice(index, 1);
                                                                setSlectedItems([...selectedItems]);
                                                            }
                                                        } else {
                                                            if (selectedItems == null) {
                                                                setSlectedItems(new Array(value.name));
                                                            } else {
                                                                setSlectedItems([...selectedItems, value.name]);
                                                            }
                                                        }
                                                    } else {
                                                        setSlectedItems(new Array(value.name));
                                                    }
                                                }
                                            }, 200);
                                        }
                                    }}
                                    onDoubleClick={(e) => {
                                        clearTimeout(timer);
                                        ignore = true;
                                        if (value.name.includes('.')) {
                                            setSlectedItems([value.name]);
                                            document.getElementById('Modal_FileDetails_open').click();
                                        } else {
                                            setSlectedItems(null);
                                            setCurrentPath(currentPath + value.name + "/");
                                            publicFolderFiles(currentPath + value.name + "/");
                                        }
                                    }}
                                    className={(selectedItems !== null && selectedItems.includes(value.name)) ?
                                        "col-xl-1 col-lg-2 col-md-3 col-sm-4 text-truncate customHover selectedItems"
                                        :
                                        "col-xl-1 col-lg-2 col-md-3 col-sm-4 text-truncate customHover"
                                    }
                                    style={{
                                        margin: "10px",
                                        textAlign: "center",
                                    }}>
                                    {(value.name.includes('.') ?
                                        <img src={value.link} alt="File" style={{ width: "80px", height: "80px" }} />
                                        :
                                        <i className="fa fa-5x fa-folder" aria-hidden="true"></i>
                                    )}
                                    <div>{value.name}</div>
                                </div>
                            );
                        })
                    }
                    {(selectMode !== null) &&
                        <button className="btn btn-primary btn-user btn-block" onClick={() => {
                            handelSelect();

                        }}>
                            انتخاب
                        </button>
                    }
                </div>
            </>
        );
    }
}
export default FileManager;
