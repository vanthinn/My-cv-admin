import Button from '@components/Button/Button'
import TextFieldV2 from '@components/TextFieldV2'
import { pageMode } from '@interfaces/ICommon'
import { ICompany } from '@interfaces/ICompany'
import { IRecruitmentResponse } from '@interfaces/IRecruitment'
import { Pagination, Tooltip } from '@mui/material'
import { companyActionSelector, jobActionSelector } from '@store/index'
import { formatDayVN } from '@utils/functions/formatDay'
import { useStoreActions } from 'easy-peasy'
import { FC, useEffect, useState } from 'react'
import { HiChevronLeft, HiOutlineBookmark } from 'react-icons/hi2'
import { useNavigate, useParams } from 'react-router-dom'

interface Props {}

const DetailCompany: FC<Props> = (props): JSX.Element => {
  const navigate = useNavigate()
  const { id } = useParams()
  const { getCompanyById } = useStoreActions(companyActionSelector)
  const { getAllJob } = useStoreActions(jobActionSelector)

  const [data, setData] = useState<ICompany>()
  const [listJob, setListJob] = useState<IRecruitmentResponse[]>([])
  const [inputSearch, setInputSearch] = useState<string>('')
  const [totalRowCount, setTotalRowCount] = useState<number>(0)
  const [paginationModel, setPaginationModel] = useState<pageMode>({
    page: 1,
    pageSize: 10,
  })
  const [isLoading, setIsLoading] = useState(false)

  const getCompanyDetail = async () => {
    if (id) {
      const res = await getCompanyById(id)
      if (res) {
        setData(res)
      }
    }
  }

  const getAllJobHome = async () => {
    setIsLoading(true)
    const res = await getAllJob({
      skip: (paginationModel.page - 1) * paginationModel.pageSize,
      take: paginationModel.pageSize,
      search: inputSearch,
      companyId: id,
    })
    if (res) {
      setTotalRowCount(res?.totalRecords)
      setListJob(res.data)
    }
    setIsLoading(false)
  }

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    if (value !== paginationModel.page) {
      setPaginationModel((prev) => ({
        ...prev,
        page: value,
      }))
    }
  }

  const handleChangeSearch = (value: any): void => {
    setInputSearch(value.target.value)
  }

  const handleSearch = () => {
    getAllJobHome()
  }

  useEffect(() => {
    getCompanyDetail()
    getAllJobHome()
  }, [id])
  return (
    <>
      <div>
        <h4 className='flex items-center gap-2 font-semibold text-xl'>
          <HiChevronLeft
            onClick={() => navigate(-1)}
            className='text-xl font-bold hover:cursor-pointer hover:text-blue-500'
          />
          Detail company
        </h4>

        <div className='flex flex-1 w-full gap-8 px-5 py-4 min-h-8 rounded-lg bg-white '>
          <div className='h-36 w-36 '>
            <img
              className='object-cover h-full w-full border border-slate-200 rounded-lg'
              src={data?.logoUrl}
              alt={data?.displayName}
            />
          </div>

          <div className='flex flex-col '>
            <h2 className='text-2xl font-semibold'>{data?.displayName}</h2>
            <div></div>
            <div
              className='mt-1 text-lg text-slate-400 '
              dangerouslySetInnerHTML={{
                __html: data?.description || '',
              }}
            />

            <div className='mt-2 grid grid-cols-2 gap-2'>
              <div className='flex gap-4'>
                <span className='text-gray-500'>Field of Activity:</span>
                <span className='font-medium'>{data?.fieldOfActivity}</span>
              </div>

              <div className='flex gap-4 ml-32'>
                <span className='text-gray-500'>Scale:</span>
                <span className='font-medium'>{data?.scale}</span>
              </div>

              <div className='flex gap-4'>
                <span className='text-gray-500'>Address:</span>
                <span className='font-medium'>{data?.address}</span>
              </div>

              <div className='flex gap-4 ml-32'>
                <span className='text-gray-500'>Website:</span>
                <a
                  href={data?.website}
                  className='font-medium text-blue-500'>
                  {data?.website}
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className='mt-8 flex flex-col flex-1 w-full  px-5 py-4 min-h-8 rounded-lg bg-white'>
          <h4 className='text-xl font-medium'>Company introduction</h4>
          <div
            className='mt-2 '
            dangerouslySetInnerHTML={{
              __html: data?.description || '',
            }}
          />
        </div>

        <div className='mt-8 flex flex-col flex-1 w-full  px-5 py-4 min-h-8 rounded-lg bg-white '>
          <h4 className='text-xl font-medium'>Recruitment</h4>

          <div className='mt-2 flex gap-8'>
            <TextFieldV2
              type='search'
              onChange={handleChangeSearch}
              value={inputSearch}
              placeholder='Search for jobs'
              width='300px'
            />

            <Button
              onClick={() => handleSearch()}
              className='px-8'>
              Search
            </Button>
          </div>

          <div className='mt-8 grid grid-cols-2 gap-6'>
            {listJob &&
              listJob.map((job, index) => (
                <div
                  key={index}
                  className='border border-slate-300 min-h-8 px-3 py-3 hover:cursor-pointer hover:shadow-2xl hover:shadow-blue-500/20 rounded-md '>
                  <div className='flex justify-between items-center'>
                    <Tooltip title={job.jobTitle}>
                      <h4 className='line-clamp-1 text-xl font-medium text-gray-700 '>
                        {job.jobTitle}
                      </h4>
                    </Tooltip>
                    <span className='ml-4 text-[15px] text-blue-500 font-semibold'>
                      {job.salary}
                    </span>
                  </div>

                  <div className='flex mt-2 gap-4 flex-wrap'>
                    <li className='list-none px-2.5 py-1 bg-blue-400 text-white rounded-md text-sm'>
                      {job.experience}
                    </li>
                    <li className='list-none px-2.5 py-1 bg-blue-400 text-white rounded-md text-sm'>
                      {job.jobType}
                    </li>
                    {job.education && (
                      <li className='list-none px-2.5 py-1 bg-blue-400 text-white rounded-md text-sm'>
                        {job.education}
                      </li>
                    )}
                  </div>

                  {/* <div
                    style={{ paddingBottom: '16px' }}
                    className='mt-4  flex gap-4 items-center border-b border-slate-300 '>
                    <img
                      className='h-14 w-14 border border-slate-200 rounded-md'
                      src={job.company.logoUrl}
                      alt=''
                    />
                    <div className='flex flex-col flex-1 '>
                      <Tooltip title={job.company.displayName}>
                        <h4 className='line-clamp-1 text-base font-medium text-gray-700 '>
                          {job.company.displayName}
                        </h4>
                      </Tooltip>
                      <div className='flex items-center text-sm mt-0.5 '>
                        <Tooltip title={job.company.address}>
                          <span className='line-clamp-1 '>{job.company.address}</span>
                        </Tooltip>
                      </div>
                    </div>
                  </div> */}

                  <div className='mt-3  flex justify-between'>
                    <div className='flex gap-2 text-[15px] '>
                      <span className='text-red-500'>Deadline: </span>
                      <span className='text-red-500'>{formatDayVN(job.deadline)}</span>
                    </div>
                    <Tooltip title='Bookmark'>
                      <div
                        onClick={(e) => e.preventDefault()}
                        className='hover:text-blue-600 cursor-pointer'>
                        <HiOutlineBookmark className='text-xl hover:text-blue-500' />
                      </div>
                    </Tooltip>
                  </div>
                </div>
              ))}
          </div>

          <div className='flex justify-center mt-8'>
            <Pagination
              count={Math.ceil(totalRowCount / paginationModel.pageSize)}
              page={paginationModel.page}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default DetailCompany
