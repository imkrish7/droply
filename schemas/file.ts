export type UploadedFile = {
        id: string,
        name: string,
        path: string,// document/project
        size: string,
        type: string,
    
        isTrash: boolean,
        fileUrl: string,
        thumbnailUrl: string,
    
        userId: string,
        parent: string,
    
        isFolder: boolean,
        isStared: boolean,
    
        createdAt: string,
        updatedAt: string
}