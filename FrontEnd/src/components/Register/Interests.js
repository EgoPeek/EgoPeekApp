import { useState,useEffect } from 'react'
import { TextInputStandard } from '../Misc/Input/TextFields'
import { GreenButton } from '../Misc/Input/Buttons'
import { useNavigate } from 'react-router';
import useFetch from '../../hooks/useFetch';
import axios from 'axios';

//interest page in component Form
const InterestPage = () => {

    //Tag component that takes a title
    const [selectedTags, setSelectedTags] = useState([]);
    const { data: tags, isPending: tagPending, error: tagError } = useFetch('/api/v1/hashtags/top/15')
    const [searchTag, setSearchTag] = useState('')
    const userID = window.localStorage.getItem('userID')
    const navigate = useNavigate();
    const [tagData, setTagData] = useState([])

    useEffect(() => {
      setTagData(!tagPending ? tags : [])
    }, [tagPending])
    

    const updateTag = (tagName) => {
        //if the tag exists in the array remove it and put it back in the original
        if (selectedTags.find(x => x === tagName)) {
            setSelectedTags(selectedTags.filter(x => x !== tagName))
            tagData.push(tagName)
            return
        }

        //if its brand new just add it and remove it from original array
        setSelectedTags([...selectedTags, tagName])
        setTagData(tagData.filter(x=>x!==tagName))
    }

    const Tag = ({ title }) => {
        return (
            <div className='tag' onClick={() => updateTag(title)}>
                <p>{title}</p>
            </div>
        )
    }

    const handleSearchTag = (e) => {
        if (e.key !== 'enter') return

        console.log('search tag')
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log('submit')
        try {

            const res = await axios.put(`/api/v1/profiles/${userID}`, {
                user_id: userID,
                interests: selectedTags
            })
            navigate('/')

        }catch(err){
            console.log(err)
        }
    }

    return (
        <form className='form-container' onSubmit={handleSubmit}>
            <h2>Interests</h2>
            <p>Pick games that interest you the most to receieve a more personalized feed</p>
            <TextInputStandard size='small' sx={{ width: '70%' }} label="Search by tag" onChange={e => setSearchTag(e.target.value)} onKeyPress={handleSearchTag} />
            <div className='tag-container'>
                <div className='chosen-tags interests'>
                    {selectedTags.map((x, i) => <Tag title={x} key={i} />)}
                </div>
                <div className='interests'>
                    {!tagPending && tagData.map((item, i) => <Tag title={item} key={i} />)}
                </div>
            </div>
            <GreenButton variant='outlined' type='submit'>Submit</GreenButton>
        </form>
    )
}


export default InterestPage 