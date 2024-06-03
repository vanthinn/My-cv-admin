import { FC, useCallback, useState } from 'react'
import logo from '../../../assets/images/logongang.png'
import logo1 from '../../../assets/images/logodoc.png'
import { DATA_SIDEBAR } from '@commom/constants'
import { MdOutlineCalendarMonth } from 'react-icons/md'
import { HiOutlineUserGroup } from 'react-icons/hi2'
import {
  HiOutlineOfficeBuilding,
  HiOutlineCog,
  HiOutlineCalendar,
  HiOutlineClipboardList,
} from 'react-icons/hi'
import { useNavigate } from 'react-router-dom'

interface IProps {
  open: boolean
}

interface IDataSidebar {
  id: number
  name: string
  pathName: string
  icon: string
  children: []
}

const Sidebar: FC<IProps> = ({ open }: IProps): JSX.Element => {
  const navigate = useNavigate()
  const [selected, setSelected] = useState<number>(0)
  const _renderIcon = useCallback((dataSidebar: IDataSidebar) => {
    let result = null
    switch (dataSidebar?.icon) {
      case 'dashboard': {
        result = (
          <MdOutlineCalendarMonth className='inline-block h-8 w-8 ltr:mr-2 rtl:ml-2' />
        )
        break
      }
      case 'user': {
        result = <HiOutlineUserGroup className='inline-block h-8 w-8 ltr:mr-2 rtl:ml-2' />
        break
      }
      case 'company': {
        result = (
          <HiOutlineOfficeBuilding className='inline-block h-8 w-8 ltr:mr-2 rtl:ml-2' />
        )
        break
      }
      case 'blog': {
        result = <HiOutlineCalendar className='inline-block h-8 w-8 ltr:mr-2 rtl:ml-2' />
        break
      }
      case 'service': {
        result = <HiOutlineCog className='inline-block h-8 w-8 ltr:mr-2 rtl:ml-2' />
        break
      }

      default: {
        result = (
          <HiOutlineClipboardList className='inline-block h-8 w-8 ltr:mr-2 rtl:ml-2' />
        )
      }
    }
    return result
  }, [])
  return (
    <div
      className={`h-full overflow-y-auto scrollbars bg-gradient-to-r from-cyan-100 to-gray-200 xl:translate-x-0 `}>
      <div className='mh-18 text-center py-3 mt-1'>
        <a
          onClick={() => {}}
          className='relative cursor-pointer'>
          <div className='flex justify-center px-2'>
            <img
              className={`${open ? 'h-16 w-28' : ' h-24 w-60'}`}
              src={open ? logo1 : logo}
              alt='Logo'
            />
          </div>
        </a>
      </div>

      <ul
        id='side-menu'
        className='w-full float-none flex flex-col font-medium ltr:pr-2 ltr:pl-2 rtl:pr-2'>
        {DATA_SIDEBAR.map((dataItem: any, index: number) => (
          <li
            className={`relative ${open && 'pt-2'}  `}
            key={JSON.parse(JSON.stringify(dataItem)) + index}>
            <a
              className={`flex py-1 text-white cursor-pointer `}
              onClick={() => {
                // checkDevice() && props?.setOpen(false)
                if (selected != dataItem?.id) {
                  setSelected(dataItem?.id)
                  navigate(dataItem?.pathName)
                  // setSelectedChildren(null)
                }
              }}>
              <div
                className={`flex w-full justify-start items-center px-2 py-2.5 rounded-md text-black
                 ${
                   selected === index &&
                   'bg-black/30 shadow-[1px_7px_13px_0px_#e3e3f3] text-white'
                 } `}>
                <div className='ml-[8px]'>{_renderIcon(dataItem)}</div>
                <span className={`text-xl  font-semibold ml-2 ${open && 'hidden'} `}>
                  {dataItem?.name}
                </span>
              </div>
              {!!dataItem?.children?.length && (
                <span
                  onClick={(event: any) => {
                    event.preventDefault()
                    event.stopPropagation()
                    // if (selected != dataItem?.id) {
                    //   setSelected(dataItem?.id)
                    // } else {
                    //   setSelected(null)
                    // }
                  }}
                  className='inline-block ltr:float-right rtl:float-left'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='currentColor'
                    className={`transform transition duration-300 mt-1.5 bi bi-chevron-down `}
                    width='.8rem'
                    height='.8rem'
                    viewBox='0 0 16 16'>
                    <path
                      fillRule='evenodd'
                      d='M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z'
                    />
                  </svg>
                </span>
              )}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Sidebar
