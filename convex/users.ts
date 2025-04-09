import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const CreateUser = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    picture: v.string(),
    sub: v.string(), // Add sub to args
  },
  handler: async (ctx, args) => {
    // First try to find user by sub
    const existingUser = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("sub"), args.sub))
      .first();

    if (!existingUser) {
      const newUser = await ctx.db.insert("users", {
        name: args.name,
        email: args.email,
        picture: args.picture,
        credits: 5000,
        sub: args.sub,
      });
      return newUser;
    }
    return existingUser;
  },
});
