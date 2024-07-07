import React from 'react'

const Video = () => {
  return (
    <section id="video">
      <span style={{fontSize:24,fontWeight:'bold'}}>Explaination</span>
        <video className="video shadow-md" controls>
            <source src='/video.mp4'/>
        </video>
    </section>
  )
}

export default Video