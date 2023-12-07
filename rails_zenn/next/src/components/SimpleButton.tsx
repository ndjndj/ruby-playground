import React from 'react'

type SimpleButtonProps = {
    text: String,
    onClick: () => void
}

const SimpleButton: React.FC<SimpleButtonProps> = (props) => {
    const handleOnClick = () => {
        console.log("Clicked!!!")
    }

    return <button onClick={handleOnClick}>{props.text}</button>
}

export default SimpleButton