import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const InsertSelectedAssistants = mutation({
    args: {
        records: v.array(v.object({
            id: v.number(),
            name: v.string(),
            title: v.string(),
            image: v.string(),
            instruction: v.string(),
            userInstruction: v.string(),
            sampleQuestions: v.array(v.string()),
            uid: v.string()
        }))
    },
    handler: async (ctx, args) => {
        console.log('InsertSelectedAssistants called with args:', args);
        const insertedIds = await Promise.all(
            args.records.map(async (record) => {
                // Look up the Convex user ID using the Google sub
                const user = await ctx.db
                    .query("users")
                    .filter(q => q.eq(q.field("sub"), record.uid))
                    .first();
                
                if (!user) {
                    throw new Error(`User not found with sub: ${record.uid}`);
                }

                // Use the Convex user ID for the assistant record
                return await ctx.db.insert("userAiAssistants", {
                    ...record,
                    uid: user._id
                });
            })
        );
        console.log('Inserted IDs:', insertedIds);
        return insertedIds;
    }
});