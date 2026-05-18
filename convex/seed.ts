import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const seed = mutation({
  args: {},
  returns: v.null(),
  handler: async (ctx) => {
    const factoryId = await ctx.db.insert("factories", {
      name: "Istanbul Ana Üretim Tesisi",
      location: "Kocaeli, Türkiye",
    });

    const camera1 = await ctx.db.insert("cameras", {
      factoryId,
      name: "Hat-01 Giriş",
      status: "online",
      lastSeen: Date.now(),
      url: "https://example.com/stream1",
    });

    const camera2 = await ctx.db.insert("cameras", {
      factoryId,
      name: "Hat-04 Paketleme",
      status: "online",
      lastSeen: Date.now(),
      url: "https://example.com/stream2",
    });

    // Add some mock detections
    await ctx.db.insert("detections", {
      cameraId: camera2,
      factoryId,
      type: "defect",
      subType: "Kapak Eksik",
      confidence: 0.92,
      timestamp: Date.now() - 1000 * 60 * 5, // 5 mins ago
      status: "pending",
      severity: "high",
    });

    await ctx.db.insert("detections", {
      cameraId: camera1,
      factoryId,
      type: "safety_violation",
      subType: "Kask Yok",
      confidence: 0.88,
      timestamp: Date.now() - 1000 * 60 * 15, // 15 mins ago
      status: "resolved",
      severity: "medium",
    });

    await ctx.db.insert("users", {
      name: "Ahmet Yılmaz",
      email: "ahmet@visionguard.ai",
      role: "admin",
    });

    return null;
  },
});
