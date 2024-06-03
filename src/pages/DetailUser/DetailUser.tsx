import { IUser } from '@interfaces/IUser'
import { userActionSelector } from '@store/index'
import { useStoreActions } from 'easy-peasy'
import { FC, useEffect, useState } from 'react'
import {
  HiChevronLeft,
  HiOutlinePhone,
  HiOutlineSparkles,
  HiOutlineUserGroup,
} from 'react-icons/hi2'
import { useNavigate, useParams } from 'react-router-dom'
import avatar_default from '../../assets/images/test.jpg'
import { formatDayVN } from '@utils/functions/formatDay'
import {
  HiOutlineLocationMarker,
  HiOutlineMail,
  HiOutlineOfficeBuilding,
} from 'react-icons/hi'

interface Props {}

const DetailUser: FC<Props> = (props): JSX.Element => {
  const navigate = useNavigate()
  const { id } = useParams()
  const { getUserById } = useStoreActions(userActionSelector)

  const [data, setData] = useState<IUser>()

  const getUserDetail = async () => {
    if (id) {
      const res = await getUserById(id)
      if (res) {
        setData(res)
      }
    }
  }

  useEffect(() => {
    getUserDetail()
  }, [id])

  return (
    <div>
      <h4 className='flex items-center gap-2 font-semibold text-xl'>
        <HiChevronLeft
          onClick={() => navigate(-1)}
          className='text-xl font-bold hover:cursor-pointer hover:text-blue-500'
        />
        Detail user
      </h4>

      <div className='flex flex-col mt-3 ml-4 w-full'>
        <div className='flex gap-4 items-center'>
          <div className='h-36 w-36  mt-2'>
            <img
              className='rounded-full w-full h-full object-cover'
              src={data?.avatarUrl || avatar_default}
              alt=''
            />
          </div>
          <div className='flex flex-col gap-1.5'>
            <span className='text-[28px] font-semibold'>
              {data?.firstName + ' ' + data?.lastName}
            </span>
            <span className='font-semibold'>{data?.role?.name}</span>
            {data?.gender && <span>{data?.gender}</span>}
            {data?.dateOfBirth && <span>{formatDayVN(data?.dateOfBirth)}</span>}
          </div>
        </div>

        <div className='mt-4'>
          <h4 className='text-xl font-semibold'>Contact information</h4>
          <div className='grid grid-cols-3'>
            <div className='flex gap-2'>
              <HiOutlinePhone className='mt-1' />
              <div>
                <p>Phone number</p>
                <span className='font-semibold'>{data?.phoneNumber}</span>
              </div>
            </div>

            <div className='flex gap-2'>
              <HiOutlineMail className='mt-1' />
              <div>
                <p>Email</p>
                <span className='font-semibold'>{data?.email}</span>
              </div>
            </div>

            <div className='flex gap-2'>
              <HiOutlineLocationMarker className='mt-1' />
              <div>
                <p>Address</p>
                <span className='font-semibold'>{data?.address}</span>
              </div>
            </div>
          </div>
        </div>

        {data?.company && (
          <div className='mt-4'>
            <h4 className='text-xl font-semibold'>Company information</h4>
            <div className='grid grid-cols-3'>
              <div className='flex gap-2'>
                <HiOutlineOfficeBuilding className='mt-1' />
                <div>
                  <p>Company name</p>
                  <span className='font-semibold'>{data?.company.displayName}</span>
                </div>
              </div>

              <div className='flex gap-2'>
                <HiOutlineSparkles className='mt-1' />
                <div>
                  <p>Field of activity</p>
                  <span className='font-semibold'>{data?.company.fieldOfActivity}</span>
                </div>
              </div>

              <div className='flex gap-2 '>
                <HiOutlineUserGroup className='mt-1' />
                <div>
                  <p>Scale</p>
                  <span className='font-semibold'>{data?.company.scale}</span>
                </div>
              </div>

              <div className='flex gap-2 mt-2'>
                <HiOutlinePhone className='mt-1' />
                <div>
                  <p>Phone number</p>
                  <span className='font-semibold'>{data?.company.phoneNumber}</span>
                </div>
              </div>

              <div className='flex gap-2 mt-2'>
                <HiOutlineMail className='mt-1' />
                <div>
                  <p>Email</p>
                  <span className='font-semibold'>{data?.company.email}</span>
                </div>
              </div>

              <div className='flex gap-2 mt-2'>
                <HiOutlineLocationMarker className='mt-1' />
                <div>
                  <p>Address</p>
                  <span className='font-semibold'>{data?.company.address}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default DetailUser
