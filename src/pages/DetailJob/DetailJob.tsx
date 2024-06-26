import { FC, useEffect, useState } from 'react'
import {
  HiOutlineAcademicCap,
  HiOutlineBriefcase,
  HiOutlineLocationMarker,
  HiOutlineOfficeBuilding,
} from 'react-icons/hi'
import { FiClock, FiDollarSign } from 'react-icons/fi'
import Divider from '@mui/material/Divider'
import { useParams } from 'react-router-dom'
import { useStoreActions } from 'easy-peasy'
import { jobActionSelector } from '@store/index'
import { IRecruitmentResponse } from '@interfaces/IRecruitment'
import { dayComparedToThePast, formatDayVN } from '@utils/functions/formatDay'

interface Props {}

const JobDetail: FC<Props> = (props): JSX.Element => {
  const { id } = useParams()
  // const navigate = useNavigate()
  // const { messageErrorJob } = useStoreState(jobStateSelector)
  const { getJobById } = useStoreActions(jobActionSelector)
  // const { setNotifySetting } = useStoreActions(notifyActionSelector)

  const [job, setJob] = useState<IRecruitmentResponse>()

  const getJobByIdPage = async () => {
    if (id) {
      const res = await getJobById({ jobId: id })
      if (res) {
        setJob(res)
      }
    }
  }

  useEffect(() => {
    getJobByIdPage()
  }, [id])

  return (
    <div className='relative mt-2 px-2'>
      <div className='absolute top-0 right-4 flex flex-col justify-end'>
        <span className='flex items-center gap-2 text-xs font-medium mt-1  text-slate-400 ml-auto'>
          <FiClock className='text-xs ' />
          Create at {dayComparedToThePast(job?.createdAt || '')}
          {job?.updatedAt &&
            ` - Update at ${dayComparedToThePast(job?.updatedAt || '')} `}
        </span>

        <span className='text-sm font-medium mt-2 ml-auto'>
          This posting is managed by
        </span>
        <span className='text-sm font-medium ml-auto'>
          {job?.user.firstName + ' ' + job?.user.lastName}
        </span>
      </div>
      <h4 className='text-2xl font-semibold '>{job?.jobTitle}</h4>
      <div className='flex items-center gap-2 mt-2'>
        <HiOutlineOfficeBuilding className='text-xl' />
        <span className='font-medium'>{job?.company.displayName}</span>
      </div>
      <div className='flex gap-8 mt-0.5 '>
        <span className='flex items-center gap-2 font-medium mt-1'>
          <FiDollarSign className='text-xl ' />
          {job?.salary}
        </span>
        <span className='flex items-center gap-2 font-medium mt-1'>
          <FiClock className='text-xl ' />
          {job?.jobType}
        </span>
        <span className='flex items-center gap-2 font-medium mt-1'>
          <HiOutlineBriefcase className='text-xl ' />
          {job?.experience}
        </span>
      </div>
      {job?.education && (
        <div className='flex items-center gap-2 mt-2'>
          <HiOutlineAcademicCap className='text-xl' />
          <span className='font-medium'>{job?.education}</span>
        </div>
      )}
      <div className='flex items-center gap-2 mt-2'>
        <HiOutlineLocationMarker className='text-xl' />
        <span className='font-medium'>{job?.company.address}</span>
      </div>
      <div className='flex items-center gap-2 mt-2'>
        <span className='font-medium text-red-500'>
          Deadline: {formatDayVN(job?.deadline || '')}
        </span>
      </div>
      <Divider
        sx={{ mt: 3, listStyle: 'none' }}
        component='li'
      />
      {job?.skills && (
        <div className='max-w-[400px]'>
          <h6 className='font-medium text-lg mt-3 mb-1.5'>Skills</h6>
          <div className='flex gap-2'>
            {job?.skills.map((item, index) => (
              <li
                key={index}
                className='px-3 py-1 rounded-full bg-blue-400 text-white text-sm list-none'>
                {item}
              </li>
            ))}
          </div>
        </div>
      )}
      <div className='border-t border-slate-200 mt-6 py-2 '>
        <h6 className='font-medium text-lg  mb-1.5'>Job description</h6>
        <div
          dangerouslySetInnerHTML={{
            __html: job?.description || '',
          }}
        />
      </div>
    </div>
  )
}

export default JobDetail
