import React from 'react'

type SimpleButtonProps = {
    text: String
}

const SimpleButton: React.FC<SimpleButtonProps> = (props) => {
    const handleOnClick = () => {
        console.log("Clicked!")
    }

    return <button onClick={handleOnClick}>Click Here</button>
}

export default SimpleButton