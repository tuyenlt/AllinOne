import axios from "axios";
import * as cheerio from 'cheerio';
import { useState, useEffect } from "react";
import { faArrowsRotate } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './Cnn.css'


const url = "https://edition.cnn.com"


interface PostData {
    link: string | undefined;
    name: string | undefined;
}

interface PC {
    Tech: string
    Sports: string
    Science: string
    Markets: string
    Health: string
    Entertainment: string
}


const postCategories: PC = {
    Tech: "/business/tech",
    Sports: "/sport",
    Science: "/science",
    Markets: "/markets",
    Health: "/health",
    Entertainment: "/entertainment",
}

async function getCnnPosts(postCategory = postCategories.Tech, postLimit = 20): Promise<PostData[]> {
    let cnnPosts: PostData[] = [];
    try {
        const response = await axios.get(url + postCategory);
        const $ = cheerio.load(response.data);
        let postEles = $('a.container__link').toArray();
        let countPostLimit = 0;

        for (const ele of postEles) {
            let eleData: PostData = {
                "link": url + $(ele).attr('href'),
                "name": $(ele).find('span.container__headline-text').text(),
            };
            if (eleData.name == "") continue;
            countPostLimit++;
            if (countPostLimit === postLimit) break;
            cnnPosts.push(eleData);
        }
    } catch (error) {
        console.log(`Error fetching the URL: ${url}`, error);
    }
    return cnnPosts;
}

function Cnn() {

    const [cnnPosts, setCnnPosts] = useState<PostData[]>([]);
    const [selectedCategory, setSelectedCategory] = useState('');



    const fetchPosts = async () => {
        const posts = await getCnnPosts(selectedCategory);
        setCnnPosts(posts);
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const handleClick = (link: string | undefined) => {
        if (link) {
            window.open(link, '_blank');
        }
    };

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue: keyof PC = event.target.value as keyof PC;
        setSelectedCategory(postCategories[selectedValue])
    };

    return (
        <div className="container">
            <div className="card">
                <div className="text-center">
                    <nav className="navbar navbar-expand-lg bg-body-tertiary">
                        <div className="container-fluid d-flex align-items-center justify-content-center">
                            <div>
                                <img
                                    src="./src/assets/images/CNN.webp"
                                    alt=""
                                    style={{ maxWidth: '50px', borderRadius: '10px', margin: '0 20px 0 20px' }}
                                />
                            </div>
                            <div className="input-group mb-3" style={{ maxWidth: '70%', margin: '15px 0 0 0' }}>
                                <label className="input-group-text"
                                    htmlFor="inputGroupSelect01">Choose Category</label>
                                <select className="form-select" id="inputGroupSelect01" onChange={handleSelectChange}>
                                    {
                                        Object.keys(postCategories).map((category: string) => (
                                            <option key={category} value={category}>{category}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            <button className="btn btn-danger ms-3 " onClick={() => {
                                fetchPosts()
                            }}>
                                <FontAwesomeIcon className="reload-btn" icon={faArrowsRotate} />
                            </button>
                        </div>
                    </nav>
                </div>
                <ul className="list-group">
                    {cnnPosts.map((post, index) => (
                        <li
                            className="list-group-item hover-hightlight-list"
                            role="button"
                            key={index}
                            onClick={() => handleClick(post.link)}
                        >
                            <strong>{post.name}</strong>
                        </li>
                    ))}
                </ul >
            </div>
        </div>
    );
}

export default Cnn;