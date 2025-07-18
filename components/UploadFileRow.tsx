import { UploadedFile } from '@/schemas/file'
import React, { FC } from 'react'
import { TableCell, TableRow } from './ui/table'
import { FileAction } from './FileAction'

interface IProps {
  file: UploadedFile,
  disableStarAction?: boolean
}

const UploadFileRow: FC<IProps> = ({ file, disableStarAction }) => {
  
     const extractType = (filename: string) => {
    return filename.split(".")[1]
  }
  const validateSize = (size: string) => {
    const denom = 1024;
    const kb = parseInt(size) / denom;
    const mb = kb / denom;
    const gb = mb / denom;

    if (kb < denom) {
      return `${kb.toFixed(2)} KB`
    }
    if (mb < denom) {
      return `${mb.toFixed(2)} MB`
    }
    
    return `${gb.toFixed(2)} GB`
  }
  return (
    <TableRow>
        <TableCell className="font-medium">{file.name}</TableCell>
        <TableCell className="uppercase">{extractType(file.name)}</TableCell>
        <TableCell>{validateSize(file.size)}</TableCell>
        {/* <TableCell className="text-right">{file.fileUrl}</TableCell> */}
          <TableCell>
              <FileAction disableStarAction={disableStarAction} file={file} />
        </TableCell>
    </TableRow>
  )
}

export default UploadFileRow