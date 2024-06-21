import { Router } from "express";
import { body, param } from "express-validator";
import { ProjectController } from "../controllers/ProjectController";
import { handleInputErrors } from "../middleware/validation";
import { TaskController } from "../controllers/TaskController";
import { projectExists } from "../middleware/project";
import { taskBelongsToProject, taskExist } from "../middleware/task";

const router = Router()


// PROJECTOS
router.post('/',
    body('projectName').notEmpty().withMessage('el nombre del proyecto es obligatorio'),
    body('clientName').notEmpty().withMessage('el nombre del cliente es obligatorio'),
    body('description').notEmpty().withMessage('la descripcion del proyecto es obligatorio'),
    handleInputErrors,
    ProjectController.createProject)
router.get('/', ProjectController.getAllProjects)
router.get('/:id',
    param('id').isMongoId().withMessage('Id no valido'),
    handleInputErrors,
    ProjectController.getProjectById)
router.put('/:id',
    body('projectName').notEmpty().withMessage('el nombre del proyecto es obligatorio'),
    body('clientName').notEmpty().withMessage('el nombre del cliente es obligatorio'),
    body('description').notEmpty().withMessage('la descripcion del proyecto es obligatorio'),
    handleInputErrors,
    ProjectController.updateProjectById)
router.get('/', ProjectController.updateProjectById)
router.delete('/:id',
    param('id').isMongoId().withMessage('Id no valido'),
    handleInputErrors,
    ProjectController.deleteProjectById)


// COMO LAS TAREAS DEPENDEN DE LOS PROJECTOS SE COLOCARON AQUI

router.param('projectId', projectExists)

router.post('/:projectId/task',
    body('name').notEmpty().withMessage('el nombre de la tarea es obligatorio'),
    body('description').notEmpty().withMessage('la descripcion es obligatorio'),
    TaskController.createTask
)

router.get('/:projectId/task',
    TaskController.getProjectTasks
)

router.param('taskId', taskExist)
router.param('taskId', taskBelongsToProject)

router.get('/:projectId/task/:taskId',
    param('taskId').isMongoId().withMessage('Id no valido'),
    handleInputErrors,
    TaskController.getTaskById
)

router.put('/:projectId/task/:taskId',
    param('taskId').isMongoId().withMessage('Id no valido'),
    body('name').notEmpty().withMessage('el nombre de la tarea es obligatorio'),
    body('description').notEmpty().withMessage('la descripcion es obligatorio'),
    handleInputErrors,
    TaskController.updateTask
)

router.delete('/:projectId/task/:taskId',
    param('taskId').isMongoId().withMessage('Id no valido'),
    handleInputErrors,
    TaskController.deleteTask
)

router.post('//:projectId/task/:taskId/status',
    param('taskId').isMongoId().withMessage('Id no valido'),
    body('status').notEmpty().withMessage('El estado es obligatorio'),
    handleInputErrors,
    TaskController.updateStatusTask
)

export default router