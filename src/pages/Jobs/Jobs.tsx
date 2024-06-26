import { FC, useCallback, useEffect, useState } from 'react'
import TextFieldV2 from '../../components/TextFieldV2'
import { HiPlusSm } from 'react-icons/hi'
import { GridRenderCellParams, GridSortModel } from '@mui/x-data-grid'
import { Tooltip } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import VisibilityIcon from '@mui/icons-material/Visibility'
import Table from '../../components/Table'
import { useNavigate } from 'react-router-dom'
import { useStoreActions, useStoreState } from 'easy-peasy'
import {
  companyStateSelector,
  jobActionSelector,
  jobStateSelector,
  notifyActionSelector,
  userStateSelector,
} from '../../store'
import { useDebounce } from '../../hooks/useDebounce'
import { formatDayVN } from '../../utils/functions/formatDay'
import ModalConfirm from '../../components/ModalConfirm'
import { IRecruitmentResponse } from '@interfaces/IRecruitment'
interface Props {}

const Jobs: FC<Props> = (): JSX.Element => {
  const navigate = useNavigate()
  const { messageErrorJob, isDeleteJobOfferSuccess } = useStoreState(jobStateSelector)
  const { currentUserSuccess } = useStoreState(userStateSelector)
  const { getAllJob, deleteJobOffer, setIsDeleteJobOfferSuccess } =
    useStoreActions(jobActionSelector)
  const { setNotifySetting } = useStoreActions(notifyActionSelector)
  const [inputSearch, setInputSearch] = useState<string>('')
  const [rowsData, setRows] = useState<IRecruitmentResponse[]>([])
  const [rowSelected, setRowSelected] = useState<IRecruitmentResponse>()
  const [rowTotal, setRowTotal] = useState(0)
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  })

  const [sortModel, setSortModel] = useState<GridSortModel>([
    {
      field: 'createdAt',
      sort: 'asc',
    },
  ])
  const [loading, setLoading] = useState<boolean>(false)
  const [openModalDelete, setOpenModalDelete] = useState<boolean>(false)

  const getAllJobHome = async () => {
    setLoading(true)
    const res = await getAllJob({
      skip: paginationModel.page * paginationModel.pageSize,
      take: paginationModel.pageSize,
      search: inputSearch,
      order: `${sortModel[0]?.field}:${sortModel[0]?.sort}`,
    })
    if (res) {
      const data = res.data?.map((item: any, index: number) => ({
        ...item,
        tag: paginationModel.page * paginationModel.pageSize + index + 1,
      }))
      setRowTotal(res?.totalRecords)
      setRows(data)
    }
    setLoading(false)
  }

  const handleChangeSearch = (value: any): void => {
    setInputSearch(value.target.value)
  }

  const handleDelete = async () => {
    if (rowSelected) {
      setLoading(true)
      const res = await deleteJobOffer(rowSelected.id || '')
      if (res) {
        setNotifySetting({
          show: true,
          status: 'success',
          message: 'Delete job successful',
        })
        getAllJobHome()
      }
      setOpenModalDelete(false)
      setLoading(false)
    }
  }

  const handleSortModelChange = useCallback((newSortModel: GridSortModel) => {
    setSortModel(newSortModel)
  }, [])

  useEffect(() => {
    if (!isDeleteJobOfferSuccess) {
      setNotifySetting({
        show: true,
        status: 'error',
        message: messageErrorJob,
      })
      setIsDeleteJobOfferSuccess(true)
    }
  }, [isDeleteJobOfferSuccess])

  const debounced = useDebounce(inputSearch, 500)

  useEffect(() => {
    getAllJobHome()
  }, [paginationModel, sortModel, debounced])

  const columnsRecruitment = [
    {
      field: 'tag',
      headerName: 'Tag',
      minWidth: 50,
      maxWidth: 50,
      type: 'number',
      align: 'left',
      headerAlign: 'left',
      hideable: false,
      sortable: false,
      disableColumnFilter: true,
      disableColumnMenu: true,
    },
    {
      field: 'jobTitle',
      headerName: 'Title',
      flex: 1.6,
      minWidth: 150,
      editable: false,
      align: 'left',
      headerAlign: 'left',
      hideable: false,
      renderCell: (params: GridRenderCellParams<any, string>) => (
        <Tooltip title={params.row.jobTitle}>
          <p className={`text-black line-clamp-1`}>{params.row.jobTitle}</p>
        </Tooltip>
      ),
    },
    {
      field: 'salary',
      headerName: 'Salary',
      type: 'string',
      flex: 1,
      minWidth: 150,
      align: 'left',
      headerAlign: 'left',
      hideable: false,
      sortable: false,
      renderCell: (params: GridRenderCellParams<any, string>) => (
        <Tooltip title={params.row.salary}>
          <p className={`text-black line-clamp-1`}>{params.row.salary}</p>
        </Tooltip>
      ),
    },
    {
      field: 'experience',
      headerName: 'Experience',
      type: 'number',
      minWidth: 100,
      flex: 1.2,
      align: 'left',
      headerAlign: 'left',
      hideable: false,
      sortable: false,
      renderCell: (params: GridRenderCellParams<any, number>) => (
        <Tooltip title={params.row.experience}>
          <p className={`text-black line-clamp-1`}>{params.row.experience}</p>
        </Tooltip>
      ),
    },
    {
      field: 'jobType',
      headerName: 'Job type',
      type: 'number',
      minWidth: 100,
      flex: 1.2,
      align: 'left',
      headerAlign: 'left',
      disableColumnMenu: true,
      hideable: false,
      sortable: false,
      renderCell: (params: GridRenderCellParams<any, number>) => (
        <Tooltip title={params.row.jobType}>
          <p className={`text-black line-clamp-1`}>{params.row.jobType}</p>
        </Tooltip>
      ),
    },
    {
      field: 'createdAt',
      headerName: 'Created at',
      type: 'number',
      minWidth: 100,
      flex: 1,
      align: 'left',
      headerAlign: 'left',
      disableColumnMenu: true,
      hideable: false,
      sortable: true,
      renderCell: (params: GridRenderCellParams<any, number>) => (
        <Tooltip title={formatDayVN(params.row.createdAt)}>
          <p className={`text-black line-clamp-1`}>{formatDayVN(params.row.createdAt)}</p>
        </Tooltip>
      ),
    },
    {
      field: 'deadline',
      headerName: 'Deadline',
      type: 'number',
      minWidth: 100,
      flex: 1,
      align: 'left',
      headerAlign: 'left',
      disableColumnMenu: true,
      hideable: false,
      sortable: false,
      renderCell: (params: GridRenderCellParams<any, number>) => (
        <Tooltip title={formatDayVN(params.row.deadline)}>
          <p className={`text-black line-clamp-1`}>{formatDayVN(params.row.deadline)}</p>
        </Tooltip>
      ),
    },
    {
      field: 'status',
      headerName: 'Status',
      type: 'number',
      minWidth: 100,
      flex: 1,
      align: 'left',
      headerAlign: 'left',
      disableColumnMenu: true,
      hideable: false,
      sortable: false,
      renderCell: (params: GridRenderCellParams<any, number>) => (
        <p
          className={`text-black line-clamp-1 text-[12px] px-4 py-1 rounded-3xl ${
            params.row.status === 'ACTIVE' ? 'bg-red-300' : 'bg-slate-100'
          } `}>
          {params.row.status}
        </p>
      ),
    },
    {
      field: 'action',
      headerName: 'Action',
      maxWidth: 120,
      minWidth: 80,
      flex: 1,
      align: 'left',
      headerAlign: 'left',
      disableColumnMenu: true,
      sortable: false,
      disableSelectionOnClick: false,
      renderCell: (params: GridRenderCellParams<any, any>) => {
        return <BtnAction params={params} />
      },
    },
  ]

  const BtnAction = (params: any) => {
    return (
      <>
        <div className={`flex gap-2`}>
          <VisibilityIcon
            sx={{ cursor: 'pointer', color: '#1278ccf0' }}
            onClick={() => {
              navigate('/jobs/' + params.params.row.id)
            }}
          />
          <DeleteIcon
            sx={{ color: '#d32f2f', cursor: 'pointer' }}
            onClick={() => {
              setRowSelected(params.params.row)
              setOpenModalDelete(true)
            }}
          />
        </div>
      </>
    )
  }
  return (
    <>
      <div className='p-4 bg-white rounded-md flex-1 flex flex-col shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]'>
        <>
          <h4 className='font-semibold text-xl'>Recruitment management</h4>

          <div className='mt-4 flex justify-between'>
            <TextFieldV2
              type='search'
              onChange={handleChangeSearch}
              value={inputSearch}
              placeholder='Search by job title'
              width='350px'
            />
          </div>

          <div className='mt-3 w-full overflow-x-hidden'>
            <Table
              columns={columnsRecruitment}
              rows={rowsData}
              sortModel={sortModel}
              onSortModelChange={handleSortModelChange}
              paginationModel={paginationModel}
              onPaginationModelChange={setPaginationModel}
              loading={loading}
              totalRow={rowTotal}
            />
          </div>
        </>
      </div>

      {openModalDelete && (
        <ModalConfirm
          open={openModalDelete}
          handleClose={() => {
            setOpenModalDelete(false)
          }}
          handleDelete={handleDelete}
        />
      )}
    </>
  )
}

export default Jobs
