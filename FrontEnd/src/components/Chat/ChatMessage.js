
import { IconBubble } from '../Misc/CustomComponents/IconBubble'
import './Chat.css'



const ChatMessage = ({ body, username, avatar, isSelf, time, msgKey }) => {

    if (isSelf) {
        return (<div className='my-chat-bubble'>
            <div className='my-chat-message' style={{ textAlign: 'right' }} key={msgKey}>
                {time} {username}<br />{body}
            </div>
            <IconBubble className='bubble' imgStyle={{ height: '3rem', width: '3rem' }} userImgSrc={avatar}></IconBubble>
        </div>
        )

    }
    return (
        <div className='other-chat-bubble'>
            <IconBubble className='bubble' imgStyle={{ height: '3rem', width: '3rem' }} userImgSrc={avatar}></IconBubble>
            <div className={'other-chat-message'} style={{ textAlign: 'left' }} key={msgKey}>
                {time} {username}<br />{body}
            </div>
        </div>
    )
}

export default ChatMessage