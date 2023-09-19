import { Timestamp } from "firebase/firestore"

export type Post = {
  id: string,
  text: string,
  category: string,
  createdAt: Timestamp,
  updatedAt: Timestamp
}