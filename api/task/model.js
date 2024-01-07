const db = require('../../data/dbConfig')

async function getTasks() {
    const results = await db('tasks as t')
        .leftJoin('projects as p', 'p.project_id', 't.project_id')
        .select(
            't.task_id', 
            't.task_description', 
            't.task_notes', 
            't.task_completed', 
            'p.project_name', 
            'p.project_description'
        )
    const tasks = []

    results.forEach(result => {
        tasks.push({
            task_id: result.task_id,
            task_description: result.task_description,
            task_notes: result.task_notes,
            task_completed: Boolean(result.task_completed),
            project_name: result.project_name,
            project_description: result.project_description
        })
    })
    return tasks
}

const getById = async (id) => {
    const task = await db('tasks')
        .where('task_id', id).first()
    if(task.task_completed === 0){
        task.task_completed = false;
    }else{
        task.task_completed = true;
    }
    return task;
}

function addTask(task) {
    return db('tasks').insert(task)
        .then(id => {
            return getById(id[0]);
        })
}

module.exports = {
    getTasks,
    addTask,
};