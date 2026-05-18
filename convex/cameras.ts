import { query } from "./_generated/server";
import { v } from "convex/values";

export const listByFactory = query({
  args: { factoryId: v.id("factories") },
  returns: v.array(v.object({
    _id: v.id("cameras"),
    _creationTime: v.number(),
    factoryId: v.id("factories"),
    name: v.string(),
    status: v.union(v.literal("online"), v.literal("offline")),
    lastSeen: v.number(),
    url: v.string(),
  })),
  handler: async (ctx, args) => {
    return await ctx.db
      .query("cameras")
      .withIndex("by_factory", (q) => q.eq("factoryId", args.factoryId))
      .collect();
  },
});
