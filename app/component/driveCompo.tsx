"use client"
import React,{useCallback, useEffect,useState} from 'react';
import UseDrivePicker from 'react-google-drive-picker'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DriveCompo = () => {
    
    const [accessToken,setAccessToken] = useState("")
    const [fileId, setFileId] = useState("");
    const [openPicker, authResponse] = UseDrivePicker();  

    const ClientKey:any =  process?.env?.NEXT_PUBLIC_CLIENT_KEY;
    const APIKey:any =  process?.env?.NEXT_PUBLIC_API_KEY;
    const Token:any = process?.env?.NEXT_PUBLIC_TOKEN || "";

    const Scopes = ['https://www.googleapis.com/auth/drive',
    'https://www.googleapis.com/auth/drive.file',
    'https://www.googleapis.com/auth/drive.metadata',
    'https://www.googleapis.com/auth/drive.metadata.readonly',
    'https://www.googleapis.com/auth/drive.photos.readonly',
    'https://www.googleapis.com/auth/drive.readonly'];

    const handleOpenPicker = () => {
        openPicker({
        clientId:ClientKey,
        developerKey: APIKey,
        viewId: "DOCS",
        // token: Token, // pass oauth token in case you already have one
        showUploadView: true,
        showUploadFolders: true,
        supportDrives: true,
        multiselect: true,
        customScopes:Scopes,
        // customViews: customViewsArray, // custom view
        callbackFunction: (data) => {
            if (data.action === 'picked') {
              const fileId = data.docs[0].id;
              setFileId(fileId)
            } else if (data.action === 'cancel') {
                console.log('User clicked cancel/close button');
            }
        },
      })
    }

    useEffect(()=>{
      if (authResponse) {
        console.log("token--",authResponse)
        setAccessToken(authResponse.access_token)
      }
    },[authResponse])   


   const shareFile = useCallback(async(fileId:any,accessToken:any) =>{
      console.log("accessToken---",accessToken,"-------fileId",fileId)
      const token = accessToken;
      const email = "webexpert889@gmail.com";

      const response = await fetch('/api/share-file', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ fileId, token ,email }),
      });

      const data = await response.json()
      if(data.status == 500){
        setFileId("")
        setAccessToken("")
        toast.error(data.error)
      }else if(data.status == 200){
        setFileId("")
        setAccessToken("")
        toast.success(data.message)
      }
   },[])


   useEffect(() => {
    if (accessToken && fileId) {
      shareFile(fileId, accessToken);
    }
  }, [accessToken, fileId, shareFile]);

  return (
    <div>
        <ToastContainer />
        <button onClick={() => handleOpenPicker()} className='text-white bg-blue-700 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 mt-9'>Google Drive</button>

    </div>
  )
}

export default DriveCompo