import { useEffect, useState } from 'react';
import { _changePostStatus, _postList, _deletePost } from '../../services/Post';
import Table from './../components/Table';
import { toast } from 'react-toastify';
import EditPost from './../components/modals/EditPost';

const PostList = () => {

    const [posts, setPosts] = useState(null);
    const [data, setData] = useState(null);

    const getPosts = async () => {
        try {
            const respons = await _postList();
            console.log(respons);
            if (respons.data.statusText === "ok") {
                setPosts(respons.data.list);
                setData(respons.data.list[0]);
            }
        } catch (error) { }
    }
    const changePostStatus = async (post_id, status) => {
        try {
            const respons = await _changePostStatus({ post_id, status });
            console.log(respons);
            if (respons.data.statusText === "ok") {
                getPosts();
            }
            toast(respons.data.message);
        } catch (error) { }
    }
    const deletePost = async (post_id) => {
        try {
            const respons = await _deletePost({ post_id });
            console.log(respons);
            if (respons.data.statusText === "ok") {
                getPosts();
            }
            toast(respons.data.message);
        } catch (error) { }
    }
    const columens = (row, generateID) => {
        return (
            <>
                <th key={generateID()} scope="col" className="text-center">
                    <button type="button" className="btn btn-danger m-2" onClick={() => deletePost(row.post_id)}>حذف</button>
                    <button type="button" className="btn btn-warning m-2" onClick={() => changePostStatus(row.post_id, (row.status === 1) ? 0 : 1)} >{(row.status === 1) ? "لغو انتشار" : "انتشار"}</button>
                    <button type="button" className="btn btn-success m-2" onClick={() => { setData(row); document.getElementById('Modal_EditPost_open').click(); }}>تغییر</button>
                </th>
                <th key={generateID()} scope="col" className="text-center">{row.post_id}</th>
                <th key={generateID()} scope="col" className="text-center">{row.title}</th>
                <th key={generateID()} scope="col" className="text-center">{row.person.name + " " + row.person.family}</th>
            </>
        );
    }

    useEffect(() => {
        getPosts();
    }, [])

    return (
        <>
            {(posts != null && data != null) &&
                <>
                    <EditPost data={data} onSubmit={() => getPosts()} />
                    <Table titles={[
                        "عملیات",
                        "ID",
                        "عنوان",
                        "نویسنده",
                    ]} data={posts} select={false} columens={columens} />
                </>
            }
        </>
    );
}


export default PostList;
