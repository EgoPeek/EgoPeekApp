
import { useNavigate } from 'react-router'
import { IconBubble } from '../Misc/CustomComponents/IconBubble'
import './Chat.css'



const ChatMessage = ({ body, username, avatar, isSelf, time, msgKey }) => {
    const navigate = useNavigate()

    const clickEvent = (e) => {
        navigate(`/account/${username}`)
    }

    if (isSelf) {
        return (<div className='my-chat-bubble'>
            <div className='my-chat-message' style={{ textAlign: 'right' }} key={msgKey}>
                {time} {username}<br />{body}
            </div>
            <IconBubble onClick={clickEvent} className='bubble' imgStyle={{ height: '3rem', width: '3rem' }} userImgSrc={avatar}></IconBubble>
        </div>
        )

    }
    return (
        <div className='other-chat-bubble'>
            <IconBubble onClick={clickEvent} className='bubble' imgStyle={{ height: '3rem', width: '3rem' }} userImgSrc={avatar}></IconBubble>
            <div className={'other-chat-message'} style={{ textAlign: 'left' }} key={msgKey}>
                {time} {username}<br />{body}
            </div>
        </div>
    )
}

export default ChatMessage