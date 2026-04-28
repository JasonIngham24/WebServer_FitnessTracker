import type { Friend } from "../types"
import { PagingRequest } from "../types/dataEnvelopes"
import { connect } from "./supabase"

export const TABLE_NAME = "friends"

type ItemType = Friend

export async function getAll(params: PagingRequest & { user_id?: number }) {
  const db = connect()

  let query = db.from(TABLE_NAME).select('*, friend:users!friends_friend_id_fkey(*)', {
    count: 'estimated'
  })

  if (params?.user_id) {
    query = query.eq('user_id', params.user_id)
  }

  if (params?.search) {
    query = query.or(`user_id.ilike.%${params.search}%,friend_id.ilike.%${params.search}%`)
  }
  if (params?.sortBy) {
    query = query.order(params.sortBy, { ascending: !params.descending })
  }
  const page = params?.page || 1
  const pageSize = params?.pageSize || 10
  const start = (page - 1) * pageSize
  query = query.range(start, start + pageSize - 1)

  const result = await query
  if (result.error) {
    throw await result.error
  }

  const list = result.data.map((x) => x.friend) as ItemType[]
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
        const error = { status: 404, message: "Friend not found" }
        throw error
    }
    return item as ItemType
}

export async function add(user_id: number, friend_id: number) {
    const db = connect()
    const result = await db.from(TABLE_NAME).insert({ user_id, friend_id }).select().single()
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

export async function getFriendActivities(user_id: number) {
    const db = connect()
    const result = await db.rpc('get_friends_activities', { p_user_id: user_id })
    if (result.error) {
        throw (result.error)
    }
    const list = result.data as any[]
    const count = list.length
    return { list, count }
}
