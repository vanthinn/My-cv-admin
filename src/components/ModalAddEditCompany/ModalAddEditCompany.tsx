import { Dialog, Transition } from '@headlessui/react'
import { FC, Fragment, useEffect, useRef, useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Controller, useForm } from 'react-hook-form'
import { ContentState, EditorState, convertToRaw } from 'draft-js'
import draftToHtml from 'draftjs-to-html'
import htmlToDraft from 'html-to-draftjs'
import { useStoreActions, useStoreState } from 'easy-peasy'
import {
  companyActionSelector,
  companyStateSelector,
  notifyActionSelector,
  userActionSelector,
} from '../../store'
import { Image } from '@interfaces/ICommon'
import { ICompany } from '@interfaces/ICompany'
import Selected from '@components/Select'
import { fieldOfActivityData, scaleData } from '@commom/constants'
import TextFieldV2 from '@components/TextFieldV2'
import MultiImage from '@components/MultiImage'
import RichTextEditTor from '@components/RichTextEditor'
import Button from '@components/Button/Button'

interface Props {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  company: ICompany | null
  handleAction: any
}

const schema = yup.object().shape({
  displayName: yup.string().required('DisplayName is required'),
  logoUrl: yup.string().required('Logo is required'),
  phoneNumber: yup.string().required('Phone number is required'),
  fieldOfActivity: yup.string().required('Field of activity is required'),
  scale: yup.string().required('Scale is required'),
  email: yup.string().required('Email is required'),
  address: yup.string().required('Address is required'),
})

