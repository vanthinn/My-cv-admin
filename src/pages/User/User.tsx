import { useDebounce } from '@hooks/useDebounce'
import { IUser } from '@interfaces/IUser'
import { Tooltip } from '@mui/material'
import { GridRenderCellParams, GridSortModel } from '@mui/x-data-grid'
import { userActionSelector } from '@store/index'
import { useStoreActions } from 'easy-peasy'
import { FC, useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import DeleteIcon from '@mui/icons-material/Delete'
import VisibilityIcon from '@mui/icons-material/Visibility'
import TextFieldV2 from '@components/TextFieldV2'
import Table from '@components/Table'
import { formatDayVN } from '@utils/functions/formatDay'

interface Props {}

const User: FC<Props> = (props): JSX.Element => {
  const navigate = useNavigate()
  const { getAllUser } = useStoreActions(userActionSelector)
  const [inputSearch, setInputSearch] = useState<string>('')
  const [rowsData, setRows] = useState<IUser[]>([])
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

  const getAllJobHome = async () => {
    setLoading(true)
    const res = await getAllUser({
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

  const handleSortModelChange = useCallback((newSortModel: GridSortModel) => {
    setSortModel(newSortModel)
  }, [])

  const debounced = useDebounce(inputSearch, 500)

  useEffect(() => {
    getAllJobHome()
  }, [paginationModel, sortModel, debounced])

  const columnsUser = [
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
      field: 'firstName',
      headerName: 'Full name',
      flex: 1.6,
      minWidth: 150,
      editable: false,
      align: 'left',
      headerAlign: 'left',
      hideable: false,
      renderCell: (params: GridRenderCellParams<any, string>) => (
        <Tooltip title={params.row.firstName + ' ' + params.row.lastName}>
          <p className={`text-black line-clamp-1`}>
            {params.row.firstName + ' ' + params.row.lastName}
          </p>
        </Tooltip>
      ),
    },
    {
      field: 'email',
      headerName: 'Email',
      type: 'string',
      flex: 1.5,
      minWidth: 150,
      align: 'left',
      headerAlign: 'left',
      hideable: false,
      renderCell: (params: GridRenderCellParams<any, string>) => (
        <Tooltip title={params.row.email}>
          <p className={`text-black line-clamp-1`}>{params.row.email}</p>
        </Tooltip>
      ),
    },
    {
      field: 'gender',
      headerName: 'Gender',
      type: 'string',
      flex: 0.5,
      minWidth: 100,
      align: 'left',
      headerAlign: 'left',
      hideable: false,
      renderCell: (params: GridRenderCellParams<any, string>) => (
        <Tooltip title={params.row.gender}>
          <p className={`text-black line-clamp-1`}>{params.row.gender}</p>
        </Tooltip>
      ),
    },

    {
      field: 'dateOfBirth',
      headerName: 'Date of birth',
      type: 'number',
      minWidth: 100,
      flex: 1,
      align: 'left',
      headerAlign: 'left',
      hideable: false,
      renderCell: (params: GridRenderCellParams<any, number>) => (
        <p className={`text-black line-clamp-1`}>{formatDayVN(params.row.dateOfBirth)}</p>
      ),
    },
    {
      field: 'role.name',
      headerName: 'Role',
      minWidth: 100,
      flex: 1,
      align: 'left',
      headerAlign: 'left',
      hideable: false,
      renderCell: (params: GridRenderCellParams<any, number>) => (
        <p className={`text-black line-clamp-1`}>{params.row.role.name}</p>
      ),
    },
    {
      field: 'address',
      headerName: 'Address',
      type: 'number',
      minWidth: 100,
      flex: 1.2,
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
              navigate('/user/' + params.params.row.id)
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
      <h4 className='font-semibold text-xl'>User management</h4>

      <div className='mt-4 flex justify-between'>
        <TextFieldV2
          type='search'
          onChange={handleChangeSearch}
          value={inputSearch}
          placeholder='Search by name'
          width='350px'
        />
      </div>

      <div className='mt-3 w-full overflow-x-hidden'>
        <Table
          columns={columnsUser}
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
  )
}

export default User
