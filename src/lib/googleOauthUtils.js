import {google} from 'googleapis';
import {getDB} from '@/lib/mongodb';

// Helper functions for Google OAuth authentication and user information

const oauthclient = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_SECRET,
    process.env.GOOGLE_REDIRECT
)

export const getGoogleOauthUrl = () => {
    const scopes = [
        "https://www.googleapis.com/auth/userinfo.email",
        "https://www.googleapis.com/auth/userinfo.profile",
    ];
    return oauthclient.generateAuthUrl({
        access_type: "offline",
        prompt: "consent",
        scope: scopes
    })
}

export async function getGoogleUser(code){
    const {tokens} = await oauthclient.getToken(code);
    const response = await fetch (
        `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${tokens.access_token}`
    )
    const userInfo = await response.json();
    return userInfo;
}

export async function updateOrCreateUserInfo(oauthUserInfo){
    const db = await getDB();

    const {id, email, name, picture} = oauthUserInfo;

    let user = await db.collection('users').findOne({email});

    if(!user){
        const result = await db.collection("users").insertOne({
            googleId:id,
            email,
            name,
            picture
        })

    user = {
        _id: result.insertedId,
        googleId: id,
        email,
        name,
        picture
    };

   
    }
    return user 
}



