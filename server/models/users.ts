import type { User } from "../types"
import { connect } from "./supabase"
import { PagingRequest } from "../types/dataEnvelopes"

export const TABLE_NAME = "users"

type ItemType = User

export async function getAll(params: PagingRequest) {
    const db = connect()

    let query = db.from(TABLE_NAME).select("*", { count: "estimated" })

    if(params?.search) {
        query = query.or(`email.ilike.%${params.search}%,name.ilike.%${params.search}%`)
    }
    if(params?.sortBy) {
        query = query.order(params.sortBy, { ascending: !params.descending })
    }
    const page = params?.page || 1
    const pageSize = params?.pageSize || 10
    const start = (page - 1) * pageSize
    query = query.range(start, start + pageSize - 1)

    const result = await query
    if (result.error) {
        throw (await result.error)
    }

    const list = result.data as ItemType[]
    const count = result.count ?? 0

    return { list, count }
}

export async function get(id: number): Promise<ItemType> {
    const db = connect()

    const result = await db.from(TABLE_NAME).select("*").eq("id", id).single()
    if (result.error) {
        throw (result.error)
    }
    const item = result.data as ItemType
    if (!item) {
        const error = { status: 404, message: "User not found" }
        throw error
    }
    return item as ItemType
}

export async function create(item: Exclude<ItemType, "id">) {
    const db = connect()
    const result = await db.from(TABLE_NAME).insert(item).select().single()
    if (result.error) {
        throw (result.error)
    }
    
    return result.data as ItemType
}

export async function update(id: number, item: Partial<ItemType>) {
    const db = connect()

    const result = await db.from(TABLE_NAME).update(item).eq("id", id).select().single()
    if (result.error) {
        throw (result.error)
    }

    
    return result.data as ItemType
}

export async function remove(id: number) {
    const db = connect()

    const result = await db.from(TABLE_NAME).delete().eq("id", id).select().single()
    if (result.error) {
        throw (result.error)
    }

    const removedItemType = result.data as ItemType
    return removedItemType as ItemType
}
