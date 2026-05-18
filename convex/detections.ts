import { query } from "./_generated/server";
import { v } from "convex/values";

export const listRecent = query({
  args: { factoryId: v.id("factories"), limit: v.number() },
  returns: v.array(v.object({
    _id: v.id("detections"),
    _creationTime: v.number(),
    cameraId: v.id("cameras"),
    factoryId: v.id("factories"),
    type: v.string(),
    subType: v.optional(v.string()),
    confidence: v.number(),
    timestamp: v.number(),
    imageUrl: v.optional(v.string()),
    status: v.union(v.literal("pending"), v.literal("resolved"), v.literal("ignored")),
    severity: v.union(v.literal("low"), v.literal("medium"), v.literal("high")),
  })),
  handler: async (ctx, args) => {
    return await ctx.db
      .query("detections")
      .withIndex("by_factory", (q) => q.eq("factoryId", args.factoryId))
      .order("desc")
      .take(args.limit);
  },
});
