import { FC } from 'react'

interface Props {}

const Service: FC<Props> = (props): JSX.Element => {
  return (
    <div className='flex flex-1 h-full'>
      <h2 className='m-auto'>Incoming</h2>
    </div>
  )
}

export default Service
