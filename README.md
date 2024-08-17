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
```ts

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

```python