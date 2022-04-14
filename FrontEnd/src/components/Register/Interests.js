/**
 *  File name: INterests.js
 *  Description: Interest page where users can select what types of topics they're interested in viewing on their userFeed
 */
import { useState, useEffect } from 'react'
import { TextInputStandard } from '../Misc/Input/TextFields'
import { GreenButton } from '../Misc/Input/Buttons'
import { useNavigate } from 'react-router';
import useFetch from '../../hooks/useFetch';
import axios from 'axios';

//interest page in component Form
const InterestPage = () => {

    //Tag component that takes a title
    const [selectedTags, setSelectedTags] = useState([]);
    const { data: tags, isPending: tagPending} = useFetch('/api/v1/hashtags/top/15')
    const [searchTag, setSearchTag] = useState('')
    const userID = window.localStorage.getItem('userID')
    const navigate = useNavigate();
    const [tagData, setTagData] = useState([])
    const [customTag, setCustomTag] = useState([])

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
        setTagData(tagData.filter(x => x !== tagName))
    }

    //for tags that the user searches so they don't get placed in the original array
    const updateCustomTag = (tagName) => {
        //if the tag exists in the array remove it
        if (customTag.find(x => x === tagName)) {
            setCustomTag(customTag.filter(x => x !== tagName))
            return
        }

        //if its brand new just add it and remove it from original array
        setCustomTag([...selectedTags, tagName])
    }

    const Tag = ({ title, updateFunction }) => {
        return (
            <div className='tag' onClick={() => updateFunction(title)}>
                <p>{title}</p>
            </div>
        )
    }

    const handleSearchTag = (e) => {
        if (e.key !== 'Enter' || searchTag === '') return
        const tag = formatString(searchTag)

        if (!selectedTags.find(x => x === tag)) setCustomTag([...customTag, tag])
        setSearchTag('')

        console.log('search tag:', searchTag)
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        const authHeader = window.localStorage.getItem('token_type') + " " + window.localStorage.getItem('token')
        console.log('submit')
        try {
            await axios.put(`/api/v1/profiles/${userID}`, {
                user_id: userID,
                interests: selectedTags
            },
            {headers: {Authorization: authHeader}})
            navigate('/')

        } catch (err) {
            console.log(err)
        }
    }
    const formatString = (val) => {
        //yes this is a thing, all it does it split the string and create each word uppercased
        // ex. dying of the light => Dying Of The Light, just to make the purple pills nicer
        const concatStr = val.split(' ')
            .map(str => str[0].toUpperCase() + str.slice(1))
            .join(' ')
        return concatStr
    }

    return (
        <div className='form-container'>
            <h2>Interests</h2>
            <p>Pick games that interest you the most to receieve a more personalized feed</p>
            <TextInputStandard autoComplete='off' value={searchTag} size='small' sx={{ width: '70%' }} label="Search by tag" onChange={(e) => setSearchTag(e.target.value)} onKeyPress={handleSearchTag} />
            <div className='tag-container'>
                <div className='chosen-tags interests'>
                    {selectedTags.map((x, i) => <Tag title={x} updateFunction={updateTag} key={i} />)}
                    {customTag.map((x, i) => <Tag title={x} updateFunction={updateCustomTag} key={i} />)}
                </div>
                <div className='interests'>
                    {!tagPending && tagData.map((item, i) => <Tag title={item} updateFunction={updateTag} key={i} />)}
                </div>
            </div>
            <GreenButton variant='outlined' onClick={handleSubmit}>Submit</GreenButton>
        </div>
    )
}


export default InterestPage 