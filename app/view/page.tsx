'use client'
import React,{useState,useCallback,memo} from 'react'
import { getFileMetadata,exportAndDownloadFile } from '../api/services/Api_service'

const DriveView = (FileUrls:any) => {
    let fileIds ="1SQzX2auyMwUjyQZdck6t3GyaQNsVLgdEETJAMEaaMO0"
    
   
    const accessToken = "ya29.a0AXooCgut9I-3ToA-79G_j9xIcqAYvbcBDx18TMg7uLA9o2i1WLUaJuaCL_9b_eslept5pcv2X8IYm1d9eaDRpHM5r7cZeFdTftF1fWDQXuqd3E2FPsUyGDyOswV3JKoAG07fj4NRH1FEsZJHIqzBJUcbvWcTM-aA520aCgYKAYUSARMSFQHGX2MiNjPNvTJHOUQZhAXCrIVKLg0170"

    const [fileContent, setFileContent] = useState<any|null>(null);
    const [fileType, setFileType] = useState<any|null>(null);

    // const handleAccessFile = useCallback(async () => {
    //     if (!accessToken) {
    //       console.error('No access token available');
    //       return;
    //     }
    
    //     // const fileIds = fileId.fileId;
    //     const url = `https://www.googleapis.com/drive/v3/files/${fileIds}?alt=media`;

    //     const metadata = await getFileMetadata(fileIds, accessToken);
    //     console.log('File metadata:', metadata);

    //     let fileUrl = '';
    //     let mimeType:any = '';
  
    //     if (metadata.mimeType.startsWith('application/vnd.google-apps')) {
    //         const exportData = await exportAndDownloadFile(fileIds, accessToken, metadata.mimeType);
    //         fileUrl = exportData.objectUrl;
    //         mimeType = exportData.mimeType;
    //         console.log("#############33",exportData)

    //     }else {
    //         const url = `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`;
    //         const response = await fetch(url, {
    //           headers: {
    //             Authorization: `Bearer ${accessToken}`,
    //           },
    //         });
    
    //         if (!response.ok) {
    //           throw new Error(`Error fetching file: ${response.statusText}`);
    //         }
    
    //         const blob = await response.blob();
    //         fileUrl = URL.createObjectURL(blob);
    //         mimeType = response.headers.get('content-type');
    //     }

    //         setFileContent(fileUrl);
    //         setFileType(mimeType);
        
        
    //     // if(fileIds){
    //     //     try {
    //     //         console.log("@@@@@@@@@@@@22",fileIds)
    //     //         const response = await fetch(url, {
    //     //           headers: {
    //     //             Authorization: `Bearer ${accessToken}`,
    //     //           },
    //     //         });
          
    //     //         if (!response.ok) {
    //     //           throw new Error(`HTTP error! status: ${response.status}`);
    //     //         }
          
    //     //           const contentType = response.headers.get('content-type');
    //     //           setFileType(contentType);
      
    //     //           const blob = await response.blob();
    //     //           const objectUrl = URL.createObjectURL(blob);
    //     //           setFileContent(objectUrl);
    //     //       } catch (error) {
    //     //         console.error('Error accessing file:', error);
    //     //       }
    //     // }else{
    //     //     console.log("!!!!!!!!!!!!!! No filed id")
    //     // }
        
    // },[fileIds]);   
  
  
  return (
    <>
     <h1 className='text-1xl mt-6 text-black'>DriveView</h1>
     {/* <button onClick={handleAccessFile} className='text-white bg-blue-700 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 mt-9 ml-2'>Access File</button> */}

     {/* {fileContent && (
        <>
          {fileType && fileType.startsWith('text/') && (
            <iframe src={fileContent} title="Text File" style={{ width: '100%', height: '500px' }}></iframe>
          )}
          {fileType && fileType === 'application/pdf' && (
            <iframe src={fileContent} title="PDF File" style={{ width: '100%', height: '500px' }}></iframe>
          )}
          {fileType && fileType.startsWith('image/') && (
            <img src={fileContent} alt="Image File" style={{ maxWidth: '100%' }} />
          )}
          {fileType && !fileType.startsWith('text/') && !fileType.startsWith('image/') && fileType !== 'application/pdf' && (
            <a href={fileContent} download="file" target="_blank" rel="noopener noreferrer" className="ml-5 bg-blue-700 hover:bg-blue-700 focus:ring-4 font-medium rounded-lg text-s text-white px-4 py-2">
              Download File
            </a>
          )}
        </>
      )} */}

      <iframe src={FileUrls?.FileUrls?.url} style={{ width: '100%', height: '500px' }}></iframe>


    </>
  )
}

export default  memo(DriveView)
