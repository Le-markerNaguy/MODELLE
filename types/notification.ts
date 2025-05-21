export type NotificationType = "appointment" | "group" | "resource" | "alert" | "system"

export interface Notification {
  id: string
  title: string
  message: string
  type: NotificationType
  read: boolean
  date: Date
  link?: string
  image?: string
}
