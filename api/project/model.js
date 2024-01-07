const db = require('../../data/dbConfig')

async function getProjects() {
    const results = await db('projects as p')
        .select('p.project_id', 'p.project_name', 'p.project_description', 'p.project_completed')
    const projects = []

    results.forEach(result => {
        projects.push({
            project_id: result.project_id,
            project_name: result.project_name,
            project_description: result.project_description,
            project_completed: Boolean(result.project_completed)
        })
    });
    return projects
}

const getById = async (id) => {
    const project = await db('projects')
        .where('project_id', id).first()
    if(project.project_completed === 0){
        project.project_completed = false;
    }else{
        project.project_completed = true;
    }
    return project;
}

function addProject(project) {
    return db('projects').insert(project)
        .then(id => {
            return getById(id[0]);
        })
}

module.exports = {
    getProjects,
    addProject,
};
