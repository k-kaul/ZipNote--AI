import { pricingPlans } from "@/utils/contants";
import { getUserUploadCount } from "./summaries";
import {getPriceIdForActiveUser} from "./user";


export default async function reachedUploadLimit(userId:string){
    const uploadCount = await getUserUploadCount(userId);

    const priceId = await getPriceIdForActiveUser(userId);

    const isPro = pricingPlans.find((plan) => plan.priceId === priceId)?.id === 'pro';
    
    const uploadLimit:number = isPro ? 1000 : 5;

    return {hasReachedUploadLimit: uploadCount >= uploadLimit, uploadLimit}

}