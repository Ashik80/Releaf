import React from 'react'
import { Dimmer, Loader, Segment } from 'semantic-ui-react'

interface IProps {
    text: string
}

const LoadingComponent: React.FC<IProps> = ({ text }) => {
    return (
        <Dimmer inverted active>
            <Loader inverted content={text} />
        </Dimmer>
    )
}

export default LoadingComponent
