import React, { FC } from 'react'
import { Table, TableBody, TableHead, TableHeader, TableRow } from './ui/table'
import { Library } from 'lucide-react'
import { UploadedFile } from '@/schemas/file'
import UploadFileRow from './UploadFileRow'

interface IProps {
    files: UploadedFile[],
    disableStarAction?: boolean
}

const FileTable: FC<IProps> = ({ files, disableStarAction }) => {
   
  return (
     <Table>
          <TableHeader className="">
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Size</TableHead>
              <TableHead>
                <Library className="w-10 h-10"/>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {files.length > 0 && files.map((file: UploadedFile) => (
              <UploadFileRow disableStarAction={disableStarAction} key={file.id} file={file} />
            ))}
          </TableBody>
            </Table>
  )
}

export default FileTable