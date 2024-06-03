import TextFieldV2 from '@components/TextFieldV2'
import { useDebounce } from '@hooks/useDebounce'
import { FC, useState } from 'react'

interface Props {}

const Jobs: FC<Props> = (props): JSX.Element => {
  const [inputSearch, setInputSearch] = useState<string>('')

  const handleChangeSearch = (value: any): void => {
    setInputSearch(value.target.value)
  }

  const debounced = useDebounce(inputSearch, 500)
  return (
    <div className='p-4 bg-white rounded-md flex-1 flex flex-col shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]'>
      <>
        <h4 className='font-semibold text-xl'>Job management</h4>

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
        </div>

        {/* <div className='mt-3 w-full overflow-x-hidden'>
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
        </div> */}
      </>
    </div>
  )
}

export default Jobs
