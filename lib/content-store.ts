import fs from "fs/promises"
import { getSupabaseContentTable, getSupabaseServerClient } from "@/lib/supabase"

export async function readJsonFile<T>(filePath: string, fallback: T): Promise<T> {
  try {
    const raw = await fs.readFile(filePath, "utf-8")
    return JSON.parse(raw) as T
  } catch {
    return fallback
  }
}

export async function writeJsonFile(filePath: string, data: unknown): Promise<void> {
  const text = JSON.stringify(data, null, 2)
  await fs.writeFile(filePath, text, "utf-8")
}

export async function getContent<T>(opts: { key: string; filePath: string; fallback: T }): Promise<T> {
  const supabase = getSupabaseServerClient()
  if (supabase) {
    const table = getSupabaseContentTable()
    const { data, error } = await supabase.from(table).select("data").eq("key", opts.key).maybeSingle()
    if (!error && data && typeof (data as any).data !== "undefined") {
      return (data as any).data as T
    }
  }

  return readJsonFile(opts.filePath, opts.fallback)
}

export async function setContent(opts: { key: string; filePath: string; data: unknown }): Promise<void> {
  const filePromise = writeJsonFile(opts.filePath, opts.data)

  const supabase = getSupabaseServerClient()
  const supabasePromise = supabase
    ? (async () => {
        const table = getSupabaseContentTable()
        const { error } = await supabase.from(table).upsert({ key: opts.key, data: opts.data }, { onConflict: "key" })
        if (error) throw error
      })()
    : null

  const promises: Promise<void>[] = [filePromise]
  if (supabasePromise) promises.push(supabasePromise)

  const results = await Promise.allSettled(promises)

  const fileResult = results[0]
  if (fileResult && fileResult.status === "rejected") {
    throw fileResult.reason
  }
}
