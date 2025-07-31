import { db } from "../../../lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log("Received data for skills assessment:", body);

    const docRef = await addDoc(collection(db, "assessments-skills"), {
      ...body,
      createdAt: serverTimestamp(),
    });

    return NextResponse.json({
      message: "Skills assessment saved successfully!",
      documentId: docRef.id,
    });
  } catch (error) {
    console.error("Error saving skills assessment:", error);
    return NextResponse.json({ error: "Failed to save skills assessment" }, { status: 500 });
  }
} 