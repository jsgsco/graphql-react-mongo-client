import { gql } from 'apollo-boost'
import { useQuery } from '@apollo/react-hooks'

const GET_MESSAGES = gql`
    {
        messages {
            _id
            title
            content
            author
        }
    }
`

const MessageList = () => {

    const { loading, error, data } = useQuery(GET_MESSAGES)

    if (loading) return null
    if (error) return null 

    return ( 
        <div className="row">
            <div className="col-md-6 offset-md-3">
                {
                    data.messages.map(({ _id, title, content, author }) => (
                        <div className="card m-2" key={_id}>
                            <div className="card-body">
                                <h4>{title}</h4>
                                <p>{content}</p>
                                <p>{author}</p>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
     );
}
 
export default MessageList;