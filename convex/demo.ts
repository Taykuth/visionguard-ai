import { internalMutation, mutation } from "./_generated/server";
import { v } from "convex/values";
import { internal } from "./_generated/api";

export const generateRandomDetection = internalMutation({
  args: { factoryId: v.id("factories") },
  returns: v.null(),
  handler: async (ctx, args) => {
    const cameras = await ctx.db
      .query("cameras")
      .withIndex("by_factory", (q) => q.eq("factoryId", args.factoryId))
      .collect();

    if (cameras.length === 0) return null;

    const camera = cameras[Math.floor(Math.random() * cameras.length)];
    const types = [
      { type: "defect", sub: "Kapak Eksik", severity: "high" },
      { type: "defect", sub: "Etiket Hatalı", severity: "medium" },
      { type: "safety_violation", sub: "Kask Yok", severity: "high" },
      { type: "safety_violation", sub: "Yelek Eksik", severity: "medium" },
      { type: "count_error", sub: "Eksik Paket", severity: "low" },
    ] as const;

    const pick = types[Math.floor(Math.random() * types.length)];

    await ctx.db.insert("detections", {
      cameraId: camera._id,
      factoryId: args.factoryId,
      type: pick.type,
      subType: pick.sub,
      confidence: 0.85 + Math.random() * 0.14,
      timestamp: Date.now(),
      status: "pending",
      severity: pick.severity,
    });

    // Schedule next one in 5-10 seconds
    await ctx.scheduler.runAfter(5000 + Math.random() * 5000, internal.demo.generateRandomDetection, {
      factoryId: args.factoryId,
    });
    
    return null;
  },
});

export const startSimulation = mutation({
  args: { factoryId: v.id("factories") },
  returns: v.null(),
  handler: async (ctx, args) => {
    await ctx.scheduler.runAfter(1000, internal.demo.generateRandomDetection, {
      factoryId: args.factoryId,
    });
    return null;
  },
});
