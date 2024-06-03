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
import { useDebounce } from '../../hooks/useDebounce'
import { formatDayVN } from '../../utils/functions/formatDay'
import { ICompany } from '@interfaces/ICompany'
import Button from '@components/Button/Button'
import { useStoreActions, useStoreState } from 'easy-peasy'
import {
  companyActionSelector,
  companyStateSelector,
  notifyActionSelector,
} from '@store/index'
import ModalAddEditCompany from '@components/ModalAddEditCompany/ModalAddEditCompany'
interface Props {}

const Company: FC<Props> = (props): JSX.Element => {
  const navigate = useNavigate()
  const { messageErrorCompany, isUpdateCompanySuccess, isCreateCompanySuccess } =
    useStoreState(companyStateSelector)
  const {
    updateCompany,
    setIsUpdateCompanySuccess,
    createCompany,
    setIsCreateCompanySuccess,
    getAllCompany,
  } = useStoreActions(companyActionSelector)
  const { setNotifySetting } = useStoreActions(notifyActionSelector)
  const [inputSearch, setInputSearch] = useState<string>('')
  const [rowsData, setRows] = useState<ICompany[]>([])
  const [rowSelected, setRowSelected] = useState<ICompany>()
  const [rowTotal, setRowTotal] = useState(0)
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  })

  const [sortModel, setSortModel] = useState<GridSortModel>([
    {
      field: 'name',
      sort: 'asc',
    },
  ])
  const [loading, setLoading] = useState<boolean>(false)
  const [isOpenModalAddEdit, setIsOpenModalAddEdit] = useState<boolean>(false)

  const getAllCompanyHome = async () => {
    setLoading(true)
    const res = await getAllCompany({
      skip: paginationModel.page * paginationModel.pageSize,
      take: paginationModel.pageSize,
      search: inputSearch,
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

  const handleAction = async (data: any) => {
    setLoading(true)
    if (rowSelected) {
      const res = await updateCompany(data)
      if (res) {
        setNotifySetting({
          show: true,
          status: 'success',
          message: 'Edit company successfully',
        })
        getAllCompanyHome()
      }
    } else {
      const res = await createCompany(data)
      if (res) {
        setNotifySetting({
          show: true,
          status: 'success',
          message: 'Add company successfully',
        })
        getAllCompanyHome()
      }
    }
    setIsOpenModalAddEdit(false)
    setLoading(false)
  }

  const handleSortModelChange = useCallback((newSortModel: GridSortModel) => {
    setSortModel(newSortModel)
  }, [])

  const debounced = useDebounce(inputSearch, 500)

  useEffect(() => {
    getAllCompanyHome()
  }, [paginationModel, sortModel, debounced])

  useEffect(() => {
    if (!isUpdateCompanySuccess) {
      setNotifySetting({
        show: true,
        status: 'error',
        message: messageErrorCompany,
      })
      setIsUpdateCompanySuccess(true)
    }
  }, [isUpdateCompanySuccess])

  useEffect(() => {
    if (!isCreateCompanySuccess) {
      setNotifySetting({
        show: true,
        status: 'error',
        message: messageErrorCompany,
      })
      setIsCreateCompanySuccess(true)
    }
  }, [isCreateCompanySuccess])

  const columnsCompany = [
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
      field: 'displayName',
      headerName: 'Company name',
      flex: 1.6,
      minWidth: 150,
      editable: false,
      align: 'left',
      headerAlign: 'left',
      hideable: false,
      renderCell: (params: GridRenderCellParams<any, string>) => (
        <Tooltip title={params.row.displayName}>
          <p className={`text-black line-clamp-1`}>{params.row.displayName}</p>
        </Tooltip>
      ),
    },
    {
      field: 'logoUrl',
      headerName: 'Logo',
      type: 'string',
      flex: 0.8,
      minWidth: 100,
      align: 'left',
      headerAlign: 'left',
      hideable: false,
      renderCell: (params: GridRenderCellParams<any, string>) => (
        <div className='h-full w-12'>
          <img
            src={params.row.logoUrl}
            alt=''
          />
        </div>
      ),
    },
    {
      field: 'email',
      headerName: 'Email',
      type: 'number',
      minWidth: 100,
      flex: 1.2,
      align: 'left',
      headerAlign: 'left',
      hideable: false,
      renderCell: (params: GridRenderCellParams<any, number>) => (
        <p className={`text-black line-clamp-1`}>{params.row.email}</p>
      ),
    },
    {
      field: 'address',
      headerName: 'Address',
      type: 'number',
      minWidth: 150,
      flex: 1.5,
      align: 'left',
      headerAlign: 'left',
      disableColumnMenu: true,
      hideable: false,
      sortable: false,
      renderCell: (params: GridRenderCellParams<any, number>) => (
        <Tooltip title={params.row.address}>
          <p className={`text-black line-clamp-1`}>{params.row.address}</p>
        </Tooltip>
      ),
    },
    {
      field: 'fieldOfActivity',
      headerName: 'Field of activity',
      type: 'number',
      minWidth: 120,
      flex: 1.2,
      align: 'left',
      headerAlign: 'left',
      disableColumnMenu: true,
      hideable: false,
      sortable: false,
      renderCell: (params: GridRenderCellParams<any, number>) => (
        <Tooltip title={params.row.fieldOfActivity}>
          <p className={`text-black line-clamp-1`}>{params.row.fieldOfActivity}</p>
        </Tooltip>
      ),
    },
    {
      field: 'scale',
      headerName: 'Scale',
      type: 'number',
      minWidth: 100,
      flex: 1,
      align: 'left',
      headerAlign: 'left',
      disableColumnMenu: true,
      hideable: false,
      sortable: false,
      renderCell: (params: GridRenderCellParams<any, number>) => (
        <Tooltip title={params.row.scale}>
          <p className={`text-black line-clamp-1`}>{params.row.scale}</p>
        </Tooltip>
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
              navigate('/company/' + params.params.row.id)
            }}
          />
          <EditIcon
            sx={{ cursor: 'pointer' }}
            onClick={() => {
              setRowSelected(params.params.row || null)
              setIsOpenModalAddEdit(true)
            }}
          />
          <DeleteIcon
            sx={{ color: '#d32f2f', cursor: 'pointer' }}
            onClick={() => {}}
          />
        </div>
      </>
    )
  }
  return (
    <>
      <div className='p-4 bg-white rounded-md flex-1 flex flex-col shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]'>
        <>
          <h4 className='font-semibold text-xl'>Company management</h4>

          <div className='mt-4 flex justify-between'>
            <div className='flex gap-3'>
              <TextFieldV2
                type='search'
                onChange={handleChangeSearch}
                value={inputSearch}
                placeholder='Search by company name'
                width='350px'
              />
            </div>
            <Button
              onClick={() => {
                setRowSelected(undefined)
                setIsOpenModalAddEdit(true)
              }}
              className='flex items-center'>
              <HiPlusSm className='mr-2 text-xl' />
              Add new company
            </Button>
          </div>

          <div className='mt-3 w-full overflow-x-hidden'>
            <Table
              columns={columnsCompany}
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

      {isOpenModalAddEdit && (
        <ModalAddEditCompany
          open={isOpenModalAddEdit}
          setOpen={setIsOpenModalAddEdit}
          company={rowSelected || null}
          handleAction={handleAction}
        />
      )}
    </>
  )
}

export default Company
