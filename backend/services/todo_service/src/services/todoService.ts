export const addTaskService = async(supabase: any, userId: string, title: string)=>{
    const {data, error} = await supabase.from('task').insert([{
        title,
        isCompleted: false,
        user_id: userId
    }]).select().single()

    if(error) throw error

    return data
}
export const listTaskService = async(supabase: any , userId:string)=>{
    const {data,error} = await supabase.from('task').select().eq('user_id', userId)
    if(error) throw error

    return data
}