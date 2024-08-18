# posts type

```ts
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
```

# user 

```python
class Users(BaseModel):
    id : str
    email : str 
    password : str
    displayName : str 
    description : str
    avatar: str ## img path
    friendsLists : List[str]
    postsList : List[str]
    todoList : List[TodoModel]

```

# Api
## endpoint : https://allinoneapi.onrender.com

## login auth: /loginAuth
method: post
request body:
``` python
    email : str
    password : str
```
response data (object):
``` python
    id : str
    email : str 
    password : str
    displayName : str 
    description : str
    avatar: str ## img path
    friendsLists : List[str]
    postsList : List[str]
    todoList : List[TodoModel]
```

## regester: /userRegester
method: post
request body:
``` python
    email : str
    password : str
    displayName : str
```

## create post : /create-post
method: post
request body:
``` python
    id: str
    postOwnerId: str
    postOwnerName: str
    avatarSrc: str
    title: str
    type: Literal["post", "comment"]
    content: Content
    react: React
    comment: List[str]
```


## get post : /get-post
method: get
request body:
``` python
    id : str
```


