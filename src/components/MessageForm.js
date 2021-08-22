import { gql } from "apollo-boost"
import { useState } from "react"
import { useMutation } from '@apollo/react-hooks'

const CREATE_MESSAGE = gql`
  mutation CreateMessage($title: String!, $content: String!, $author: String!) {
    createMessage(title: $title, content: $content, author: $author) {
      _id
    }
  }
`;

const MessageForm = () => {
  const [content, setContent] = useState("")
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")

  const [ createMessage ] = useMutation(CREATE_MESSAGE)

  return (
    <div className="form-group row">
      <div className="col-md-6 offset-md-3">
        <div className="card">
          <div className="card-body">
            <form
                onSubmit={
                   async e => {
                        e.preventDefault()
                        
                        await createMessage({
                            variables: {
                                title,
                                author,
                                content
                            }
                        })

                        window.location.href="/"
                    }
                }
            >
              <div className="form-group mb-3">
                <input
                  type="text"
                  placeholder="Author"
                  className="form-control"
                  onChange={ (e) => setAuthor(e.target.value) }
                  value={author}
                />
              </div>

              <div className="form-group mb-3">
                <input
                  type="text"
                  placeholder="Write a Message"
                  className="form-control"
                  onChange={ (e) => setTitle(e.target.value) }
                  value={title}
                />
              </div>

              <div className="form-group mb-3">
                <textarea 
                    rows="2" 
                    className="form-control"
                    onChange={ (e) => setContent(e.target.value) }
                    value={content}
                ></textarea>
              </div>

              <div className="form-group d-grid gap-2">
                <button className="btn btn-primary ">Send Message</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageForm;
