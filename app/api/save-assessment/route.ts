import { db } from "../../../lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Here, you would typically validate the body against a schema
    // For now, we'll just log it and save it.
    console.log("Received data:", body);

    const docRef = await addDoc(collection(db, "assessments-competency"), {
      ...body,
      createdAt: serverTimestamp(),
    });

    return NextResponse.json({
      message: "Assessment saved successfully!",
      documentId: docRef.id,
    });
  } catch (error) {
    console.error("Error saving assessment:", error);
    return NextResponse.json({ error: "Failed to save assessment" }, { status: 500 });
  }
} 