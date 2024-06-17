//Refresh Token Function
export async function refreshToken(ClientKey,ClientSecret, token) {
    try {
      const response = await fetch('https://oauth2.googleapis.com/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
          client_id: ClientKey,
          client_secret:ClientSecret,
          refresh_token: token,
          grant_type: 'refresh_token'
        })
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      
  
      if (data.error) {
        throw new Error(`API error! ${data.error}: ${data.error_description}`);
      }
  
      const newAccessToken = data.access_token;
      console.log('New Access Token:', newAccessToken);
      return newAccessToken
      // Use the new access token
  
    } catch (error) {
      console.error('Error refreshing token:', error);
    }
  }