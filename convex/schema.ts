import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  factories: defineTable({
    name: v.string(),
    location: v.string(),
  }),
  cameras: defineTable({
    factoryId: v.id("factories"),
    name: v.string(),
    status: v.union(v.literal("online"), v.literal("offline")),
    lastSeen: v.number(),
    url: v.string(),
  }).index("by_factory", ["factoryId"]),
  detections: defineTable({
    cameraId: v.id("cameras"),
    factoryId: v.id("factories"),
    type: v.string(), // "defect", "missing_item", "wrong_label", "safety_violation", "count_error"
    subType: v.optional(v.string()), 
    confidence: v.number(),
    timestamp: v.number(),
    imageUrl: v.optional(v.string()),
    status: v.union(v.literal("pending"), v.literal("resolved"), v.literal("ignored")),
    severity: v.union(v.literal("low"), v.literal("medium"), v.literal("high")),
  }).index("by_camera", ["cameraId"])
    .index("by_factory", ["factoryId"])
    .index("by_timestamp", ["timestamp"]),
  users: defineTable({
    name: v.string(),
    email: v.string(),
    role: v.union(v.literal("admin"), v.literal("operator"), v.literal("viewer")),
    factoryId: v.optional(v.id("factories")),
  }).index("by_email", ["email"]),
});
