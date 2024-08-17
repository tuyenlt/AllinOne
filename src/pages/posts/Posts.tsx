import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons'

// Define the type for a Post
interface Post {
    id: number;
    postOwnerId: string;
    postOwnerName: string;
    avatarSrc: string
    title: string;
    type: "post" | "comment"
    content: {
        text: string;
        imgPath: string | undefined;
    }
    react: {
        like: number;
        dislike: number;
        love: number;
    }
    comment: Post | any | undefined
}

// Example posts data
const examplePosts: Post[] = [
    {
        id: 1,
        postOwnerId: "tuyenlt",
        postOwnerName: "Lê Trọng Tuyên",
        avatarSrc: "vite.svg",
        title: 'First Post',
        type: "post",
        content: {
            text: 'This is the content of the first post.',
            imgPath: undefined
        },
        react: {
            like: 1,
            dislike: 0,
            love: 1
        },
        comment: undefined
    }

];

const Posts: React.FC = () => {
    return (
        <div className="container mt-4">
            <h2 className="mb-4">Posts</h2>
            {examplePosts.map(post => (
                <div className="" key={post.id}>
                    <div className="card h-100">
                        <div className="card-body">
                            <h5 className="card-title">
                                <img src={post.avatarSrc} style={{ width: '40px', height: '40px', borderRadius: '100%', margin: '0 10px 0 10px' }}></img>
                                {post.postOwnerName}
                            </h5>
                            <p className="card-text" style={{ margin: "0 10px 0 10px" }}>{post.content.text}</p>
                            {
                                post.content.imgPath != undefined
                                    ? <img src={post.content.imgPath} className='w-100'></img>
                                    : <></>
                            }
                            <div className="post-footer">
                                <div className="react-section">
                                    <FontAwesomeIcon icon={faThumbsUp} />
                                </div>
                            </div>
                            <div className="comment-section"></div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Posts;
