"use server"

import { db } from "@/services/firebase"
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc, serverTimestamp } from "firebase/firestore"

export interface Articulo {
  id: string
  name: string
  cost: number
  price: number
  createdAt?: Date
}

export interface ActionResponse<T> {
  success: boolean
  data?: T
  error?: string
}

const COLLECTION_NAME = "artículo"

export async function getArticulos(): Promise<ActionResponse<Articulo[]>> {
  try {
    const articulosRef = collection(db, COLLECTION_NAME)
    const snapshot = await getDocs(articulosRef)

    const articulos: Articulo[] = snapshot.docs.map((doc) => ({
      id: doc.id,
      name: doc.data().name || "",
      cost: doc.data().cost || 0,
      price: doc.data().price || 0,
      createdAt: doc.data().createdAt?.toDate(),
    }))

    return { success: true, data: articulos }
  } catch (error: unknown) {
    console.error("Error al obtener artículos:", error)

    if (error instanceof Error && error.message.includes("permission-denied")) {
      return {
        success: false,
        error: "Sin permisos de Firebase. Configura las reglas de Firestore en la consola de Firebase.",
      }
    }

    return { success: false, error: "Error al cargar los productos" }
  }
}

export async function createArticulo(data: Omit<Articulo, "id" | "createdAt">): Promise<ActionResponse<Articulo>> {
  try {
    const articulosRef = collection(db, COLLECTION_NAME)

    const docRef = await addDoc(articulosRef, {
      name: data.name,
      cost: data.cost,
      price: data.price,
      createdAt: serverTimestamp(),
    })

    return {
      success: true,
      data: {
        id: docRef.id,
        name: data.name,
        cost: data.cost,
        price: data.price,
      },
    }
  } catch (error: unknown) {
    console.error("Error al crear artículo:", error)

    if (error instanceof Error && error.message.includes("permission-denied")) {
      return {
        success: false,
        error: "Sin permisos para crear. Configura las reglas de Firestore.",
      }
    }

    return { success: false, error: "Error al crear el producto" }
  }
}

export async function updateArticulo(
  id: string,
  data: Partial<Omit<Articulo, "id" | "createdAt">>,
): Promise<ActionResponse<void>> {
  try {
    const docRef = doc(db, COLLECTION_NAME, id)
    await updateDoc(docRef, {
      ...data,
      updatedAt: serverTimestamp(),
    })
    return { success: true }
  } catch (error: unknown) {
    console.error("Error al actualizar artículo:", error)

    if (error instanceof Error && error.message.includes("permission-denied")) {
      return {
        success: false,
        error: "Sin permisos para actualizar. Configura las reglas de Firestore.",
      }
    }

    return { success: false, error: "Error al actualizar el producto" }
  }
}

export async function deleteArticulo(id: string): Promise<ActionResponse<void>> {
  try {
    const docRef = doc(db, COLLECTION_NAME, id)
    await deleteDoc(docRef)
    return { success: true }
  } catch (error: unknown) {
    console.error("Error al eliminar artículo:", error)

    if (error instanceof Error && error.message.includes("permission-denied")) {
      return {
        success: false,
        error: "Sin permisos para eliminar. Configura las reglas de Firestore.",
      }
    }

    return { success: false, error: "Error al eliminar el producto" }
  }
}
