

---

# Post Type (TypeScript Interface)

```typescript
interface Post {
    id: number;
    postOwnerId: string;
    postOwnerName: string;
    avatarSrc: string;
    title: string;
    type: "post" | "comment";
    content: {
        text: string;
        imgPath: string | undefined;
    };
    react: {
        like: number;
        dislike: number;
        love: number;
    };
    comment: Post | any | undefined;
}
```

# User Class (Python)

```python
class Users(BaseModel):
    id: str
    email: str
    password: str
    displayName: str
    description: str
    avatar: str  # img path
    friendsLists: List[str]
    postsList: List[str]
    todoList: List[TodoModel]
```

# API Endpoints

- **Endpoint**: `https://allinoneapi.onrender.com`
- **Login Authentication**: `/loginAuth`
    - Method: POST
    - Request Body:
        ```python
        {
            "email": str,
            "password": str
        }
        ```
    - Response Data (Object):
        ```python
        {
            "id": str,
            "email": str,
            "password": str,
            "displayName": str,
            "description": str,
            "avatar": str,  # img path
            "friendsLists": List[str],
            "postsList": List[str],
            "todoList": List[TodoModel]
        }
        ```

- **Register User**: `/userRegister`
    - Method: POST
    - Request Body:
        ```python
        {
            "email": str,
            "password": str,
            "displayName": str
        }
        ```

- **Create Post**: `/create-post`
    - Method: POST
    - Request Body:
        ```python
        {
            "id": str,
            "postOwnerId": str,
            "postOwnerName": str,
            "avatarSrc": str,
            "title": str,
            "type": Literal["post", "comment"],
            "content": Content,
            "react": React,
            "comment": List[str]
        }
        ```

- **Get Post**: `/get-post`
    - Method: GET
    - Request Body:
        ```python
        {
            "id": str
        }
        ```

---
