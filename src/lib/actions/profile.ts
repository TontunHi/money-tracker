"use server";

import { db } from "@/lib/db";
import { profiles } from "@/lib/db/schema";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";

export async function getProfile() {
  const profile = await db.query.profiles.findFirst();
  
  if (!profile) {
    // Create default profile if not exists
    const [newProfile] = await db.insert(profiles).values({
      name: "Guest User",
    }).returning();
    return newProfile;
  }
  
  return profile;
}

export async function updateProfile(data: {
  name?: string;
  email?: string | null;
  avatarUrl?: string | null;
  bio?: string | null;
}) {
  const existingProfile = await db.query.profiles.findFirst();
  
  if (!existingProfile) {
    await db.insert(profiles).values({
      name: data.name || "Guest User",
      email: data.email,
      avatarUrl: data.avatarUrl,
      bio: data.bio,
    });
  } else {
    await db.update(profiles)
      .set({
        ...data,
        updatedAt: new Date(),
      })
      .where(eq(profiles.id, existingProfile.id));
  }
  
  revalidatePath("/", "layout");
}
