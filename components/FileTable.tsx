import React, { FC } from 'react'
import { Table, TableBody, TableHead, TableHeader, TableRow } from './ui/table'
import { Library } from 'lucide-react'
import { UploadedFile } from '@/schemas/file'
import UploadFileRow from './UploadFileRow'

interface IProps {
    files: UploadedFile[],
  disableStarAction?: boolean,
  filterFile: (id: string) => void
  updateFile?: <K extends keyof UploadedFile>(id: string, field: K, value: UploadedFile[K]) => void
}

const FileTable: FC<IProps> = ({ files, disableStarAction, filterFile, updateFile }) => {
   
  return (
     <Table>
          <TableHeader className="">
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Size</TableHead>
              <TableHead>View</TableHead>
              <TableHead>
                <Library className="w-8 h-8"/>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {files.length > 0 && files.map((file: UploadedFile) => (
              <UploadFileRow updateFile={updateFile} filterFile={filterFile} disableStarAction={disableStarAction} key={file.id} file={file} />
            ))}
          </TableBody>
            </Table>
  )
}

export default FileTable