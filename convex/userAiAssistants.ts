import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const InsertSelectedAssistants = mutation({
    args: {
        records: v.object({
            id: v.number(),
            name: v.string(),
            title: v.string(),
            image: v.string(),
            instruction: v.string(),
            userInstruction: v.string(),
            sampleQuestions: v.array(v.string()),
            uid: v.id("users")
        })
    },
    handler: async (ctx, args) => {
        const result = await ctx.db.insert("userAiAssistants", args.records);
        return result;
    }
});