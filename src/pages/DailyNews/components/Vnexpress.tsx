import axios from "axios";
import * as cheerio from 'cheerio';
import { useState, useEffect } from "react";
import { faArrowsRotate } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './Cnn.css'

const corsUrl = "https://proxy.cors.sh/"
const url = "https://vnexpress.net/"

interface PostData {
    link: string | undefined;
    name: string | undefined;
}

interface PC {
    "Bất động sản": string
    "Khoa học": string
    "Giải trí": string
    "Thể thao": string
    "Kinh doanh": string
    "Thế giới": string
}


const postCategories: PC = {
    "Bất động sản": "/bat-dong-san",
    "Khoa học": "/khoa-hoc",
    "Giải trí": "/giai-tri",
    "Thể thao": "/the-thao",
    "Kinh doanh": "/kinh-doanh",
    "Thế giới": "/the-gioi",
}

async function getVnexpessPosts(postCategory = postCategories["Bất động sản"], postLimit = 20): Promise<PostData[]> {
    let VnexpessPosts: PostData[] = [];
    try {
        const response = await axios.get(corsUrl + url + postCategory, {
            headers: {
                'x-cors-api-key': 'temp_eee25594c24c213d5c989a1a7681fb80'
            }
        });
        const $ = cheerio.load(response.data);
        let postEles = $('h3.title-news').toArray();
        let countPostLimit = 0;

        for (const ele of postEles) {
            let eleData: PostData = {
                "link": $(ele).find('a').attr('href'),
                "name": $(ele).find('a').text(),
            };
            if (eleData.name == "") continue;
            countPostLimit++;
            if (countPostLimit === postLimit) break;
            VnexpessPosts.push(eleData);
        }
    } catch (error) {
        console.log(`Error fetching the URL: ${url}`, error);
    }
    return VnexpessPosts;
}

function Vnexpess() {

    const [VnexpessPosts, setVnexpessPosts] = useState<PostData[]>([]);
    const [selectedCategory, setSelectedCategory] = useState('');




    const fetchPosts = async () => {
        const posts = await getVnexpessPosts(selectedCategory);
        setVnexpessPosts(posts);
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
        <div className="card">
            <div className="text-center">
                <nav className="navbar navbar-expand-lg bg-body-tertiary">
                    <div className="container-fluid d-flex align-items-center justify-content-center">
                        <div>
                            <img
                                src="./public/Vnexpress.png"
                                alt=""
                                style={{ width: '50px', borderRadius: '2px', margin: '0 20px 0 20px' }}
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
                {VnexpessPosts.map((post, index) => (
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
    );
}

export default Vnexpess;