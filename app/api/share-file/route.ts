import { google } from 'googleapis';
import { NextRequest } from "next/server";


const hasOwnerPermission = (permissions:any) => {
    return permissions.some((permission:any) => permission.role === 'owner');
  };
  
  export async function POST(res : NextRequest) {
      if (res.method !== 'POST') {
          return Response.json({ message: 'Only POST requests allowed',status:200 });
      }
      const data  = await res.json();
      const {fileId,token,email} = data;
  
      if(token) {
        const oauth2Client = new google.auth.OAuth2();
        oauth2Client.setCredentials({ access_token: token });
    
        const drive = google.drive({ version: 'v3', auth: oauth2Client });    
        try {
            const currentPermissions = await drive.permissions.list({
              fileId: fileId,
            });
            const permissions = currentPermissions.data.permissions
  
            if (hasOwnerPermission(permissions)) {
  
                    // const  = await drive.permissions.create({
                    //     fileId: fileId,
                    //     requestBody: {
                    //         role: 'reader',
                    //         type: 'anyone',
                    //     },              
                    // });
                  const responseEmail = await drive.permissions.create({
                    fileId: fileId,
                    requestBody: {
                        role: 'reader',
                        type: 'user',
                        emailAddress:email ,
                        pendingOwner:false
                    },
                });
  
                // console.log("Response for anyone:", response.data);
                // console.log("Response for email:", responseEmail.data);
                return Response.json({ message: `File shared successfully to this ${email}`, data: "data" ,status:200});  
            }else{
                return Response.json({message: "User has no owner permission" , status:500 });
            }            
  
        } catch (error:any) {
            console.error('Error sharing file:', error.errors[0]);
            const message = error.errors[0].message || "User has no owner permission";
           return Response.json({error: message , status:500 });
        }
  
      }else{
        return Response.json("Empty access Token",{status:500})
      }
  }
  
  