import { query } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  args: {},
  returns: v.array(v.object({
    _id: v.id("factories"),
    _creationTime: v.number(),
    name: v.string(),
    location: v.string(),
  })),
  handler: async (ctx) => {
    return await ctx.db.query("factories").collect();
  },
});
