"use client"
import React, { useCallback, useEffect, useState } from 'react';
import UseDrivePicker from 'react-google-drive-picker'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { refreshToken } from "@/app/api/services/Api_service"
import DriveView from '../view/page';

const DriveCompo = () => {

  const [accessToken, setAccessToken] = useState("")
  const [fileId, setFileId] = useState<any>(null);
  const [fileUrls, setFileUrls] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [docsData, setDocsData] = useState(null);
  const [openPicker, authResponse] = UseDrivePicker();

  const ClientKey: any = process?.env?.NEXT_PUBLIC_CLIENT_KEY;
  const APIKey: any = process?.env?.NEXT_PUBLIC_API_KEY;
  const ClientSecret: any = process?.env?.NEXT_PUBLIC_CLIENT_SECRET;
  const Token: any = process?.env?.NEXT_PUBLIC_TOKEN || "";

  const Scopes = ['https://www.googleapis.com/auth/drive',
    'https://www.googleapis.com/auth/drive.file',
    'https://www.googleapis.com/auth/drive.metadata',
    'https://www.googleapis.com/auth/drive.metadata.readonly',
    'https://www.googleapis.com/auth/drive.photos.readonly',
    'https://www.googleapis.com/auth/drive.readonly'];

  const handleOpenPicker = () => {
    openPicker({
      clientId: ClientKey,
      developerKey: APIKey,
      viewId: "DOCS",
      token: accessToken,
      showUploadView: true,
      showUploadFolders: true,
      supportDrives: true,
      multiselect: true,
      customScopes: Scopes,
      // customViews: customViewsArray, // custom view
      callbackFunction: (data) => {
        if (data.action === 'picked') {
          const fileId = data.docs[0].id;
          const embedUrl = data.docs[0].embedUrl;
          console.log("@@@@@@@@@@@@2", embedUrl)
          setFileId(fileId)
          setFileUrls(data.docs[0]);

        } else if (data.action === 'cancel') {
          console.log('User clicked cancel/close button');
        }
      },
    })
  }

  const newTokenGenerate = async (token: any) => {
    const respToken = await refreshToken(ClientKey, ClientSecret, token);
    if (respToken) {
      console.log("set new Token--", respToken)
      setAccessToken(respToken);
    }
  }

  useEffect(() => {
    if (authResponse) {
      console.log("token--", authResponse)
      setAccessToken(authResponse.access_token)

      const refreshInterval = (authResponse.expires_in - 300) * 1000; // Refresh 5 minutes before expiry

      const intervalId = setInterval(() => {
        newTokenGenerate(authResponse.access_token);
      }, refreshInterval);

      return () => clearInterval(intervalId);
    }
  }, [authResponse])


  // This function send the selected document to that email
  const shareFile = useCallback(async (fileId: any, accessToken: any) => {
    const token = accessToken;
    const email = "webexpert889@gmail.com";
    setLoading(true)
    const response = await fetch('/api/share-file', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ fileId, token, email }),
    });

    const data = await response.json()
    if (data.status == 500) {
      setFileId("")
      setDocsData(data)
      toast.error(data.error)
    } else if (data.status == 200) {
      setFileId("")
      setDocsData(data)
      toast.success(data.message)
    }
    setLoading(false)
  }, [])


  useEffect(() => {
    if (accessToken && fileId) {
      shareFile(fileId, accessToken);
    }
  }, [accessToken, fileId, shareFile]);

  return (
    <>
      <ToastContainer />
      {!fileId && !fileUrls || docsData ?
        <button onClick={() => handleOpenPicker()} className='text-white bg-blue-700 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 mt-9'>Google Drive {loading ? "  loading...." : ""}</button>
        : ""}

      {docsData != "" && <DriveView FileUrls={fileUrls} />}

    </>
  )
}

export default DriveCompo