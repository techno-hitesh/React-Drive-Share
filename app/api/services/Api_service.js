//Refresh Token Function
export const refreshToken = async (clientId, clientSecret, refreshToken) => {
    try {
      const response = await fetch('https://oauth2.googleapis.com/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
          client_id: clientId,
          client_secret: clientSecret,
          refresh_token: refreshToken,
          grant_type: 'refresh_token'
        })
      });
  
      const data = await response.json();
  
      if (!response.ok || data.error) {
        throw new Error(`Error: ${data.error}, Description: ${data.error_description}`);
      }

      return data.access_token;
    } catch (error) {
      console.error('Error refreshing token:', error);
      return null;
    }
  };
  


  export const getFileMetadata = async (fileId, accessToken) => {
    const url = `https://www.googleapis.com/drive/v3/files/${fileId}?fields=id,name,mimeType`;
  
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  
    if (!response.ok) {
      throw new Error(`Error fetching file metadata: ${response.statusText}`);
    }
  
    const metadata = await response.json();
    return metadata;
  };
  


  export const exportAndDownloadFile = async (fileId, accessToken, mimeType) => {
    const exportMimeTypeMap = {
        'application/vnd.google-apps.document': 'application/pdf',
        'application/vnd.google-apps.spreadsheet': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'application/vnd.google-apps.presentation': 'application/pdf',
      };
  
    const exportMimeType = exportMimeTypeMap[mimeType];
    if (!exportMimeType) {
      throw new Error('Unsupported Google Docs editor file type');
    }
  
    const url = `https://www.googleapis.com/drive/v3/files/${fileId}/export?mimeType=${exportMimeType}`;
  
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  
    if (!response.ok) {
      throw new Error(`Error exporting file: ${response.statusText}`);
    }
  
    const blob = await response.blob();
    const objectUrl = URL.createObjectURL(blob);
    return { objectUrl, mimeType: exportMimeType };
  };
  
  