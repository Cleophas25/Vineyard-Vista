import "react-quill/dist/quill.snow.css";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Editor from "../components/Editor.jsx";
import { useAppContext } from "../context/appContext";
import { toast } from "react-toastify";
import axios from "axios";

export default function UpdatePost() {
  const { id } = useParams();
  const { user } = useAppContext();
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate();

   useEffect(() => {
     if (!user) {
       return navigate("/register");
     }
     if (user.isAdmin === false) {
       navigate("/");
       return;
     }
   }, [user, navigate]);

  useEffect(() => {
    const getPost = async () => {
      try {
        const result = await axios.get(
          `http://localhost:3000/api/v1/posts/${id}`
        );
        const { title, summary, content } =
          result.data.post;
        setTitle(title);
        setSummary(summary);
        setContent(content);
      } catch (error) {
        console.log(error.message);
      }
    };

    getPost();
  }, []);

   const handleProductImageUpload = (e) => {
     const file = e.target.files[0];

     TransformFileData(file);
   };

   const TransformFileData = (file) => {
     const reader = new FileReader();

     if (file) {
       reader.readAsDataURL(file);
       reader.onloadend = () => {
         setFiles(reader.result);
       };
     } else {
       setFiles("");
     }
   };

  async function updatePost(ev) {
    ev.preventDefault();
    try {
      if(!title || !summary || !content) {
       return toast.error('Enter All Values')
      }
      setIsLoading(true)
      const response = await axios.put(
        `http://localhost:3000/api/v1/posts/${id}`,
        {
          title: title,
          summary: summary,
          content: content,
          img: files,
        },
        {
          headers: {
            authorization: `Bearer ${user.token}`,
          },
        }
      );
        setIsLoading(false)
        toast.success("Post Updated");
        setTimeout(() => {
          navigate(`/blog`);
        }, 3000);
    } catch (error) {
      setIsLoading(false)
      toast.error(error.message)
    }
  }

  return (
    <div>
      <h3 className='text-center text-3xl font-semibold'>Update Post</h3>
      <form
        onSubmit={updatePost}
        className='max-w-5xl border-t-4 border-black bg-white rounded-md shadow-md py-8 px-10 my-12 mx-auto transition-all ease-in-out hover:shadow-lg'
      >
        <input
          type='title'
          placeholder={"Title"}
          value={title}
          onChange={(ev) => setTitle(ev.target.value)}
          className='w-full py-2 px-3 rounded-md border border-gray-300 focus:outline-none mb-4'
        />
        <input
          type='summary'
          placeholder={"Summary"}
          value={summary}
          onChange={(ev) => setSummary(ev.target.value)}
          className='w-full py-2 px-3 rounded-md border border-gray-300 focus:outline-none mb-4'
        />
        <input
          type='file'
          onChange={handleProductImageUpload}
          className='w-full py-2 px-3 rounded-md border border-gray-300 focus:outline-none mb-4'
        />
        <Editor value={content} onChange={setContent} />
        <button className='cursor-pointer text-white bg-black border-transparent rounded-md tracking-wider py-1 p-3 shadow-sm transition-all ease-in-out capitalize inline-block w-full hover:bg-gray-900 hover:shadow-lg mt-4' disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Update Post'}
        </button>
      </form>
    </div>
  );
}
