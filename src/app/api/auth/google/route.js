import {redirect} from 'next/navigation';
import { getGoogleOauthUrl } from '@/lib/googleOauthUtils';
//Start login
export async function GET(){
    const googleUrl = getGoogleOauthUrl();
    redirect(googleUrl)
}