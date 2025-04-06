import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const CreateUser = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    picture: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("email"), args.email))
      .first();

    if (!user) {
      const newUser = await ctx.db.insert("users", {
        name: args.name,
        email: args.email,
        picture: args.picture,
        credits: 5000,
      });
      return newUser;
    }
    return user;
  },
});
