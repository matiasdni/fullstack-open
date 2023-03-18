import { useState } from "react";

export const CreateForm = ({ handleSubmit }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const addBlog = (event) => {
    event.preventDefault();
    handleSubmit({ title: title, author: author, url: url });
    setTitle("");
    setAuthor("");
    setUrl("");
  };

  return (
    <div className={"createDiv"}>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
          title
          <input
            type={"text"}
            value={title}
            name={"title"}
            onChange={({ target }) => setTitle(target.value)}
            placeholder="blog title"
            id="title"
          />
        </div>
        <div>
          author
          <input
            type={"text"}
            value={author}
            name={"author"}
            onChange={({ target }) => setAuthor(target.value)}
            placeholder="blog author"
            id="author"
          />
        </div>
        <div>
          url
          <input
            type={"text"}
            value={url}
            name={"url"}
            onChange={({ target }) => setUrl(target.value)}
            placeholder="blog url"
            id="url"
          />
        </div>
        <button type={"submit"} id="createButton">
          create
        </button>
      </form>
    </div>
  );
};