const ModalAddEditCompany: FC<Props> = ({
  open,
  setOpen,
  company,
  handleAction,
}: Props): JSX.Element => {
  const { postImage } = useStoreActions(userActionSelector)
  const ImageRef: any = useRef()
  const [Images, setImages] = useState<Image[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [editorState, setEditorState] = useState(EditorState.createEmpty())

  const defaultValues: ICompany = {
    id: company?.id || '',
    displayName: company?.displayName || '',
    logoUrl: company?.logoUrl || '',
    phoneNumber: company?.phoneNumber || '',
    fieldOfActivity: company?.fieldOfActivity || '',
    scale: company?.scale || '',
    description: company?.description || '',
    images: '',
    email: company?.email || '',
    address: company?.address || '',
    website: company?.website || '',
  }

  const { handleSubmit, control, setValue } = useForm<ICompany>({
    defaultValues: defaultValues,
    resolver: yupResolver(schema),
  })

  const _deleteImage = () => {
    setImages([])
    setValue('logoUrl', '')
  }

  const getUrlImage = async (file: any): Promise<void> => {
    setIsLoading(true)
    const formData = new FormData()
    formData.append(`documents`, file[0])
    const resImage = await postImage(formData)
    if (resImage) {
      setValue('logoUrl', resImage[0].fileUrl)
    }
    setIsLoading(false)
  }

  const handleFileChange = (file: any) => {
    getUrlImage(file)
    const newFiles: any = Array.from(file)
    let newImages = [...newFiles]
    const newImagePreview: any = newImages.map((fileImage: any) => {
      if (fileImage.size) {
        return {
          name: fileImage.name.split('.')[0],
          fileUrl: URL.createObjectURL(fileImage),
        }
      }
      return fileImage
    })
    setImages(newImagePreview)
  }

  const onEditorStateChange = (editorState: EditorState) => {
    setEditorState(editorState)
    if (editorState.getCurrentContent().hasText()) {
      const dataHTML = draftToHtml(convertToRaw(editorState.getCurrentContent()))
      setValue('description', dataHTML)
    } else {
      setValue('description', '')
    }
  }

  const onSubmit = async (data: any) => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    const dataHTML = draftToHtml(convertToRaw(editorState.getCurrentContent()))
    handleAction({ ...data, description: dataHTML })
  }

  // const valueAvatarUrl = watch('logo')

  // useEffect(() => {
  //   if (valueAvatarUrl !== '') {
  //     clearErrors('logo')
  //   }
  // }, [valueAvatarUrl])

  useEffect(() => {
    if (company) {
      const contentBlock = htmlToDraft(company?.description || '')
      const { contentBlocks, entityMap } = contentBlock
      const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap)
      const newEditorState = EditorState.createWithContent(contentState)
      setTimeout(() => {
        setEditorState(newEditorState)
      }, 50)

      if (company.logoUrl) {
        const imagePreview: Image[] = [
          {
            name: company?.displayName || '',
            fileUrl: company?.logoUrl || '',
          },
        ]
        setImages(imagePreview)
      }
    }
  }, [company])
  return (
    <div>
      <Transition
        appear
        show={open}
        as={Fragment}>
        <Dialog
          as='div'
          className='relative z-[999]'
          onClose={() => setOpen(false)}>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'>
            <div className='fixed inset-0 bg-black bg-opacity-25' />
          </Transition.Child>

          <div className='fixed inset-0 overflow-y-auto'>
            <div className='flex min-h-full items-center justify-center p-4 text-center'>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0 scale-95'
                enterTo='opacity-100 scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 scale-100'
                leaveTo='opacity-0 scale-95'>
                <Dialog.Panel className='relative w-full max-w-[700px] max-h-[600px]  overflow-y-auto overflow-hidden flex flex-col transform  rounded-xl bg-white p-4 text-left align-middle shadow-xl transition-all'>
                  <div className='flex flex-col gap-2 relative'>
                    <h2 className='m-auto text-xl font-semibold'>
                      {company ? 'Edit' : 'Add new'} company
                    </h2>
                    <span
                      className='absolute top-0 right-0 text-xl text-gray-500 cursor-pointer'
                      onClick={() => setOpen(false)}>
                      X
                    </span>
                  </div>
                  <div className='mt-2.5'>
                    <form
                      className='mt-4 flex-1'
                      onSubmit={handleSubmit(onSubmit)}>
                      <div className='grid grid-cols-1 gap-4 flex-1'>
                        <div className='grid grid-cols-2 gap-4'>
                          <div className='col-span-1 flex flex-col'>
                            <label
                              htmlFor=''
                              className='font-semibold text-gray-700'>
                              Company name <span className='text-red-600'>*</span>
                            </label>
                            <Controller
                              name='displayName'
                              control={control}
                              render={({
                                field: { onChange, value },
                                fieldState: { error },
                              }) => (
                                <TextFieldV2
                                  disabled={!!company}
                                  error={error}
                                  onChange={onChange}
                                  value={value}
                                />
                              )}
                            />
                          </div>

                          <div className='col-span-1 flex flex-col '>
                            <label
                              htmlFor=''
                              className='font-semibold text-gray-700'>
                              Field of activity <span className='text-red-600'>*</span>
                            </label>
                            <Controller
                              name='fieldOfActivity'
                              control={control}
                              render={({
                                field: { onChange, value },
                                fieldState: { error },
                              }) => (
                                <Selected
                                  error={error}
                                  onChange={onChange}
                                  value={value}
                                  options={fieldOfActivityData}
                                  empty='Select activity'
                                />
                              )}
                            />
                          </div>
                        </div>

                        <div className='grid grid-cols-3 gap-4'>
                          <div className='col-span-1'>
                            <label
                              htmlFor=''
                              className='font-semibold text-gray-700'>
                              Logo<span className='text-red-600'>*</span>
                            </label>
                            <Controller
                              name='logoUrl'
                              control={control}
                              render={({ field: {}, fieldState: { error } }) => (
                                <>
                                  <MultiImage
                                    single={true}
                                    listImage={Images}
                                    deleteImage={_deleteImage}
                                    handleFileChange={handleFileChange}
                                    InputRef={ImageRef}
                                    loading={isLoading}
                                    height='150px'
                                  />
                                  {error && (
                                    <span className='text-red-600 text-sm'>
                                      {error?.message}
                                    </span>
                                  )}
                                </>
                              )}
                            />
                          </div>
                          <div className='col-span-2 grid gird-cols-2 gap-4 '>
                            <div className='col-span-2 flex flex-col '>
                              <label
                                htmlFor=''
                                className='font-semibold text-gray-700'>
                                Address<span className='text-red-600'>*</span>
                              </label>
                              <Controller
                                name='address'
                                control={control}
                                render={({
                                  field: { onChange, value },
                                  fieldState: { error },
                                }) => (
                                  <TextFieldV2
                                    error={error}
                                    onChange={onChange}
                                    value={value}
                                  />
                                )}
                              />
                            </div>
                            <div className='col-span-2 flex gap-4'>
                              <div className='w-1/2 flex flex-col '>
                                <label
                                  htmlFor=''
                                  className='font-semibold text-gray-700'>
                                  Scale <span className='text-red-600'>*</span>
                                </label>
                                <Controller
                                  name='scale'
                                  control={control}
                                  render={({
                                    field: { onChange, value },
                                    fieldState: { error },
                                  }) => (
                                    <Selected
                                      error={error}
                                      onChange={onChange}
                                      value={value}
                                      options={scaleData}
                                      empty='Select activity'
                                    />
                                  )}
                                />
                              </div>

                              <div className='w-1/2 flex flex-col'>
                                <label
                                  htmlFor=''
                                  className='font-semibold text-gray-700'>
                                  Website
                                </label>
                                <Controller
                                  name='website'
                                  control={control}
                                  render={({
                                    field: { onChange, value },
                                    fieldState: { error },
                                  }) => (
                                    <TextFieldV2
                                      error={error}
                                      onChange={onChange}
                                      value={value}
                                    />
                                  )}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className='grid grid-cols-2 gap-8 mt-4'>
                        <div className='col-span-1 flex flex-col'>
                          <label
                            htmlFor=''
                            className='font-semibold text-gray-700'>
                            Phone number <span className='text-red-600'>*</span>
                          </label>
                          <Controller
                            name='phoneNumber'
                            control={control}
                            render={({
                              field: { onChange, value },
                              fieldState: { error },
                            }) => (
                              <TextFieldV2
                                error={error}
                                onChange={onChange}
                                value={value}
                              />
                            )}
                          />
                        </div>
                        <div className='col-span-1 flex flex-col'>
                          <label
                            htmlFor=''
                            className='font-semibold text-gray-700'>
                            Email <span className='text-red-600'>*</span>
                          </label>
                          <Controller
                            name='email'
                            control={control}
                            render={({
                              field: { onChange, value },
                              fieldState: { error },
                            }) => (
                              <TextFieldV2
                                error={error}
                                onChange={onChange}
                                value={value}
                              />
                            )}
                          />
                        </div>
                      </div>
                      <div className='mt-4'>
                        <label
                          htmlFor=''
                          className='font-semibold text-gray-700'>
                          Description
                        </label>
                        <div className='mt-2 '>
                          <RichTextEditTor
                            editorState={editorState}
                            onEditorStateChange={onEditorStateChange}
                          />
                        </div>
                      </div>

                      <div className='mt-6 flex justify-end'>
                        <div className='flex gap-4'>
                          <Button
                            typeButton='cancel'
                            onClick={(e) => {
                              e.preventDefault()
                              setOpen(false)
                            }}
                            className='px-2 py-1'>
                            Cancel
                          </Button>
                          <Button
                            type='submit'
                            className='px-2 py-1'>
                            Save
                          </Button>
                        </div>
                      </div>
                    </form>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  )
}

export default ModalAddEditCompany
