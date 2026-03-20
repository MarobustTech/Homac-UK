import { API_URL } from "./utils"

export type AdminRole = "admin" | "editor"

export interface AdminUser {
  id: string
  email: string
  name: string
  role: AdminRole
  avatar?: string
  createdAt: string
  lastLogin?: string
}

export interface AdminSession {
  user: AdminUser
  token: string
  expiresAt: string
}

interface BackendAuthUser {
  id: string
  email: string
  firstName: string
  lastName: string
  role?: string
  createdAt: string
}

const ADMIN_SESSION_KEY = "homac_admin_session"
const ADMIN_AUDIT_KEY = "homac_admin_audit"

function toAdminUser(user: BackendAuthUser): AdminUser {
  const role: AdminRole = user.role === "editor" ? "editor" : "admin"
  return {
    id: user.id,
    email: user.email,
    name: `${user.firstName} ${user.lastName}`.trim(),
    role,
    createdAt: user.createdAt,
  }
}

export function getAdminSession(): AdminSession | null {
  if (typeof window === "undefined") return null
  const stored = localStorage.getItem(ADMIN_SESSION_KEY)
  if (!stored) return null

  try {
    const session: AdminSession = JSON.parse(stored)
    if (new Date(session.expiresAt) < new Date()) {
      clearAdminSession()
      return null
    }
    return session
  } catch {
    return null
  }
}

export function setAdminSession(session: AdminSession): void {
  if (typeof window === "undefined") return
  localStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify(session))
}

export function clearAdminSession(): void {
  if (typeof window === "undefined") return
  localStorage.removeItem(ADMIN_SESSION_KEY)
}

export async function adminSignIn(
  email: string,
  password: string
): Promise<{ success: boolean; session?: AdminSession; error?: string }> {
  try {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })

    const data = await res.json()

    if (!res.ok) {
      logAuditEvent("login_failed", { email }, null)
      return { success: false, error: data.error || "Invalid email or password" }
    }

    if (data.user?.role !== "admin") {
      logAuditEvent("login_failed", { email, reason: "not_admin" }, null)
      return { success: false, error: "Admin access required" }
    }

    const session: AdminSession = {
      user: {
        ...toAdminUser(data.user),
        lastLogin: new Date().toISOString(),
      },
      token: data.token,
      expiresAt: new Date(Date.now() + 8 * 60 * 60 * 1000).toISOString(),
    }

    setAdminSession(session)
    logAuditEvent("login_success", { email }, session.user)
    return { success: true, session }
  } catch {
    return { success: false, error: "Network error" }
  }
}

export function adminSignOut(): void {
  const session = getAdminSession()
  if (session) {
    logAuditEvent("logout", {}, session.user)
  }
  clearAdminSession()
}

export function hasRole(requiredRole: AdminRole): boolean {
  const session = getAdminSession()
  if (!session) return false
  return session.user.role === requiredRole
}

export function canPerformAction(action: string): boolean {
  const session = getAdminSession()
  if (!session) return false

  const adminOnlyActions = [
    "delete_user",
    "manage_roles",
    "view_audit_logs",
    "manage_settings",
    "delete_content",
    "create_course",
    "edit_course",
    "delete_course",
    "upload_media",
    "delete_media",
    "manage_pages",
    "view_users",
  ]

  return adminOnlyActions.includes(action) ? session.user.role === "admin" : true
}

export interface AuditEvent {
  id: string
  timestamp: string
  action: string
  details: Record<string, unknown>
  user: AdminUser | null
  ip?: string
}

export function logAuditEvent(
  action: string,
  details: Record<string, unknown>,
  user: AdminUser | null
): void {
  if (typeof window === "undefined") return

  const events = getAuditEvents()
  const event: AuditEvent = {
    id: `audit_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
    timestamp: new Date().toISOString(),
    action,
    details,
    user,
  }

  events.unshift(event)
  localStorage.setItem(ADMIN_AUDIT_KEY, JSON.stringify(events.slice(0, 1000)))
}

export function getAuditEvents(): AuditEvent[] {
  if (typeof window === "undefined") return []
  const stored = localStorage.getItem(ADMIN_AUDIT_KEY)
  if (!stored) return []

  try {
    return JSON.parse(stored)
  } catch {
    return []
  }
}
