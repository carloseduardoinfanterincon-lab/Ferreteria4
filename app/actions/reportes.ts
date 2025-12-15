"use server"

import { db } from "@/services/firebase"
import { collection, addDoc, getDocs, deleteDoc, doc, serverTimestamp, query, orderBy, updateDoc } from "firebase/firestore"

export interface Reporte {
  id: string
  productName: string
  note?: string
  priority: "agotado" | "casi_agotado"
  status: "pending" | "resolved"
  createdAt: Date
  createdBy: string // "asesor" or specific name if available
  resolvedAt?: Date
}

export interface ActionResponse<T> {
  success: boolean
  data?: T
  error?: string
}

const COLLECTION_NAME = "reportes_agotados"

export async function getReportes(): Promise<ActionResponse<Reporte[]>> {
  try {
    const reportesRef = collection(db, COLLECTION_NAME)
    const q = query(reportesRef, orderBy("createdAt", "desc"))
    const snapshot = await getDocs(q)

    const reportes: Reporte[] = snapshot.docs.map((doc) => ({
      id: doc.id,
      productName: doc.data().productName || "",
      note: doc.data().note || "",
      priority: doc.data().priority || "agotado",
      status: doc.data().status || "pending",
      createdAt: doc.data().createdAt?.toDate() || new Date(),
      createdBy: doc.data().createdBy || "asesor",
      resolvedAt: doc.data().resolvedAt ? doc.data().resolvedAt.toDate() : null,
    }))

    return { success: true, data: reportes }
  } catch (error: unknown) {
    console.error("Error al obtener reportes:", error)
    return { success: false, error: "Error al cargar los reportes" }
  }
}

export async function createReporte(data: { productName: string; note?: string; priority: "agotado" | "casi_agotado" }): Promise<ActionResponse<Reporte>> {
  try {
    const reportesRef = collection(db, COLLECTION_NAME)

    const docRef = await addDoc(reportesRef, {
      productName: data.productName,
      note: data.note || "",
      priority: data.priority,
      status: "pending",
      createdBy: "asesor",
      createdAt: serverTimestamp(),
    })

    return {
      success: true,
      data: {
        id: docRef.id,
        productName: data.productName,
        note: data.note,
        priority: data.priority,
        status: "pending",
        createdAt: new Date(),
        createdBy: "asesor",
      },
    }
  } catch (error: unknown) {
    console.error("Error al crear reporte:", error)
    return { success: false, error: "Error al crear el reporte" }
  }
}

export async function deleteReporte(id: string): Promise<ActionResponse<void>> {
  try {
    const docRef = doc(db, COLLECTION_NAME, id)
    await deleteDoc(docRef)
    return { success: true }
  } catch (error: unknown) {
    console.error("Error al eliminar reporte:", error)
    return { success: false, error: "Error al eliminar el reporte" }
  }
}

export async function updateReporteStatus(
  id: string,
  status: "pending" | "resolved",
): Promise<ActionResponse<void>> {
  try {
    const docRef = doc(db, COLLECTION_NAME, id)
    await updateDoc(docRef, {
      status,
      ...(status === "resolved" ? { resolvedAt: serverTimestamp() } : { resolvedAt: null }),
    })
    return { success: true }
  } catch (error: unknown) {
    console.error("Error al actualizar estado del reporte:", error)
    return { success: false, error: "Error al actualizar el reporte" }
  }
}
