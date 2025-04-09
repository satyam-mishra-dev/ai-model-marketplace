import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { image } from "motion/react-client";
import { title } from "process";
import { use } from "react";

export default defineSchema({
  users: defineTable({
    name: v.string(),
    email: v.string(),
    picture: v.string(),
    credits: v.float64(),
    sub: v.string(), // Google Auth sub ID
  }),
  userAiAssistants: defineTable({
    id: v.number(),
    name: v.string(),
    title: v.string(),
    image: v.string(),
    instruction: v.string(),
    userInstruction: v.string(),
    sampleQuestions: v.array(v.string()),
    uid: v.id('users'),
  }),

});