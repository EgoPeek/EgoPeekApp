import React from 'react'

const MemberCard = ({memberName,description,jobTitle,email,imgSrc,github}) => {
  return (
    <div className="column">
      <div className="card">
        <img src={imgSrc} alt={memberName} style={{width:'100%',height:'350px' ,objectFit:'cover'}}/>
        <div className="container">
          <h2>{memberName}</h2>
          <p className="title">{jobTitle}</p>
          <p>{description}</p>
          <p>{email}</p>
          <p>{github}</p>
          <p><button className="button">Contact</button></p>
        </div>
      </div>
    </div>
  )
}

export default MemberCard