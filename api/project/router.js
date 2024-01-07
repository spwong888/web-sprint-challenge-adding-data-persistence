const express = require('express');
const router = express.Router();
const Projects = require('./model');

const convertToBool = (projects) => {
    return projects.map(project => ({
        ...project,
        project_completed: Boolean(project.project_completed)
    }));
};

router.get('/', async (req, res, next) => {
    try {
        const projects = await Projects.getProjects();
        const projectsWithBool = convertToBool(projects);
        res.status(200).json(projectsWithBool);
    } catch (error) {
        next(error);
    }
});

router.post('/', async (req, res, next) => {
    try {
        const project = req.body;
        const newProject = await Projects.addProject(project);
        res.status(201).json(newProject);
    } catch (error) {
        next(error);
    }
});

module.exports = router;