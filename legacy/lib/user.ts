import { User } from "@clerk/nextjs/server";
import { getDbConnection } from "./db";

export async function getPriceIdForActiveUser(email:string){
        const sql = await getDbConnection();
        const query = await sql`SELECT price_id FROM users WHERE email=${email} AND status='active'`;

        return query?.[0]?.price_id || null;
}

export async function hasActivePlan(email:string){
        const sql = await getDbConnection();
        const query = await sql`SELECT price_id, status FROM users WHERE email=${email} AND status='active' AND price_id IS NOT NULL`

        return query && query.length > 0;
}

// export async function getSubscriptionStatus(user:User) {
    
//     const hasSubscription = await hasActivePlan(user.emailAddresses[0].emailAddress)

//     return hasSubscription;
// }